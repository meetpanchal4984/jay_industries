"use client";
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    phone: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Only allow numbers and max 10 digits
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: numericValue });

      // Clear error as user types
      if (numericValue.length === 10) {
        setErrors({ ...errors, phone: '' });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { phone: '' };

    if (formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setStatus({ type: 'error', message: 'Please correct the highlighted errors.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ full_name: '', email: '', phone: '', subject: '', message: '' });
        setErrors({ phone: '' });
      } else {
        setStatus({ type: 'error', message: data.detail || "Failed to send message." });
      }
    } catch (error) {
      setStatus({ type: 'error', message: "Connection error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    border: `1px solid ${hasError ? '#F44336' : 'var(--glass-border)'}`,
    backgroundColor: 'var(--bg-main)',
    color: 'var(--text-main)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    marginTop: '0.5rem'
  });

  const labelStyle = {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--text-main)',
    marginBottom: '0.2rem'
  };

  return (
    <section id="contact" className="section contact-section section-darker">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="heading-md">GET IN <span className="text-gradient">TOUCH</span></h2>
          <p className="text-muted max-w-2xl mx-auto">
            Ready to start your next laser cutting project? Contact us for quotes and inquiries.
          </p>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form-container" style={{ marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}
          >
            <h3 className="contact-title" style={{ marginBottom: '2.5rem', textAlign: 'center', fontSize: '1.8rem' }}>Send us a <span className="text-gradient">Message</span></h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div className="form-group">
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    style={inputStyle(false)}
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    onFocus={(e) => { if (!errors.phone) e.target.style.borderColor = 'var(--copper)'; }}
                    onBlur={(e) => { if (!errors.phone) e.target.style.borderColor = 'var(--glass-border)'; }}
                  />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    style={inputStyle(false)}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    onFocus={(e) => { if (!errors.phone) e.target.style.borderColor = 'var(--copper)'; }}
                    onBlur={(e) => { if (!errors.phone) e.target.style.borderColor = 'var(--glass-border)'; }}
                  />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Phone Number (10 digits)</label>
                  <input
                    type="tel"
                    name="phone"
                    style={inputStyle(!!errors.phone)}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter 10 digit number"
                    onFocus={(e) => { if (!errors.phone) e.target.style.borderColor = 'var(--copper)'; }}
                    onBlur={(e) => { if (!errors.phone) e.target.style.borderColor = errors.phone ? '#F44336' : 'var(--glass-border)'; }}
                  />
                  {errors.phone && <span style={{ color: '#F44336', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    style={inputStyle(false)}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Inquiry Subject"
                    onFocus={(e) => { if (!errors.phone) e.target.style.borderColor = 'var(--copper)'; }}
                    onBlur={(e) => { if (!errors.phone) e.target.style.borderColor = 'var(--glass-border)'; }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  style={{ ...inputStyle(false), minHeight: '150px', resize: 'vertical' }}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message here..."
                  onFocus={(e) => { if (!errors.phone) e.target.style.borderColor = 'var(--copper)'; }}
                  onBlur={(e) => { if (!errors.phone) e.target.style.borderColor = 'var(--glass-border)'; }}
                ></textarea>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }} disabled={loading}>
                  {loading ? 'Sending...' : (
                    <>
                      SEND MESSAGE <Send size={18} />
                    </>
                  )}
                </button>
              </div>

              {status.message && (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  borderRadius: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  backgroundColor: status.type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                  color: status.type === 'success' ? '#4CAF50' : '#F44336',
                  border: `1px solid ${status.type === 'success' ? '#4CAF50' : '#F44336'}`,
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}>
                  {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </motion.div>
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
