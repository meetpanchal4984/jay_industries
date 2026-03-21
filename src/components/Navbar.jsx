"use client";
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
        setIsOpen(false); // also close mobile menu if scrolling down
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Overlay outside nav to prevent dimming the navbar's own background */}
      {isOpen && <div className="mobile-overlay" onClick={toggleMenu} aria-label="Close Mobile Menu"></div>}

      <nav className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
        <div className="container nav-container">
          <a href="#home" className="logo">
            <img src="./logo.png" alt="Jay Industries" className="logo-img" />
          </a>

          {/* Desktop Menu */}
          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About Us</a>
            <a href="#products" className="nav-link">Services</a>
            <a href="#contact" className="btn btn-primary nav-btn">Contact Us</a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-toggle-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Navigation">
              <span className={`bar ${isOpen ? 'bar-open' : ''}`}></span>
              <span className={`bar ${isOpen ? 'bar-open' : ''}`}></span>
              <span className={`bar ${isOpen ? 'bar-open' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isOpen ? 'mobile-open' : ''}`}>
            <a href="#home" className="nav-link mobile-link" onClick={toggleMenu}>Home</a>
            <a href="#about" className="nav-link mobile-link" onClick={toggleMenu}>About Us</a>
            <a href="#products" className="nav-link mobile-link" onClick={toggleMenu}>Services</a>
            <a href="#contact" className="btn btn-primary" onClick={toggleMenu}>Contact Us</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
