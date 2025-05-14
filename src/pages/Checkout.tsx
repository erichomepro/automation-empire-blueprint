
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from 'lucide-react';

const Checkout = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !fullName) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real implementation, this would call a Supabase Edge Function
      // to create a QuickBooks invoice and return the payment link
      
      // Simulate API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll navigate to a success page
      // In production, this would redirect to QuickBooks payment page
      toast({
        title: "Success!",
        description: "You'll be redirected to complete your payment.",
      });
      
      setTimeout(() => {
        navigate('/payment-success');
      }, 1000);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment setup failed",
        description: "There was a problem setting up your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark pt-20 pb-16 px-4">
      <div className="max-w-md mx-auto bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-800">
        <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Purchase</h1>
        
        <div className="mb-6 p-4 bg-slate-800 rounded-lg">
          <h2 className="text-lg font-semibold">Automation Empire</h2>
          <p className="text-slate-400">The blueprint for $20K+ months using Make.com + Airtable</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-slate-400">Price:</span>
            <span className="text-xl font-bold">$297.00</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              placeholder="Enter your full name" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-4 btn-action" 
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">Processing...</span>
            ) : (
              <span className="flex items-center">
                Proceed to Payment <ArrowRight className="ml-2" size={18} />
              </span>
            )}
          </Button>
        </form>
        
        <p className="text-xs text-center mt-6 text-slate-400">
          You will be redirected to QuickBooks secure payment page to complete your purchase.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
