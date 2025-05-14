
import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const faqs = [
    {
      question: "Do I need tech experience?",
      answer: "Nope. Everything's step-by-step and templated. If you can follow instructions, you can implement these systems. No coding or technical background required."
    },
    {
      question: "Can I resell the systems?",
      answer: "Yes — that's the whole point! The templates and systems are designed specifically so you can customize them for your clients and sell them as your own products."
    },
    {
      question: "How fast can I make money?",
      answer: "Some users close a client in under 2 weeks. The templates and systems are designed to be implemented quickly, allowing you to start selling them almost immediately."
    },
    {
      question: "Do I need to pay for other tools?",
      answer: "You'll need free accounts with Make.com and Airtable to get started. The free tiers are sufficient for learning, and you can upgrade as your client base grows."
    },
    {
      question: "How is this different from other automation courses?",
      answer: "This isn't just training—it's a business in a box. You get ready-to-sell templates, SOPs, and systems that you can implement immediately, not just theoretical knowledge."
    }
  ];
  
  return (
    <section id="faq" className="section bg-dark">
      <div 
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            <span className="text-hero">Frequently Asked Questions</span>
          </h2>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-hero/20">
              <AccordionTrigger className="text-xl font-semibold py-4 text-light hover:text-hero">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-light/80 text-lg pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
