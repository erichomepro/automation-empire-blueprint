
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Download } from 'lucide-react';

interface CheckoutButtonProps {
  loading: boolean;
}

const CheckoutButton = ({ loading }: CheckoutButtonProps) => {
  return (
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
          Get Your Book <Download className="ml-2" size={18} />
        </span>
      )}
    </Button>
  );
};

export default CheckoutButton;
