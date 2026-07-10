'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const PLANS = [
  {
    id: 1,
    name: 'Volunteer',
    price: 'Free',
    description: 'Perfect for those who want to contribute occasionally',
    features: [
      'Participate in community events',
      'Access to volunteer opportunities',
      'Newsletter updates',
      'Community networking',
    ],
    popular: false,
    color: '#1a3a6b',
  },
  {
    id: 2,
    name: 'Member',
    price: 'NPR 1,500',
    period: '/year',
    description: 'For committed individuals seeking leadership growth',
    features: [
      'All volunteer benefits',
      'Voting rights in club decisions',
      'Leadership training programs',
      'Certificate of membership',
      'Priority event registration',
      'Mentorship opportunities',
    ],
    popular: true,
    color: '#C8102E',
  },
  {
    id: 3,
    name: 'Patron',
    price: 'NPR 5,000',
    period: '/year',
    description: 'For supporters who want to make a bigger impact',
    features: [
      'All member benefits',
      'Exclusive patron recognition',
      'Invitation to special events',
      'Project sponsorship opportunities',
      'Annual impact report',
      'Tax deduction benefits',
      'Priority board meeting access',
    ],
    popular: false,
    color: '#E8A000',
  },
];

export default function Pricing() {
  return (
    <section className="py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #EEF8FD 0%, #DCF0FB 100%)' }}>
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
              Membership
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
            Choose Your
            <span className="crimson-text"> Impact</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-royal/60 text-lg max-w-2xl mx-auto"
          >
            Join us in making a difference with a membership level that suits your commitment
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-white shadow-card-hover border-2 border-crimson scale-105'
                  : 'bg-white shadow-card border-2 border-cloud hover:border-royal/30'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-crimson text-white text-sm font-bold rounded-full shadow-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-display text-2xl font-bold mb-2" style={{ color: '#0d2657' }}>
                {plan.name}
              </h3>
              <p className="text-royal/60 text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                <span className="font-display text-4xl font-black" style={{ color: plan.color }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-royal/60 text-sm ml-1">{plan.period}</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-royal/10 flex items-center justify-center mt-0.5">
                      <Check size={12} className="text-royal" />
                    </div>
                    <span className="text-royal/80 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-crimson text-white hover:bg-crimson-light shadow-medium hover:shadow-large'
                    : 'bg-royal text-white hover:bg-royal-mid shadow-medium hover:shadow-large'
                }`}
              >
                Get Started
                <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 max-w-2xl mx-auto"
        >
          <p className="text-royal/60 text-sm mb-4">
            All membership fees directly support our community service projects and administrative costs.
          </p>
          <p className="text-royal/80 text-sm">
            Need a custom membership plan?{' '}
            <button className="text-royal font-semibold hover:underline">
              Contact us for special arrangements
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
