'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const FAQS = [
  { id:1, q: 'What is the Leo Club of Pokhara Puspanjali?',
    a: 'We are a youth organization under the International Lions Club, dedicated to community service, leadership development, and making a positive impact in Pokhara and across Nepal.' },
  { id:2, q: 'How can I join the Leo Club?',
    a: 'You can join by filling out our membership form on the contact page. We welcome young people aged 18–30 who are passionate about community service and leadership.' },
  { id:3, q: 'What types of activities does the club organize?',
    a: 'We organize blood donation drives, health camps, tree plantations, educational support programs, leadership workshops, and community clean-up campaigns.' },
  { id:4, q: 'Is there a membership fee?',
    a: 'Yes, there is a nominal annual membership fee that covers administrative costs and helps fund our community service projects. Contact us for current fee information.' },
  { id:5, q: 'How can I volunteer without becoming a member?',
    a: 'You can participate in our community service events as a volunteer. Follow our social media pages or contact us to learn about upcoming volunteer opportunities.' },
  { id:6, q: 'What are the benefits of joining?',
    a: 'Members gain leadership skills, networking opportunities, community impact experience, personal growth, and the satisfaction of making a real difference in society.' },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-20 lg:py-28 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        <div className="grid lg:grid-cols-5 gap-14 items-start">

          {/* Left — heading */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity:0, y:16 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.55 }}
            >
              <span className="chip chip-blue mb-5">FAQ</span>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#1E293B] leading-[1.1] mb-5">
                Frequently{" "}
                <span style={{ background: "linear-gradient(135deg,#1B3A6B,#4A7FD4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Asked
                </span>
                <br />Questions
              </h2>
              <p className="text-[#64748B] text-[15px] leading-relaxed mb-8">
                Can&apos;t find the answer you&apos;re looking for? Reach out to our team.
              </p>
              <Link href="/contact" className="btn btn-primary btn-sm">
                Contact Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity:0, y:12 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.4, delay: i * 0.06 }}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                  openId === faq.id
                    ? 'border-[#D6EAF8] bg-[#F0F6FF]'
                    : 'border-[#E8F4FD] bg-white hover:border-[#D6EAF8]'
                }`}
                style={{ boxShadow: openId === faq.id ? "0 4px 20px rgba(27,58,107,0.10)" : "none" }}
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                  aria-expanded={openId === faq.id}
                >
                  <h3 className={`font-display font-bold text-[15px] leading-snug transition-colors ${
                    openId === faq.id ? 'text-[#1B3A6B]' : 'text-[#1E293B] group-hover:text-[#1B3A6B]'
                  }`}>
                    {faq.q}
                  </h3>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: openId === faq.id ? "#1B3A6B" : "#EBF3FF",
                    }}
                  >
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300"
                      fill="none" viewBox="0 0 24 24" stroke={openId === faq.id ? "white" : "#1B3A6B"} strokeWidth={2.5}
                      style={{ transform: openId === faq.id ? "rotate(45deg)" : "rotate(0)" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height:0, opacity:0 }}
                      animate={{ height:"auto", opacity:1 }}
                      exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.28 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[#64748B] text-[15px] leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
