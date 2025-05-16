
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { useStripeCheckout } from "@/hooks/checkout/useStripeCheckout";
import { useNavigate } from 'react-router-dom';

const FooterCTA = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const navigate = useNavigate();
  const { loading } = useStripeCheckout();
  // Fixed price for the product
  const price = "9.99";

  const handlePurchase = () => {
    console.log("Footer CTA: Navigating to checkout page");
    navigate('/checkout');
  };

  return (
    <section className="section py-12 md:py-16 bg-dark px-4">
      <div 
        ref={ref}
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-xl md:text-3xl font-heading mb-4">
          Build it once. Sell it forever.
        </h2>
        <p className="text-lg md:text-xl mb-6 md:mb-8 text-light/90">
          Start automating the business that sets you free.
        </p>
        
        <Button 
          onClick={handlePurchase}
          size="lg" 
          className="btn-action w-full md:w-auto"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={18} />
              Processing...
            </>
          ) : (
            <>
              <BookOpen className="mr-2" size={18} />
              Grab the Book + Templates for ${price} <ArrowRight className="ml-2" size={18} />
            </>
          )}
        </Button>
      </div>
    </section>
  );
};

export default FooterCTA;
