"use client";
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <a href="#home" className="logo" style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <img src="./logo.png" alt="Jay Industries" className="logo-img" style={{ height: '40px', filter: 'var(--logo-filter)' }} />
          </a>
          <p className="footer-desc text-muted">
            Premium CNC laser cutting service provider. Precision and high quality job work in Ahmedabad, Gujarat.
          </p>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#products">Services & Products</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-contact-info">
          <h3 className="footer-title">Contact Us</h3>
          <p className="text-muted">ARYAN ESTATE, 26, opp. Mallinath steel, near vandematram railway crossing, Gota, Ahmedabad, Gujarat 382481</p>
          <p className="text-muted">Phone: +91 90167 99132</p>
          <p className="text-muted">Email: bipinjski@gmail.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="text-muted">© {year} Jay Industries. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
