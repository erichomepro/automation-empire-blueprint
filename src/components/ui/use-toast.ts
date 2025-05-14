
import { useToast as hookUseToast, toast as hookToast, type ToasterToast } from "@/hooks/use-toast";

// Create an interface for our extended toast type
interface ExtendedToast {
  (props: Omit<ToasterToast, "id">): {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  };
  debug: (message: string) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  };
}

// Convert the original toast to our extended type and add the debug method
const toast = hookToast as unknown as ExtendedToast;

// Add a debug method for showing visible mobile toast notifications
toast.debug = (message: string) => {
  console.debug("[Toast Debug]", message);
  return hookToast({
    title: "Debug Info",
    description: message,
    duration: 5000,
  });
};

export { hookUseToast as useToast, toast };
