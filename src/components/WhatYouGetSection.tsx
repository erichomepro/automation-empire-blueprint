
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { CheckCircle } from 'lucide-react';

const WhatYouGetSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const deliverables = [
    "Full eBook (150+ pages) with step-by-step beginner instructions",
    "Ready-to-use Make.com templates for every automation",
    "Plug & Play Google Sheets + Forms setups",
    "AI-powered email & content prompts (GPT-ready)",
    "Access to the Automation Template Vault",
    "Bonus videos + walkthroughs (sent by email)"
  ];

  return (
    <section id="what-you-get" className="section bg-gradient-to-b from-dark/90 to-dark">
      <div 
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            <span className="text-accent">What You Get</span>
          </h2>
          <p className="text-light/80 text-lg max-w-2xl mx-auto">
            Everything you need to build, package, and sell your automation system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliverables.map((item, index) => (
            <div 
              key={index}
              className={`bg-muted p-6 rounded-lg shadow-lg border border-hero/20 transition-all duration-500 hover:border-accent/50 flex items-center gap-4`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CheckCircle className="text-accent flex-shrink-0" size={28} />
              <span className="text-xl font-semibold">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted border border-hero/20 rounded-xl text-center">
          <p className="text-xl">
            This isn't just an eBook — it's a new business operating system<br className="hidden md:block" /> 
            <span className="font-bold text-accent">You don't just learn automation — you get a product ready to sell by tomorrow.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
