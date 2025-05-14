
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark border-t border-muted py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="text-hero font-heading text-3xl mb-4">AUTOMATION EMPIRE</div>
        
        <p className="text-light/60 mb-6">
          © {currentYear} Cerberus Media. All rights reserved.
        </p>
        
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#" className="text-light/70 hover:text-accent">Privacy Policy</a>
          <a href="#" className="text-light/70 hover:text-accent">Terms of Service</a>
          <a href="#" className="text-light/70 hover:text-accent">Refund Policy</a>
          <a href="#" className="text-light/70 hover:text-accent">Contact</a>
        </div>
        
        <p className="text-light/50 text-xs mt-8">
          Make.com and Airtable are trademarks of their respective owners. This product is not affiliated with Make.com or Airtable.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
