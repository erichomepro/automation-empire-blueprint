
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/types/checkout";

/**
 * Hook for managing checkout form state with first and last name
 */
export const useCheckoutForm = () => {
  // Initialize the form with first name, last name, and email
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: ""
    }
  });

  return {
    form
  };
};
