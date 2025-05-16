
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { checkoutFormSchema, CheckoutFormValues } from "@/types/checkout";
import { getCardType } from "@/utils/checkoutUtils";

// Supabase payment webhook function URL
const PAYMENT_WEBHOOK_URL = "https://wmslhycsuhuxfjejjxze.supabase.co/functions/v1/payment-webhook";

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
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
          console.log('Product data loaded with test price:', data);
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

  // Helper function to safely handle webhook responses
  const handleWebhookResponse = async (response: Response) => {
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Raw webhook error response:", errorText);
      
      try {
        // Try to parse as JSON if it's valid
        const errorData = JSON.parse(errorText);
        throw new Error(`Request failed: ${response.status} - ${errorData.error || 'Unknown error'}`);
      } catch (parseError) {
        // If parsing fails, return a generic error with the status code
        throw new Error(`Request failed with status ${response.status}: ${errorText.substring(0, 100)}`);
      }
    }
    
    try {
      // Get raw text first
      const responseText = await response.text();
      console.log("Raw webhook response text:", responseText);
      
      // Then parse it as JSON
      if (responseText) {
        return JSON.parse(responseText);
      } else {
        throw new Error("Empty response from server");
      }
    } catch (jsonError) {
      console.error("Error parsing JSON response:", jsonError);
      throw new Error("Invalid JSON response from server");
    }
  };

  const onSubmit = async (values: CheckoutFormValues) => {
    setLoading(true);
    
    try {
      if (!product) {
        throw new Error("Product information not available");
      }
      
      console.log("Processing checkout for:", values.fullName, values.email);
      
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
        console.error("Error creating purchase record:", error);
        throw error;
      }
      
      console.log("Purchase record created:", data);
      console.log("Sending payment data to webhook:", PAYMENT_WEBHOOK_URL);
      
      // Prepare the webhook payload
      const webhookPayload = {
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
      };
      
      console.log("Webhook payload prepared:", { ...webhookPayload, card_details: "REDACTED" });
      
      // Send payment data to our Supabase webhook function
      const webhookResponse = await fetch(PAYMENT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(webhookPayload)
      });
      
      console.log("Webhook response status:", webhookResponse.status);
      
      // Use the helper function to safely handle the response
      const responseData = await handleWebhookResponse(webhookResponse);
      console.log("Payment webhook response data:", responseData);
      
      if (!responseData.success) {
        throw new Error(responseData.error || "Payment processing failed on server");
      }
      
      // Show success toast
      toast({
        title: "Payment successful!",
        description: "Your payment has been processed successfully.",
      });
      
      // Navigate to the success page
      navigate(`/payment-success?reference=${data.id}`);
      
    } catch (error: any) {
      console.error('Payment setup error:', error);
      
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
    onSubmit,
    formatCardNumber,
    formatCardExpiry
  };
};
