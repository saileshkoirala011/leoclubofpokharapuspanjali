'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
              Contact Us
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-4"
            style={{ color: '#0d265n7' }}
          >
            Get in
            <span className="crimson-text"> Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-royal/60 text-lg max-w-2xl mx-auto"
          >
            Have questions or want to join us? We'd love to hear from you
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl font-bold mb-8" style={{ color: '#0d2657' }}>
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-royal/10 flex items-center justify-center">
                  <MapPin size={24} className="text-royal" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: '#0d2657' }}>Address</h4>
                  <p className="text-royal/70">Pokhara, Nepal</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-royal/10 flex items-center justify-center">
                  <Phone size={24} className="text-royal" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: '#0d2657' }}>Phone</h4>
                  <p className="text-royal/70">+977 98XXXXXXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-royal/10 flex items-center justify-center">
                  <Mail size={24} className="text-royal" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: '#0d2657' }}>Email</h4>
                  <p className="text-royal/70">info@leoclubpokhara.org</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-royal/10 flex items-center justify-center">
                  <Clock size={24} className="text-royal" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: '#0d2657' }}>Office Hours</h4>
                  <p className="text-royal/70">Mon - Sat: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-medium h-64 bg-cloud flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-royal/30 mx-auto mb-2" />
                <p className="text-royal/50 text-sm">Map will be displayed here</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl font-bold mb-8" style={{ color: '#0d2657' }}>
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                fullWidth
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                fullWidth
              />

              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                fullWidth
              />

              <div>
                <label className="block text-sm font-medium text-royal mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-xl border border-cloud focus:border-royal focus:ring-2 focus:ring-royal focus:outline-none transition-all duration-200 min-h-[48px]"
                >
                  <option value="">Select a subject</option>
                  <option value="membership">Membership Inquiry</option>
                  <option value="volunteer">Volunteer Opportunity</option>
                  <option value="partnership">Partnership Proposal</option>
                  <option value="event">Event Information</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-royal mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  rows={5}
                  className="w-full px-5 py-3 rounded-xl border border-cloud focus:border-royal focus:ring-2 focus:ring-royal focus:outline-none transition-all duration-200 resize-none"
                />
              </div>

              <Button
                type="submit"
                isLoading={isSubmitting}
                icon={<Send size={18} />}
                fullWidth
                size="lg"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
