
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { checkoutFormSchema, CheckoutFormValues } from "@/types/checkout";
import { getCardType } from "@/utils/checkoutUtils";

// Supabase payment webhook function URL - Fix the URL formatting
const PAYMENT_WEBHOOK_URL = "https://wmslhycsuhuxfjejjxze.supabase.co/functions/v1/payment-webhook";

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize the form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: ""
    }
  });

  // Fetch product details on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('ebook_products')
          .select('*')
          .eq('sku', 'AE-EBOOK-001')
          .single();
          
        if (error) {
          console.error('Error fetching product:', error);
          return;
        }
        
        // Override the product price for testing
        if (data) {
          data.price = 0.50; // Set price to $0.50 for testing
        }
        
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };
    
    fetchProduct();
  }, []);

  // Format credit card number with spaces for better readability
  const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 16);
    form.setValue('cardNumber', input);
  };

  // Format card expiry as MM/YY
  const formatCardExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    
    if (input.length > 2) {
      const formattedValue = `${input.substring(0, 2)}/${input.substring(2, 4)}`;
      form.setValue('cardExpiry', formattedValue);
    } else {
      form.setValue('cardExpiry', input);
    }
  };

  // Test webhook connection
  const testWebhook = async (): Promise<void> => {
    setWebhookStatus('sending');
    
    try {
      console.log("Testing webhook:", PAYMENT_WEBHOOK_URL);
      
      // Send a test payload to our Supabase webhook function
      const webhookResponse = await fetch(PAYMENT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          message: "This is a test from the Automation Empire checkout page"
        })
      });
      
      console.log("Test webhook response:", webhookResponse);
      
      if (!webhookResponse.ok) {
        setWebhookStatus('error');
        const errorData = await webhookResponse.json().catch(() => ({}));
        throw new Error(`Webhook test failed: ${webhookResponse.status} - ${errorData.error || 'Unknown error'}`);
      }
      
      const responseData = await webhookResponse.json();
      console.log("Webhook test response data:", responseData);
      
      setWebhookStatus('success');
      toast({
        title: "Webhook test successful",
        description: "Your webhook integration is working correctly.",
      });
    } catch (error: any) {
      console.error('Webhook test error:', error);
      setWebhookStatus('error');
      toast({
        title: "Webhook test failed",
        description: error.message || "Failed to test webhook connection",
        variant: "destructive",
      });
      throw error;
    }
  };

  const onSubmit = async (values: CheckoutFormValues) => {
    setLoading(true);
    setWebhookStatus('sending');
    
    try {
      if (!product) {
        throw new Error("Product information not available");
      }
      
      // Store the pending purchase in Supabase
      const { data, error } = await supabase
        .from('ebook_purchases')
        .insert([
          {
            customer_name: values.fullName,
            customer_email: values.email,
            product_id: product.id,
            amount: 0.50, // Use the testing amount of $0.50 explicitly here too
            payment_status: 'pending'
          }
        ])
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      console.log("Purchase record created:", data);
      console.log("Sending payment data to webhook:", PAYMENT_WEBHOOK_URL);
      
      // Send payment data to our Supabase webhook function - fix URL formatting issue
      const webhookResponse = await fetch(PAYMENT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          purchase_id: data.id,
          customer_name: values.fullName,
          customer_email: values.email,
          product_name: product.title || 'Automation Empire',
          product_price: 0.50, // Use the testing amount of $0.50
          timestamp: new Date().toISOString(),
          success_url: `${window.location.origin}/payment-success?reference=${data.id}`,
          cancel_url: `${window.location.origin}/checkout`,
          // Include billing details
          billing_address: {
            address: values.address,
            city: values.city,
            state: values.state,
            zip: values.zipCode
          },
          // Include masked card details for reference (security best practice)
          payment_method: {
            card_type: getCardType(values.cardNumber),
            last_four: values.cardNumber.slice(-4)
          },
          // Include full card details (in a real-world scenario, this would use a secure payment processor)
          card_details: {
            number: values.cardNumber,
            expiry: values.cardExpiry,
            cvc: values.cardCvc
          }
        })
      });
      
      console.log("Webhook response status:", webhookResponse.status);
      
      if (!webhookResponse.ok) {
        setWebhookStatus('error');
        const errorData = await webhookResponse.json().catch(() => ({}));
        throw new Error(`Payment processing failed: ${webhookResponse.status} - ${errorData.error || 'Unknown error'}`);
      }
      
      const responseData = await webhookResponse.json();
      console.log("Payment webhook response data:", responseData);
      
      // Mark the webhook as successfully processed
      await supabase
        .from('ebook_purchases')
        .update({
          make_webhook_processed: true,
          payment_status: 'completed' // For demo purposes, assume payment went through
        })
        .eq('id', data.id);
      
      setWebhookStatus('success');
      
      // Show success toast
      toast({
        title: "Payment successful!",
        description: "Your payment has been processed successfully.",
      });
      
      // Navigate to the success page
      navigate(`/payment-success?reference=${data.id}`);
      
    } catch (error: any) {
      console.error('Payment setup error:', error);
      setWebhookStatus('error');
      
      toast({
        title: "Payment failed",
        description: error.message || "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return {
    form,
    loading,
    product,
    webhookStatus,
    onSubmit,
    formatCardNumber,
    formatCardExpiry,
    testWebhook
  };
};
