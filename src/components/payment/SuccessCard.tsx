
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';

type SuccessCardProps = {
  downloadReady: boolean;
  onDownload: () => void;
};

const SuccessCard: React.FC<SuccessCardProps> = ({ downloadReady, onDownload }) => {
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
          onClick={onDownload}
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

export default SuccessCard;
