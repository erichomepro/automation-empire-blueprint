import React from 'react';
import { useInView } from 'react-intersection-observer';
import { User } from 'lucide-react';
const SocialProofSection = () => {
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  return <section className="section py-16 bg-dark">
      <div ref={ref} className={`max-w-4xl mx-auto bg-gradient-to-br from-muted to-dark p-8 md:p-12 rounded-xl shadow-xl border border-hero/20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="h-24 w-24 rounded-full bg-hero/20 flex items-center justify-center flex-shrink-0 border-2 border-hero">
            <User size={40} className="text-hero" />
          </div>
          
          <div>
            <p className="text-xl md:text-2xl italic mb-6">
              "These are the exact systems that took my agency from side hustle to $20K+ months. 
              And I still use them today."
            </p>
            
            <div className="flex items-center">
              <div>
                <p className="font-heading text-xl">Eric Wick</p>
                <p className="text-light/70">CO-Founder of Cerberus Media</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default SocialProofSection;