
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const FooterCTA = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const scrollToCheckout = () => {
    const checkout = document.getElementById('checkout');
    if (checkout) {
      checkout.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section py-16 bg-dark">
      <div 
        ref={ref}
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-heading mb-4">
          Still Reading? That's Your Sign.
        </h2>
        <p className="text-xl mb-8 text-light/90">
          One automation away from your new life.
        </p>
        
        <Button 
          onClick={scrollToCheckout}
          size="lg" 
          className="btn-action"
        >
          Let's Build Your Empire <ArrowRight className="ml-2" size={18} />
        </Button>
      </div>
    </section>
  );
};

export default FooterCTA;
