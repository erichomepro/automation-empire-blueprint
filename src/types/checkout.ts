
import * as z from "zod";

// Create a schema for form validation
export const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Valid ZIP code is required" }),
  cardNumber: z.string().regex(/^[0-9]{16}$/, { message: "Please enter a valid 16-digit card number" }),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, { message: "Please use MM/YY format" }),
  cardCvc: z.string().regex(/^[0-9]{3,4}$/, { message: "CVC must be 3 or 4 digits" })
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
