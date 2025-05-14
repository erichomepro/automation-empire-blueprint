
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';

const PaymentSuccess = () => {
  useEffect(() => {
    // In a real implementation, this could verify the payment status
    // through a Supabase function that checks with QuickBooks API
    
    // You might also send a welcome email here with download instructions
    document.title = "Thank You! | Automation Empire";
  }, []);

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-slate-900 rounded-xl shadow-lg p-8 border border-slate-800 text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="text-green-500" size={64} />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Thank You For Your Purchase!</h1>
        <p className="text-slate-400 mb-6">
          Your payment has been processed successfully.
        </p>
        
        <div className="border-t border-slate-800 my-6"></div>
        
        <h2 className="text-xl font-semibold mb-4">Download Your Ebook</h2>
        
        <Button className="w-full mb-4 bg-green-600 hover:bg-green-700">
          <Download className="mr-2" size={18} />
          Download Automation Empire
        </Button>
        
        <p className="text-sm text-slate-400 mb-6">
          A copy has also been sent to your email.
        </p>
        
        <div className="border-t border-slate-800 my-6"></div>
        
        <Link to="/">
          <Button variant="outline" className="mt-2">
            <ArrowLeft className="mr-2" size={16} />
            Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
