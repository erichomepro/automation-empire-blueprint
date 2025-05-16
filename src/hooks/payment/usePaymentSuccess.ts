
import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { supabase, checkSupabaseConnection } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [downloadReady, setDownloadReady] = useState(false);
  const [purchaseId, setPurchaseId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const { toast } = useToast();
  
  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkSupabaseConnection();
      setConnectionStatus(isConnected ? 'connected' : 'error');
      console.log('Supabase connection status:', isConnected ? 'connected' : 'error');
    };
    
    checkConnection();
  }, []);
  
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      // Get the purchase ID from the URL
      const purchaseIdFromUrl = searchParams.get('reference');
      console.log('Purchase ID from URL:', purchaseIdFromUrl);
      
      if (purchaseIdFromUrl) {
        setPurchaseId(purchaseIdFromUrl);
        
        try {
          console.log('Checking purchase status for ID:', purchaseIdFromUrl);
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
          
          console.log('Purchase data:', data);
          
          if (data && data.payment_status === 'completed') {
            setDownloadReady(true);
          } else {
            // For demo purposes, we'll assume it's ready
            console.log('Setting download ready for demo');
            setDownloadReady(true);
          }
        } catch (error) {
          console.error('Failed to check payment status:', error);
        }
      } else {
        // Show error if no purchase ID is provided
        toast({
          title: "Error",
          description: "No purchase reference found. Please return to checkout.",
          variant: "destructive"
        });
      }
    };
    
    fetchPaymentStatus();
    document.title = "Thank You! | Automation Empire";
  }, [searchParams, toast]);

  const handleDownload = async () => {
    // In a real implementation, this would:
    // 1. Verify the user has access to this purchase
    // 2. Update download count in the database
    // 3. Redirect to the actual file download or provide a signed URL
    
    toast({
      title: "Download started",
      description: "Your ebook is now downloading. Check your downloads folder.",
    });
    
    // If you had a real download link stored in the database:
    if (purchaseId) {
      try {
        // Get the current download count
        const { data: purchaseData } = await supabase
          .from('ebook_purchases')
          .select('download_count')
          .eq('id', purchaseId)
          .maybeSingle();
        
        // Increment the download count directly
        const newCount = (purchaseData?.download_count || 0) + 1;
        
        // Update the download count and last_downloaded timestamp
        await supabase
          .from('ebook_purchases')
          .update({
            download_count: newCount,
            last_downloaded: new Date().toISOString()
          })
          .eq('id', purchaseId);
          
        // In a real implementation, you would redirect to the download URL here
        // window.location.href = downloadUrl;
      } catch (error) {
        console.error('Error updating download stats:', error);
      }
    }
  };

  return {
    connectionStatus,
    purchaseId,
    downloadReady,
    handleDownload
  };
};
