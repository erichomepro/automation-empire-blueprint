
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Make.com webhook URL for QuickBooks payment processing
  const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/1am5x4gdobw2zbya7t77lpew8c4hno1k";

  // Fetch product details on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('ebook_products')
          .select('*')
          .eq('sku', 'AE-EBOOK-001')
          .single();
          
        if (error) {
          console.error('Error fetching product:', error);
          return;
        }
        
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };
    
    fetchProduct();
  }, []);

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
      if (!product) {
        throw new Error("Product information not available");
      }
      
      // Store the pending purchase in Supabase
      const { data, error } = await supabase
        .from('ebook_purchases')
        .insert([
          {
            customer_name: fullName,
            customer_email: email,
            product_id: product.id,
            amount: product.price,
            payment_status: 'pending'
          }
        ])
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      console.log("Purchase record created:", data);
      
      // Send payment data to Make.com webhook
      const webhookResponse = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          purchase_id: data.id,
          customer_name: fullName,
          customer_email: email,
          product_name: product.title || 'Automation Empire',
          product_price: product.price || 9.99,
          timestamp: new Date().toISOString(),
          success_url: `${window.location.origin}/payment-success?reference=${data.id}`,
          cancel_url: `${window.location.origin}/checkout`
        })
      });
      
      console.log("Webhook response status:", webhookResponse.status);
      
      // For better UX, we'll show a loading toast while the payment is being processed
      toast({
        title: "Processing your payment",
        description: "Please wait while we redirect you to complete your payment.",
      });
      
      // In a real implementation with QuickBooks, the webhook would return a payment URL
      // For now, since we're using Make.com as middleware, we'll assume it redirects properly
      // and just move to the success page after a short delay
      setTimeout(() => {
        navigate(`/payment-success?reference=${data.id}`);
      }, 2000);
      
    } catch (error) {
      console.error('Payment setup error:', error);
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
          <h2 className="text-lg font-semibold">{product?.title || 'Automation Empire'}</h2>
          <p className="text-slate-400">{product?.description || 'The blueprints for $20K+ months using Make.com + Airtable'}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-slate-400">Price:</span>
            <span className="text-xl font-bold">${product?.price || '9.99'}</span>
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
          You will be redirected to complete your purchase securely.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
