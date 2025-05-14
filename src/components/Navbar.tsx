
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const safeScrollToElement = (elementId: string) => {
    try {
      console.log(`Attempting to scroll to element: #${elementId}`);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        console.log(`Successfully scrolled to #${elementId}`);
      } else {
        console.warn(`Element not found: #${elementId}`);
        
        // If we're trying to navigate to checkout and the element doesn't exist
        if (elementId === 'checkout') {
          console.log('Checkout element not found, navigating to /checkout page');
          // @ts-ignore - Using the global safe navigate function
          if (window.safeNavigate && navigate) {
            window.safeNavigate(navigate, '/checkout');
          } else {
            navigate('/checkout');
          }
        }
      }
    } catch (error) {
      console.error(`Error scrolling to #${elementId}:`, error);
      toast.debug(`Navigation error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-hero font-heading text-2xl">AUTOMATION EMPIRE</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-light hover:text-accent hover:bg-transparent"
              onClick={() => safeScrollToElement('features')}
            >
              Features
            </Button>
            <Button 
              variant="ghost" 
              className="text-light hover:text-accent hover:bg-transparent"
              onClick={() => safeScrollToElement('who-is-it-for')}
            >
              Who It's For
            </Button>
            <Button 
              variant="ghost" 
              className="text-light hover:text-accent hover:bg-transparent"
              onClick={() => safeScrollToElement('what-you-get')}
            >
              What You Get
            </Button>
            <Button 
              variant="ghost" 
              className="text-light hover:text-accent hover:bg-transparent"
              onClick={() => safeScrollToElement('faq')}
            >
              FAQ
            </Button>
          </nav>
          <Button 
            className="bg-accent text-dark font-bold hover:bg-opacity-90 transition-all"
            onClick={() => safeScrollToElement('checkout')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
