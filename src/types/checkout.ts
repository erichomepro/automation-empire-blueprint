
import * as z from "zod";

// Create a schema for form validation with first and last name
export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" })
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
