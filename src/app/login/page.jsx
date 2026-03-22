"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '', // FastAPI OAuth expects 'username' instead of 'email'
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      window.location.href = "/";
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formBody = new URLSearchParams();
      formBody.append('username', formData.username);
      formBody.append('password', formData.password);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // Store the token (in localStorage for simplicity)
      localStorage.setItem("access_token", data.access_token);

      // Redirect to homepage
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '2px solid #ccc',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    backgroundColor: 'white',
    color: '#111'
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
      <div style={{ maxWidth: '440px', width: '100%' }}>
        <div className="glass-panel" style={{ padding: '2.5rem 2rem', borderRadius: '1.5rem' }}>
          <h2 className="heading-md text-center mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: '1.2', fontWeight: '800' }}>Welcome <span className="text-gradient">Back</span></h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="username" style={inputStyle} value={formData.username} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" style={inputStyle} value={formData.password} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            {error && <div className="alert alert-danger" style={{ color: '#ff4d4d', marginTop: '1rem', textAlign: 'center', fontWeight: 'bold' }}>{error}</div>}

            <p className="text-center mt-3" style={{ marginTop: '1rem' }}>
              Don't have an account? <Link href="/register" style={{ color: '#E86624', fontWeight: 'bold' }}>Register Here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
