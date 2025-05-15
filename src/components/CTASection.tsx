import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { Download, Clock, Mail, FileCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const CTASection = () => {
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const {
    toast
  } = useToast();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return {
            ...prevTime,
            seconds: prevTime.seconds - 1
          };
        } else if (prevTime.minutes > 0) {
          return {
            ...prevTime,
            minutes: prevTime.minutes - 1,
            seconds: 59
          };
        } else if (prevTime.hours > 0) {
          return {
            hours: prevTime.hours - 1,
            minutes: 59,
            seconds: 59
          };
        }
        return prevTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const handlePurchase = () => {
    toast({
      title: "Purchase successful!",
      description: "Thank you for purchasing Automation Empire. Check your email for download instructions."
    });
  };
  return <section id="checkout" className="section bg-gradient-to-b from-dark to-dark/95 border-t border-muted">
      <div ref={ref} className={`max-w-4xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-heading mb-6">
            <span className="text-accent">Build Once. Sell Forever.</span><br /> 
            <span className="text-hero">Start Now.</span>
          </h2>
        </div>
        
        <div className="bg-gradient-to-br from-muted to-dark p-8 md:p-12 rounded-xl shadow-2xl border border-hero/30">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-full md:w-2/3">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-light/70 line-through text-lg">Regular Price: $49.99</span>
                  <span className="bg-accent text-dark px-3 py-1 rounded-full font-bold text-sm">80% OFF</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold mr-2">$9.99</span>
                  <span className="text-light/70">one-time payment</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Download className="text-accent" />
                  <span className="font-semibold">Instant Digital Download</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-accent" />
                  <span className="font-semibold">Email Support from Eric</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileCheck className="text-accent" />
                  <span className="font-semibold">First 50 buyers get a bonus checklist</span>
                </div>
              </div>
              
              <Button onClick={handlePurchase} size="lg" className="w-full py-6 text-xl btn-action">
                Get My Copy Now
              </Button>
              
              <p className="text-center text-light/60 text-sm mt-4">Secure payment • 30-day money-back guarantee</p>
            </div>
            
            <div className="w-full md:w-1/3 bg-dark p-6 rounded-lg border border-hero/20">
              <div className="text-center mb-4">
                <Clock className="inline-block text-hero mb-2" size={28} />
                <h3 className="text-xl font-semibold">Limited Time Offer</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-muted p-3 rounded text-center">
                  <div className="text-2xl font-bold text-hero">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-light/70">HOURS</div>
                </div>
                <div className="bg-muted p-3 rounded text-center">
                  <div className="text-2xl font-bold text-hero">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-light/70">MINUTES</div>
                </div>
                <div className="bg-muted p-3 rounded text-center">
                  <div className="text-2xl font-bold text-hero">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-light/70">SECONDS</div>
                </div>
              </div>
              
              <p className="text-sm text-light/80 text-center">
                Price increases when the timer hits zero
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CTASection;