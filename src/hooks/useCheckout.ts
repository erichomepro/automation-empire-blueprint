import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { checkoutFormSchema, CheckoutFormValues } from "@/types/checkout";
import { getCardType } from "@/utils/checkoutUtils";

// Make.com webhook URL for QuickBooks payment processing
// Updated webhook URL - previous one was returning 404
const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/12345abcdef"; // You need to replace this with your correct webhook URL

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
      // Send a test payload to the webhook
      const webhookResponse = await fetch(MAKE_WEBHOOK_URL, {
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
      
      if (!webhookResponse.ok && webhookResponse.status !== 0) {
        // Status code 0 can happen with no-cors mode
        setWebhookStatus('error');
        throw new Error(`Webhook test returned status: ${webhookResponse.status}`);
      }
      
      setWebhookStatus('success');
    } catch (error: any) {
      console.error('Webhook test error:', error);
      setWebhookStatus('error');
      throw new Error(error.message || "Failed to test webhook connection");
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
            amount: product.price,
            payment_status: 'pending'
          }
        ])
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      console.log("Purchase record created:", data);
      
      // Send payment data to Make.com webhook
      const webhookResponse = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          purchase_id: data.id,
          customer_name: values.fullName,
          customer_email: values.email,
          product_name: product.title || 'Automation Empire',
          product_price: product.price || 9.99,
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
      
      console.log("Webhook response:", webhookResponse);
      
      if (!webhookResponse.ok && webhookResponse.status !== 0) {
        // Status code 0 can happen with no-cors mode
        setWebhookStatus('error');
        throw new Error(`Webhook returned status: ${webhookResponse.status}`);
      }
      
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
