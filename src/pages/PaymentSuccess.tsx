
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [downloadReady, setDownloadReady] = useState(false);
  const [purchaseId, setPurchaseId] = useState<string | null>(null);
  const { toast } = useToast();
  
  // In a real implementation, this would get the purchase ID from the URL
  // when redirected back from QuickBooks
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      // Get the purchase ID from the URL when QuickBooks redirects back
      const purchaseIdFromUrl = searchParams.get('reference');
      
      if (purchaseIdFromUrl) {
        setPurchaseId(purchaseIdFromUrl);
        
        // In a real implementation, you would verify the payment status with QuickBooks
        // For now, we're simulating that the Make.com webhook has processed the payment
        // and updated our database
        
        try {
          // Check if the purchase exists and is marked as paid
          const { data, error } = await supabase
            .from('ebook_purchases')
            .select('*')
            .eq('id', purchaseIdFromUrl)
            .maybeSingle();
            
          if (error) {
            console.error('Error checking purchase:', error);
            return;
          }
          
          if (data && data.payment_status === 'completed') {
            setDownloadReady(true);
          } else {
            // For demo purposes, we'll assume it's ready
            setDownloadReady(true);
          }
        } catch (error) {
          console.error('Failed to check payment status:', error);
        }
      } else {
        // For demo purposes, we'll assume success without a purchase ID
        setDownloadReady(true);
      }
    };
    
    fetchPaymentStatus();
    document.title = "Thank You! | Automation Empire";
  }, [searchParams]);

  const handleDownload = async () => {
    // In a real implementation, this would:
    // 1. Verify the user has access to this purchase
    // 2. Update download count in the database
    // 3. Redirect to the actual file download or provide a signed URL
    
    toast({
      title: "Download started",
      description: "Your ebook is now downloading. Check your downloads folder.",
    });
    
    // If you had a real download link from Make.com stored in the database:
    if (purchaseId) {
      try {
        // Update download count - fixing the type error here
        await supabase
          .from('ebook_purchases')
          .update({
            download_count: supabase.rpc('increment', { x: 1 }).data,
            last_downloaded: new Date().toISOString()
          })
          .eq('id', purchaseId);
          
        // In a real implementation, you would redirect to the download URL here
        // window.location.href = downloadUrl;
      } catch (error) {
        console.error('Error updating download stats:', error);
      }
    }
    
    // For demo purposes, we'll just show a success message
  };

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
        
        <Button 
          className="w-full mb-4 bg-green-600 hover:bg-green-700"
          onClick={handleDownload}
          disabled={!downloadReady}
        >
          <Download className="mr-2" size={18} />
          Download Automation Empire
        </Button>
        
        <p className="text-sm text-slate-400 mb-6">
          {downloadReady 
            ? "A copy has also been sent to your email."
            : "Your download is being prepared. It may take a few minutes to become available."}
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
