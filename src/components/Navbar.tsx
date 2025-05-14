
import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollToCheckout = () => {
    const checkout = document.getElementById('checkout');
    if (checkout) {
      checkout.scrollIntoView({ behavior: 'smooth' });
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
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Features
            </Button>
            <Button 
              variant="ghost" 
              className="text-light hover:text-accent hover:bg-transparent"
              onClick={() => document.getElementById('who-is-it-for')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Who It's For
            </Button>
            <Button 
              variant="ghost" 
              className="text-light hover:text-accent hover:bg-transparent"
              onClick={() => document.getElementById('what-you-get')?.scrollIntoView({ behavior: 'smooth' })}
            >
              What You Get
            </Button>
            <Button 
              variant="ghost" 
              className="text-light hover:text-accent hover:bg-transparent"
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
            >
              FAQ
            </Button>
          </nav>
          <Button 
            className="bg-accent text-dark font-bold hover:bg-opacity-90 transition-all"
            onClick={scrollToCheckout}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
