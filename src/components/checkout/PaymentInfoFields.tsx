
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CreditCard } from 'lucide-react';
import { CheckoutFormValues } from "@/types/checkout";

interface PaymentInfoFieldsProps {
  form: UseFormReturn<CheckoutFormValues>;
  formatCardNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatCardExpiry: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentInfoFields = ({ form, formatCardNumber, formatCardExpiry }: PaymentInfoFieldsProps) => {
  return (
    <div className="pt-2 border-t border-slate-800">
      <h3 className="text-md font-medium mb-4">Payment Information</h3>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="1234 5678 9012 3456" 
                    {...field}
                    onChange={(e) => formatCardNumber(e)} 
                    className="pl-10"
                  />
                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cardExpiry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="MM/YY" 
                    {...field}
                    onChange={(e) => formatCardExpiry(e)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cardCvc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVC</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="123" 
                    type="password" 
                    maxLength={4} 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoFields;
