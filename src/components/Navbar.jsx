"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutGrid, Users, Briefcase, Package, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check local storage for token on mount
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }

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

  // Handle body scroll locking and global class when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    // Optionally redirect to home or login page
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile Overlay outside nav to prevent dimming the navbar's own background */}
      {isOpen && <div className="mobile-overlay" onClick={toggleMenu} aria-label="Close Mobile Menu"></div>}

      <nav className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
        <div className="container nav-container">
          <Link href="/" className="logo">
            <img src="./logo.png" alt="Jay Industries" className="logo-img" />
          </Link>

          {/* Desktop Menu */}
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/services" className="nav-link">Services</Link>
            <Link href="/products" className="nav-link">Products</Link>
            <Link href="/about" className="nav-link">About Us</Link>
            <Link href="/contact" className="nav-link">Contact Us</Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn btn-primary nav-btn" style={{ marginLeft: '1rem', cursor: 'pointer' }}>Logout</button>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                <Link href="/login" className="btn btn-outline nav-btn">Login</Link>
                <Link href="/register" className="btn btn-primary nav-btn">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-toggle-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Navigation">
              <span className={`bar ${isOpen ? 'bar-open' : ''}`}></span>
              <span className={`bar ${isOpen ? 'bar-open' : ''}`}></span>
              <span className={`bar ${isOpen ? 'bar-open' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Moved outside of the <nav> element to prevent CSS inheritance clipping from the pill design! */}
      <div className={`mobile-menu ${isOpen ? 'mobile-open' : ''}`}>
        <div className="mobile-menu-header" style={{ justifyContent: 'flex-end', borderBottom: 'none' }}>
          <button className="mobile-close-btn" onClick={toggleMenu} aria-label="Close Menu">
            <X size={20} />
          </button>
        </div>

        <div className="mobile-links-container">
          <Link href="/" className="mobile-link" onClick={toggleMenu}>
            <LayoutGrid size={20} className="mobile-icon" /> Home
          </Link>
          <Link href="/services" className="mobile-link" onClick={toggleMenu}>
            <Briefcase size={20} className="mobile-icon" /> Services
          </Link>
          <Link href="/products" className="mobile-link" onClick={toggleMenu}>
            <Package size={20} className="mobile-icon" /> Products
          </Link>
          <Link href="/about" className="mobile-link" onClick={toggleMenu}>
            <Users size={20} className="mobile-icon" /> About Us
          </Link>
          <Link href="/contact" className="mobile-link" onClick={toggleMenu}>
            <Briefcase size={20} className="mobile-icon" /> Contact Us
          </Link>
        </div>

        <div className="mobile-menu-footer" style={{ marginTop: 'auto', background: 'transparent', padding: 0, border: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {isLoggedIn ? (
            <button onClick={() => { handleLogout(); toggleMenu(); }} className="btn btn-primary" style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline" onClick={toggleMenu} style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', background: 'white' }}>
                Login
              </Link>
              <Link href="/register" className="btn btn-primary" onClick={toggleMenu} style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
