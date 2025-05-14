
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
      // Ensure we're using a properly formatted path
      navigate('/checkout');
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback for navigation errors
      window.location.href = '/checkout';
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
