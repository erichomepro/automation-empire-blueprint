
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const FooterCTA = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    console.log("FooterCTA component mounted");
  }, []);

  const handleCheckout = () => {
    try {
      console.log("Navigate to checkout");
      // Use the global safe navigation function if available
      // @ts-ignore - Using the global safe navigate function
      if (window.safeNavigate && navigate) {
        window.safeNavigate(navigate, '/checkout');
      } else {
        // Fallback to direct navigation
        navigate('/checkout');
      }
    } catch (error) {
      console.error("Navigation error:", error);
      toast.debug(`Navigation error: ${error instanceof Error ? error.message : String(error)}`);
      // Ultimate fallback - use location.href
      try {
        // @ts-ignore - Using the global sanitize function
        const safePath = window.sanitizePath ? window.sanitizePath('/checkout') : '/checkout';
        window.location.href = safePath;
      } catch (e) {
        console.error("Critical navigation error:", e);
        // Last resort - just go to root
        window.location.href = '/';
      }
    }
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
          Still Reading? That's Your Sign.
        </h2>
        <p className="text-lg md:text-xl mb-6 md:mb-8 text-light/90">
          One automation away from your new life.
        </p>
        
        <Button 
          onClick={handleCheckout}
          size="lg" 
          className="btn-action w-full md:w-auto"
        >
          Let's Build Your Empire <ArrowRight className="ml-2" size={18} />
        </Button>
      </div>
    </section>
  );
};

export default FooterCTA;
