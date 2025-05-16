
import { useCheckoutForm } from "./useCheckoutForm";
import { useStripeCheckout } from "./useStripeCheckout";
import { CheckoutFormValues } from "@/types/checkout";

/**
 * Main checkout hook that combines form handling and payment processing
 */
export const useCheckout = () => {
  const { form } = useCheckoutForm();
  const { loading, processPayment } = useStripeCheckout();

  const onSubmit = async (values: CheckoutFormValues) => {
    // Combine first and last name to create full name
    const customerName = `${values.firstName} ${values.lastName}`.trim();
    const customerEmail = values.email || "";
    
    // Call processPayment with the extracted values
    await processPayment(customerName, customerEmail);
  };

  return {
    form,
    loading,
    onSubmit
  };
};
