
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
    await processPayment(values);
  };

  return {
    form,
    loading,
    onSubmit,
    formatCardNumber,
    formatCardExpiry
  };
};
