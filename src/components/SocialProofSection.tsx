
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { User } from 'lucide-react';

const SocialProofSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const testimonials = [
    {
      quote: "These are the exact systems that took my agency from side hustle to $20K+ months. And I still use them today.",
      name: "Eric Wick",
      title: "CO-Founder of Cerberus Media"
    },
    {
      quote: "I never realized how powerful Make.com could be until I followed this book. My entire onboarding is now automated.",
      name: "Alex",
      title: "Course Creator"
    },
    {
      quote: "This book didn't just teach me how to build workflows — it gave me something I could sell.",
      name: "Jen",
      title: "Freelance Ops Consultant"
    }
  ];
  
  return (
    <section className="section py-16 bg-dark">
      <div ref={ref} className={`max-w-4xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            <span className="text-hero">What People Are Saying</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-muted to-dark p-6 rounded-xl shadow-xl border border-hero/20"
            >
              <p className="text-lg italic mb-6 text-light/90">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-hero/20 flex items-center justify-center flex-shrink-0 border-2 border-hero mr-3">
                  <User size={20} className="text-hero" />
                </div>
                
                <div>
                  <p className="font-heading text-lg">{testimonial.name}</p>
                  <p className="text-light/70 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
