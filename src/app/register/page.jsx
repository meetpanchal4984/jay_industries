"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import SuccessModal from '../../components/SuccessModal';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      window.location.href = "/";
    }
  }, []);

  // Helper to validate email format
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for mobile to only allow digits and max 10 chars
    if (name === 'mobile') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear field-specific error when user typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError(null);
    const newErrors = {};

    // Front-end validation
    if (!validateEmail(formData.email)) {
      newErrors.email = true;
    }
    if (formData.mobile.length !== 10) {
      newErrors.mobile = true;
    }
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setGlobalError("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
      }
      setShowSuccess(true);
    } catch (err) {
      setGlobalError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    window.location.href = "/login";
  };

  const inputStyle = (isError) => ({
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: `2px solid ${isError ? '#ff4d4d' : '#ccc'}`,
    transition: 'border-color 0.3s ease',
    outline: 'none',
    backgroundColor: 'white'
  });

  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
      <SuccessModal
        isOpen={showSuccess}
        message="Your registration is complete. Welcome to Jay Industries!"
        onClose={handleModalClose}
      />

      <div style={{ maxWidth: '540px', width: '100%' }}>
        <div className="glass-panel" style={{ padding: '2.5rem 2rem', borderRadius: '1.5rem' }}>
          <h2 className="heading-md text-center mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: '1.2', fontWeight: '800' }}>Create an <span className="text-gradient">Account</span></h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="full_name" style={inputStyle(errors.full_name)} value={formData.full_name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" style={inputStyle(errors.email)} value={formData.email} onChange={handleChange} required />
              {errors.email && <span style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>Invalid email format</span>}
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input type="tel" name="mobile" style={inputStyle(errors.mobile)} value={formData.mobile} onChange={handleChange} required />
              {errors.mobile && <span style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>Must be exactly 10 digits</span>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" style={inputStyle(errors.password)} value={formData.password} onChange={handleChange} required minLength="6" />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" name="confirm_password" style={inputStyle(errors.confirm_password)} value={formData.confirm_password} onChange={handleChange} required minLength="6" />
              {errors.confirm_password && <span style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>Passwords do not match</span>}
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>

            {globalError && <div className="alert alert-danger" style={{ color: '#ff4d4d', marginTop: '1rem', textAlign: 'center', fontWeight: 'bold' }}>{globalError}</div>}

            <p className="text-center mt-3" style={{ marginTop: '1rem' }}>
              Already have an account? <Link href="/login" style={{ color: '#E86624', fontWeight: 'bold' }}>Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
