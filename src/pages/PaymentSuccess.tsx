
import React from 'react';
import { usePaymentSuccess } from "@/hooks/payment/usePaymentSuccess";
import ConnectionStatus from "@/components/payment/ConnectionStatus";
import NoPurchaseFound from "@/components/payment/NoPurchaseFound";
import SuccessCard from "@/components/payment/SuccessCard";

const PaymentSuccess = () => {
  const {
    connectionStatus,
    purchaseId,
    downloadReady,
    handleDownload
  } = usePaymentSuccess();

  if (connectionStatus === 'checking' || connectionStatus === 'error') {
    return <ConnectionStatus status={connectionStatus} />;
  }

  if (!purchaseId) {
    return <NoPurchaseFound />;
  }

  return (
    <SuccessCard 
      downloadReady={downloadReady} 
      onDownload={handleDownload} 
    />
  );
};

export default PaymentSuccess;
