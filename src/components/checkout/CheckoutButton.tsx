
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Wifi } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CheckoutButtonProps {
  loading: boolean;
  testWebhook?: () => Promise<void>;
  webhookStatus?: 'idle' | 'sending' | 'success' | 'error';
}

const CheckoutButton = ({ loading, testWebhook, webhookStatus }: CheckoutButtonProps) => {
  const { toast } = useToast();
  
  const handleTestWebhook = async () => {
    if (testWebhook) {
      try {
        await testWebhook();
        toast({
          title: "Webhook test sent",
          description: "Check your Make.com scenario logs to verify it was received.",
        });
      } catch (error) {
        toast({
          title: "Webhook test failed",
          description: error instanceof Error ? error.message : "Unknown error occurred",
          variant: "destructive",
        });
      }
    }
  };
  
  return (
    <>
      <Button 
        type="submit" 
        className="w-full mt-6 btn-action" 
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
          </span>
        ) : (
          <span className="flex items-center">
            Complete Purchase <ArrowRight className="ml-2" size={18} />
          </span>
        )}
      </Button>
      
      {testWebhook && (
        <Button 
          type="button" 
          variant="outline" 
          className="w-full mt-2" 
          onClick={handleTestWebhook}
          disabled={webhookStatus === 'sending'}
        >
          <span className="flex items-center">
            {webhookStatus === 'sending' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing webhook...
              </>
            ) : (
              <>
                <Wifi className="mr-2 h-4 w-4" /> Test Make.com Webhook
              </>
            )}
          </span>
        </Button>
      )}
      
      {webhookStatus === 'error' && (
        <p className="text-xs text-red-500 text-center mt-1">
          Webhook test failed. Check your URL and Make.com scenario.
        </p>
      )}
      
      {webhookStatus === 'success' && (
        <p className="text-xs text-green-500 text-center mt-1">
          Webhook test successful!
        </p>
      )}
    </>
  );
};

export default CheckoutButton;
