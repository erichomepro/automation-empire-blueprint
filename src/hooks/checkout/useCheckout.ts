
import { useCheckoutForm } from "./useCheckoutForm";
import { useStripeCheckout } from "./useStripeCheckout";
import { CheckoutFormValues } from "@/types/checkout";

/**
 * Main checkout hook that combines form handling and payment processing
 */
export const useCheckout = () => {
  const { form, formatCardNumber, formatCardExpiry } = useCheckoutForm();
  const { loading, processPayment } = useStripeCheckout();

  const onSubmit = async (values: CheckoutFormValues) => {
    // Extract name and email from the form values
    const customerName = values.fullName || "";
    const customerEmail = values.email || "";
    
    // Call processPayment with the extracted values
    await processPayment(customerName, customerEmail);
  };

  return {
    form,
    loading,
    onSubmit,
    formatCardNumber,
    formatCardExpiry
  };
};
