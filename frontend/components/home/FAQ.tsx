'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    id: 1,
    question: 'What is the Leo Club of Pokhara Puspanjali?',
    answer: 'We are a youth organization under the International Lions Club, dedicated to community service, leadership development, and making a positive impact in Pokhara and across Nepal.',
  },
  {
    id: 2,
    question: 'How can I join the Leo Club?',
    answer: 'You can join by filling out our membership form on the contact page. We welcome young people aged 18-30 who are passionate about community service and leadership.',
  },
  {
    id: 3,
    question: 'What types of activities does the club organize?',
    answer: 'We organize various activities including blood donation drives, health camps, tree plantations, educational support programs, leadership workshops, and community clean-up campaigns.',
  },
  {
    id: 4,
    question: 'Is there a membership fee?',
    answer: 'Yes, there is a nominal annual membership fee that covers administrative costs and helps fund our community service projects. Contact us for current fee information.',
  },
  {
    id: 5,
    question: 'How can I volunteer without becoming a member?',
    answer: 'You can participate in our community service events as a volunteer. Follow our social media pages or contact us to learn about upcoming volunteer opportunities.',
  },
  {
    id: 6,
    question: 'What are the benefits of joining?',
    answer: 'Members gain leadership skills, networking opportunities, community impact experience, personal growth, and the satisfaction of making a real difference in society.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 overflow-hidden bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-2 bg-royal/10 text-royal rounded-full text-sm font-semibold mb-4">
              FAQ
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-4"
            style={{ color: '#0d2657' }}
          >
            Frequently Asked
            <span className="crimson-text"> Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-royal/60 text-lg max-w-2xl mx-auto"
          >
            Find answers to common questions about our club and activities
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left bg-white rounded-2xl border-2 border-cloud hover:border-royal/30 transition-all duration-300 overflow-hidden shadow-soft hover:shadow-medium"
              >
                <div className="p-6 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold pr-8" style={{ color: '#0d2657' }}>
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openId === faq.id ? (
                      <ChevronUp size={24} className="text-royal" />
                    ) : (
                      <ChevronDown size={24} className="text-royal" />
                    )}
                  </div>
                </div>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-royal/70 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-royal/60 mb-4">Still have questions?</p>
          <button className="px-8 py-4 bg-royal text-white rounded-xl hover:bg-royal-mid transition-all duration-200 font-medium shadow-medium hover:shadow-large inline-flex items-center gap-2">
            Contact Us
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
