
import * as z from "zod";

// Create a simplified schema for form validation
export const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" })
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
