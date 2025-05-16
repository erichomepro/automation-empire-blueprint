
import React from 'react';
import { Form } from "@/components/ui/form";
import { useCheckout } from "@/hooks/useCheckout";
import ProductSummary from "@/components/checkout/ProductSummary";
import CustomerInfoFields from "@/components/checkout/CustomerInfoFields";
import BillingAddressFields from "@/components/checkout/BillingAddressFields";
import PaymentInfoFields from "@/components/checkout/PaymentInfoFields";
import CheckoutButton from "@/components/checkout/CheckoutButton";

const Checkout = () => {
  const {
    form,
    loading,
    product,
    webhookStatus,
    onSubmit,
    formatCardNumber,
    formatCardExpiry,
    testWebhook
  } = useCheckout();

  return (
    <div className="min-h-screen bg-dark pt-20 pb-16 px-4">
      <div className="max-w-md mx-auto bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-800">
        <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Purchase</h1>
        
        <ProductSummary product={product} />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CustomerInfoFields form={form} />
            <BillingAddressFields form={form} />
            <PaymentInfoFields
              form={form}
              formatCardNumber={formatCardNumber}
              formatCardExpiry={formatCardExpiry}
            />
            
            <CheckoutButton 
              loading={loading} 
              testWebhook={testWebhook}
              webhookStatus={webhookStatus}
            />
            
            <p className="text-xs text-center mt-4 text-slate-400">
              Your payment information is processed securely.
              {webhookStatus === 'error' && (
                <span className="block text-red-500 mt-2">
                  Error connecting to payment processor. Please try again.
                </span>
              )}
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
