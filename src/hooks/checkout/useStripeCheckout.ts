
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { CheckoutFormValues } from "@/types/checkout";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook for handling Stripe checkout functionality
 */
export const useStripeCheckout = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const processPayment = async (values: CheckoutFormValues) => {
    setLoading(true);
    
    try {
      console.log("Processing checkout for:", values.fullName, values.email);
      
      // Create Stripe checkout session using our edge function
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          customerName: values.fullName,
          customerEmail: values.email
        }
      });

      if (error) {
        console.error("Error creating checkout session:", error);
        throw new Error(error.message);
      }

      if (!data?.checkoutUrl) {
        throw new Error("No checkout URL returned from Stripe");
      }

      console.log("Checkout session created:", data);
      
      // Redirect to Stripe checkout
      window.location.href = data.checkoutUrl;
      
    } catch (error: any) {
      console.error('Payment setup error:', error);
      
      toast({
        title: "Payment failed",
        description: error.message || "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      });
      
      setLoading(false);
    }
  };

  return {
    loading,
    processPayment
  };
};
