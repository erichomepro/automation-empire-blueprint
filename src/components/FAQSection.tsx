
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
      question: "What tools do I need?",
      answer: "Google Sheets, Google Forms, Make.com (all free) — plus optional AI tools."
    },
    {
      question: "Is this for beginners?",
      answer: "Yes. Every chapter is written for total first-timers — with screenshots, steps, and real examples."
    },
    {
      question: "Can I sell what I build?",
      answer: "Yes. You'll learn how to package your systems into a product or retainer offer — with examples and pricing strategies."
    },
    {
      question: "Do I need to know how to code?",
      answer: "Nope. Not one line. The book is specifically designed for non-technical entrepreneurs."
    },
    {
      question: "Is this different from other automation courses?",
      answer: "This isn't just training—it's a business in a box. You get ready-to-sell templates, SOPs, and systems that you can implement immediately."
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
