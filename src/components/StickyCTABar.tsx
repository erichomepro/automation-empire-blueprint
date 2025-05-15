
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { navigateToSection } from "@/lib/navigation";

const StickyCTABar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Show the sticky bar after scrolling past 80% of the viewport height
      const scrollThreshold = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCheckout = () => {
    navigateToSection('checkout', navigate, '/checkout');
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-purple-900/95 backdrop-blur-md border-t border-purple-400/30 py-3 px-4 md:px-8 transform transition-transform duration-300 z-50 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-2 md:mb-0">
          <span className="text-orange-400 mr-2">🚀</span>
          <span className="text-light font-medium">Limited-Time Launch Price: $9.99</span>
        </div>
        <Button 
          onClick={scrollToCheckout} 
          size="sm" 
          className="btn-action text-sm md:text-base px-4 py-1"
        >
          <BookOpen className="mr-2" size={18} />
          Grab the Book + Templates →
        </Button>
      </div>
    </div>
  );
};

export default StickyCTABar;
