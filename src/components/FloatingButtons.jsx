"use client";
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FloatingButtons() {
  const [isDark, setIsDark] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check saved theme or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDark(false);
      document.documentElement.removeAttribute('data-theme');
    }

    // Auto-show WhatsApp notification every 10 seconds
    const notificationInterval = setInterval(() => {
      setShowNotification(true);
      // Hide notification after 4 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
    }, 10000);

    return () => clearInterval(notificationInterval);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`fab-container ${isFabOpen ? 'open' : ''}`}>

      {showNotification && !isFabOpen && !pathname?.startsWith('/admin/dashboard') && (
        <div className="wa-notification">
          Need help? Chat with us on WhatsApp!
        </div>
      )}

      <div className={`fab-options ${isFabOpen ? 'show' : ''}`}>
        {!pathname?.startsWith('/admin/dashboard') && (
          <div className="fab-action-wrapper">
            <span className="fab-tooltip">Chat on WhatsApp</span>
            <a
              href="https://wa.me/919016799132"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-float-btn"
              aria-label="Chat on WhatsApp"
              onClick={() => setIsFabOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" stroke="none">
                <path d="M11.99 2C6.47 2 2 6.48 2 12c0 1.84.5 3.56 1.34 5.05L2 22l5.1-1.31A9.97 9.97 0 0 0 11.99 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.25c-1.55 0-3.03-.41-4.32-1.12l-.31-.18-3.2.82.85-3.11-.2-.33A8.2 8.2 0 0 1 3.75 12c0-4.55 3.7-8.25 8.24-8.25s8.25 3.7 8.25 8.25-3.7 8.25-8.25 8.25zm4.53-6.17c-.25-.12-1.48-.73-1.71-.82-.23-.08-.4-.12-.56.12-.17.25-.64.82-.79.98-.14.17-.29.19-.54.06-1.07-.54-2.18-1.2-3.05-2.29-.22-.28-.02-.41.1-.53.11-.1.25-.28.37-.42.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.45.06-.69.32-.23.25-.9.88-.9 2.15s.92 2.5 1.05 2.67c.12.17 1.82 2.78 4.41 3.84.62.25 1.1.4 1.48.51.62.2 1.18.17 1.62.1.49-.08 1.48-.6 1.69-1.18.21-.58.21-1.07.15-1.18-.08-.09-.25-.14-.5-.26z" />
              </svg>
            </a>
          </div>
        )}

        <div className="fab-action-wrapper">
          <span className="fab-tooltip">{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
          <button onClick={() => { toggleTheme(); setIsFabOpen(false); }} className="theme-toggle-fixed position-relative" aria-label="Toggle Theme">
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsFabOpen(!isFabOpen)}
        className="main-fab-btn"
        aria-label="Toggle Menu"
      >
        <svg
          viewBox="0 0 24 24"
          className={`custom-fab-icon ${isFabOpen ? 'is-open' : ''}`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        >
          <rect x="4" y="4" width="6" height="6" rx="1.5" className="grid-square sq-1" />
          <rect x="14" y="4" width="6" height="6" rx="1.5" className="grid-square sq-2" />
          <rect x="4" y="14" width="6" height="6" rx="1.5" className="grid-square sq-3" />
          <rect x="14" y="14" width="6" height="6" rx="1.5" className="grid-square sq-4" />
        </svg>
      </button>
    </div>
  );
}
