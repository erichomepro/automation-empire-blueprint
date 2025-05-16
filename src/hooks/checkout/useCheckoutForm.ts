
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/types/checkout";

/**
 * Hook for managing checkout form state and formatting
 */
export const useCheckoutForm = () => {
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

  return {
    form,
    formatCardNumber,
    formatCardExpiry
  };
};
