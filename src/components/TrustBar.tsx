
import React from 'react';

const TrustBar = () => {
  return (
    <div className="w-full mt-4 py-2 px-4 bg-purple-900/30 backdrop-blur-sm rounded-lg border border-purple-400/20">
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-xs md:text-sm text-light/80">
        <div className="flex items-center">
          <span className="mr-1">⭐</span>
          <span>Trusted by 100+ entrepreneurs</span>
        </div>
        <span className="hidden md:inline">|</span>
        <div className="flex items-center">
          <span className="mr-1">💬</span>
          <span>20+ testimonials collected</span>
        </div>
        <span className="hidden md:inline">|</span>
        <div className="flex items-center">
          <span className="mr-1">🛠</span>
          <span>Built with Make.com & Airtable</span>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
