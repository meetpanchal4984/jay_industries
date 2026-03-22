"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessModal = ({ isOpen, message, onClose }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (isOpen) {
      setCountdown(5); // Reset countdown when it opens
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mobile-overlay" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      zIndex: 2000,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(5px)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <div className="glass-panel" style={{ 
        maxWidth: '380px', 
        width: '90%', 
        padding: '3rem 2rem', 
        textAlign: 'center',
        background: 'white',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        borderRadius: '2rem',
        animation: 'modalSlideUp 0.4s ease-out'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <CheckCircle size={80} color="#E86624" strokeWidth={1.5} />
        </div>
        <h3 className="heading-md" style={{ 
          marginBottom: '1rem', 
          fontSize: '2rem', 
          color: '#1a1a1a',
          fontWeight: '800'
        }}>
          Registration Successful!
        </h3>
        <p className="text-muted" style={{ 
          marginBottom: '1.5rem', 
          fontSize: '1.1rem',
          lineHeight: '1.6',
          color: '#666'
        }}>
          {message}
        </p>
        <div style={{ marginTop: '2rem' }}>
          <p style={{ fontSize: '1rem', color: '#888' }}>
            Redirecting to Login page in <span style={{ fontWeight: 'bold', color: '#E86624', fontSize: '1.5rem', margin: '0 5px' }}>{countdown}</span> seconds...
          </p>
        </div>
      </div>
      <style jsx>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default SuccessModal;
