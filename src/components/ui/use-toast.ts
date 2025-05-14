
import { useToast, toast } from "@/hooks/use-toast";

// Add a debug method for showing visible mobile toast notifications
toast.debug = (message: string) => {
  console.debug("[Toast Debug]", message);
  return toast({
    title: "Debug Info",
    description: message,
    duration: 5000,
  });
};

export { useToast, toast };
