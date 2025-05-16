
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { checkoutFormSchema, CheckoutFormValues } from "@/types/checkout";
import { getCardType } from "@/utils/checkoutUtils";

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
        
        console.log('Product data loaded:', data);
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

  const onSubmit = async (values: CheckoutFormValues) => {
    setLoading(true);
    
    try {
      if (!product) {
        throw new Error("Product information not available");
      }
      
      console.log("Processing checkout for:", values.fullName, values.email);
      
      // Create Stripe checkout session using our edge function
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          productId: product.id,
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
