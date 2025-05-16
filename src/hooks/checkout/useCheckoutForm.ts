
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/types/checkout";

/**
 * Hook for managing simplified checkout form state
 */
export const useCheckoutForm = () => {
  // Initialize the form with only name and email
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      email: ""
    }
  });

  return {
    form
  };
};
