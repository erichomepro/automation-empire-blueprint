
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

type ConnectionStatus = 'checking' | 'connected' | 'error';

/**
 * Hook for handling payment success page logic
 */
export const usePaymentSuccess = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('checking');
  const [purchaseId, setPurchaseId] = useState<string | null>(null);
  const [purchaseData, setPurchaseData] = useState<any | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);
  const [bookAsset, setBookAsset] = useState<string | null>(null);
  
  const location = useLocation();

  // Extract purchase reference from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reference = params.get('reference');
    
    if (reference) {
      setPurchaseId(reference);
    }
  }, [location]);

  // Check Supabase connection and fetch purchase data
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Check if we can connect to Supabase
        const { error: connectionError } = await supabase.from('ebook_purchases').select('count').limit(1);
        
        if (connectionError) {
          throw connectionError;
        }
        
        setConnectionStatus('connected');
        
        // If we have a purchase ID, fetch the purchase data
        if (purchaseId) {
          const { data, error } = await supabase
            .from('ebook_purchases')
            .select('*')
            .eq('id', purchaseId)
            .single();
          
          if (error) {
            console.error("Error fetching purchase:", error);
          } else if (data) {
            setPurchaseData(data);
            setDownloadReady(data.payment_status === 'completed');
          }
        }
        
        // Fetch the latest ebook asset
        const { data: assetData, error: assetError } = await supabase
          .from('book_assets')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
          
        if (!assetError && assetData && assetData.length > 0) {
          setBookAsset(assetData[0].asset_url);
        }
        
      } catch (error) {
        console.error("Connection error:", error);
        setConnectionStatus('error');
      }
    };
    
    checkConnection();
  }, [purchaseId]);

  // Function to handle download request
  const handleDownload = async () => {
    if (!purchaseId || !downloadReady || !bookAsset) return;
    
    // Track download in database
    try {
      const { error } = await supabase
        .from('ebook_purchases')
        .update({ 
          download_count: (purchaseData?.download_count || 0) + 1,
          last_downloaded: new Date().toISOString()
        })
        .eq('id', purchaseId);
      
      if (error) {
        console.error("Error updating download count:", error);
      }
      
      // Redirect to the asset URL for download
      window.open(bookAsset, '_blank');
      
    } catch (error) {
      console.error("Error handling download:", error);
    }
  };

  return {
    connectionStatus,
    purchaseId,
    downloadReady,
    handleDownload
  };
};
