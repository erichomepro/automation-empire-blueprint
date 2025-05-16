
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const NoPurchaseFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-slate-900 rounded-xl shadow-lg p-8 border border-slate-800 text-center">
        <div className="mb-6 flex justify-center">
          <AlertTriangle className="text-yellow-500" size={64} />
        </div>
        <h1 className="text-2xl font-bold mb-2">No Purchase Found</h1>
        <p className="text-slate-400 mb-6">
          We couldn't find your purchase information. Please return to checkout.
        </p>
        <Link to="/checkout">
          <Button variant="outline" className="mt-2">
            <ArrowLeft className="mr-2" size={16} />
            Return to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoPurchaseFound;
