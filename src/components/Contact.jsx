"use client";
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="section contact-section section-darker">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="heading-md">GET IN <span className="text-gradient">TOUCH</span></h2>
          <p className="text-muted max-w-2xl mx-auto">
            Ready to start your next laser cutting project? Contact us for quotes and inquiries.
          </p>
        </div>

        <div className="contact-grid">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="contact-info glass-panel"
          >
            <h3 className="contact-title">Contact Information</h3>

            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="contact-item">
              <div className="contact-icon bg-gradient">
                <MapPin size={24} />
              </div>
              <div className="contact-details">
                <h4>Address</h4>
                <p className="text-muted">ARYAN ESTATE, 26, opp. Mallinath steel, near vandematram railway crossing, Gota, Ahmedabad, Gujarat 382481</p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="contact-item">
              <div className="contact-icon bg-gradient">
                <Phone size={24} />
              </div>
              <div className="contact-details">
                <h4>Phone</h4>
                <p className="text-muted">+91 90167 99132</p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="contact-item">
              <div className="contact-icon bg-gradient">
                <Mail size={24} />
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <p className="text-muted">bipinjski@gmail.com</p>
              </div>
            </motion.div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="contact-map glass-panel"
          >
            <iframe
              src="https://maps.google.com/maps?q=ARYAN%20ESTATE,%20near%20vandematram%20railway%20crossing,%20Gota,%20Ahmedabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '8px', minHeight: '400px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jay Industries Location Map"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
