
import React from 'react';
import { Form } from "@/components/ui/form";
import { useCheckout } from "@/hooks/checkout/useCheckout";
import ProductSummary from "@/components/checkout/ProductSummary";
import CustomerInfoFields from "@/components/checkout/CustomerInfoFields";
import CheckoutButton from "@/components/checkout/CheckoutButton";

const Checkout = () => {
  const {
    form,
    loading,
    onSubmit
  } = useCheckout();

  return (
    <div className="min-h-screen bg-dark pt-20 pb-16 px-4">
      <div className="max-w-md mx-auto bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-800">
        <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Purchase</h1>
        
        <ProductSummary />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CustomerInfoFields form={form} />
            
            <CheckoutButton loading={loading} />
            
            <p className="text-xs text-center mt-4 text-slate-400">
              Your email is needed to deliver your digital purchase. We won't share it with anyone else.
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
