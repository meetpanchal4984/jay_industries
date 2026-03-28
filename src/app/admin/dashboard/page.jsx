"use client";
import React, { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import { Users, UserCheck, Activity, Package, Plus, Image as ImageIcon, Type, FileText, X, ShieldAlert, ShieldCheck, ExternalLink, LogOut, Eye, EyeOff } from 'lucide-react';

// CountUp Component for animated statistics
const CountUp = ({ end, duration = 1500 }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}</span>;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_users: 0,
    logged_in_users: 0,
    active_users: 0
  });
  const [users, setUsers] = useState([]);
  const [adminProducts, setAdminProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productForm, setProductForm] = useState({
    name: '',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [subFiles, setSubFiles] = useState([]);
  const [subPreviews, setSubPreviews] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.is_admin) {
          setIsAdmin(true);
          fetchStats(token);
          fetchUsers(token);
          fetchAdminProducts(token);
        } else {
          window.location.href = "/";
        }
      })
      .catch(err => {
        console.error(err);
        window.location.href = "/login";
      })
      .finally(() => setLoading(false));

    // Polling logic for real-time status updates every 30 seconds
    const intervalId = setInterval(() => {
      const token = localStorage.getItem("access_token");
      if (token && isAdmin) {
        fetchStats(token);
        fetchUsers(token);
        fetchAdminProducts(token);
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, [isAdmin]);

  const fetchStats = async (token) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/stats`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchUsers = async (token) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchAdminProducts = async (token) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setAdminProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleToggleAdmin = async (userId) => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/toggle-admin`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchUsers(token);
        setMessage({ type: 'success', text: 'User permissions updated successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      } else {
        const errorData = await res.json();
        setMessage({ type: 'error', text: errorData.detail || 'Failed to update permissions' });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      }
    } catch (err) {
      console.error("Error toggling admin:", err);
    }
  };

  const handleTogglePublish = async (productId) => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}/toggle-publish`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchAdminProducts(token);
        setMessage({ type: 'success', text: 'Product visibility updated!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (err) {
      console.error("Error toggling publish:", err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to PERMANENTLY delete this product? This cannot be undone.")) {
      return;
    }

    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchAdminProducts(token);
        setMessage({ type: 'success', text: 'Product deleted permanently.' });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleInputChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type = 'main') => {
    if (type === 'main') {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...subFiles, ...newFiles].slice(0, 3);
      setSubFiles(updatedFiles);
      const previews = updatedFiles.map(file => URL.createObjectURL(file));
      setSubPreviews(previews);
    }
  };

  const removeMainImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const removeSubImage = (index) => {
    const updatedFiles = [...subFiles];
    const updatedPreviews = [...subPreviews];
    if (updatedPreviews[index]) URL.revokeObjectURL(updatedPreviews[index]);
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setSubFiles(updatedFiles);
    setSubPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage({ type: 'error', text: 'Please select a main image file' });
      return;
    }

    setFormLoading(true);
    const token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append('name', productForm.name);
    formData.append('description', productForm.description);
    formData.append('main_image', selectedFile);
    subFiles.forEach(file => formData.append('sub_images', file));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Product added successfully!' });
        setProductForm({ name: '', description: '' });
        setSelectedFile(null);
        setPreviewUrl(null);
        setSubFiles([]);
        setSubPreviews([]);
        fetchAdminProducts(token);
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.detail || 'Failed to add product' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An error occurred during upload' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
          method: 'POST',
          headers: { "Authorization": `Bearer ${token}` }
        });
      } catch (err) { }
    }
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  const getFilteredUsers = () => {
    return users.filter(user => {
      const matchesSearch =
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === 'all' ||
        (roleFilter === 'admin' && user.is_admin) ||
        (roleFilter === 'user' && !user.is_admin);

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'online' && user.is_logged_in) ||
        (statusFilter === 'offline' && !user.is_logged_in);

      return matchesSearch && matchesRole && matchesStatus;
    });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <div className="loader"></div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', padding: '2rem', textAlign: 'center', color: 'var(--text-main)' }}>
        <div className="glass-panel" style={{ padding: '3rem 2rem', maxWidth: '400px', borderRadius: '24px' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(234, 88, 12, 0.1)', color: 'var(--copper)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Activity size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Desktop View Required</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            The Admin Dashboard is optimized for Desktop and Tablet experiences. Please log in from a larger device to manage your store.
          </p>
          <button 
            onClick={() => window.location.href = '/'} 
            style={{ width: '100%', padding: '1rem', background: 'var(--copper)', color: '#fff', borderRadius: '12px', fontWeight: '700', fontSize: '0.9rem' }}
          >
            Back to Website
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const sidebarItems = [
    { id: 'users', label: 'Registered Users', icon: <Users size={20} /> },
    { id: 'products', label: 'Product Inventory', icon: <Package size={20} /> }
  ];

  return (
    <AuthGuard>
      <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-main)', color: 'var(--text-main)', overflow: 'hidden' }}>
        <aside style={{
          width: '300px',
          background: 'var(--bg-card)',
          borderRight: '1px solid var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 100,
          padding: '2rem 1.5rem',
          boxShadow: '10px 0 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '3rem', padding: '0 0.5rem' }}>
            <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '0.25rem' }}>Jay Industries Admin</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>Control Center</p>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '12px',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: activeTab === item.id ? 'var(--copper)' : 'transparent',
                  color: activeTab === item.id ? '#fff' : 'var(--text-main)',
                  boxShadow: activeTab === item.id ? '0 10px 20px rgba(234, 88, 12, 0.2)' : 'none',
                  fontWeight: '600',
                  fontSize: '0.95rem'
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: 'auto' }}>
            <button onClick={() => window.location.href = '/'} style={{ width: '100%', background: 'rgba(234, 88, 12, 0.1)', color: 'var(--copper)', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid rgba(234, 88, 12, 0.2)', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>
              <ExternalLink size={18} /> <span>Go to Website</span>
            </button>
            <button onClick={handleLogout} style={{ width: '100%', color: '#ff4d4d', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '12px', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>
              <LogOut size={18} /> <span>Log Out</span>
            </button>
          </div>
        </aside>

        <main style={{ flex: 1, marginLeft: '300px', height: '100vh', overflowY: 'auto', position: 'relative' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 5% 6rem' }}>
            <header style={{ marginBottom: '3.5rem' }}>
              <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '30px', background: 'rgba(234, 88, 12, 0.1)', color: 'var(--copper)', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                ADMINISTRATIVE AREA
              </div>
              <h2 className="heading-md" style={{ marginBottom: '0.75rem', fontSize: '2.5rem' }}>
                {activeTab === 'users' ? 'User Management' : 'Inventory Management'}
              </h2>
            </header>

            {activeTab === 'users' && (
              <div>
                <div className="grid-3 mb-12" style={{ gap: '1.5rem' }}>
                  <div className="glass-panel" style={{ padding: '2.5rem' }}>
                    <p className="text-muted" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Total Accounts</p>
                    <h3 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-main)' }}><CountUp end={stats.total_users} /></h3>
                  </div>
                  <div className="glass-panel" style={{ padding: '2.5rem' }}>
                    <p className="text-muted" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Authenticated</p>
                    <h3 style={{ fontSize: '3rem', fontWeight: '800', color: '#25d366' }}><CountUp end={stats.logged_in_users} /></h3>
                  </div>
                  <div className="glass-panel" style={{ padding: '2.5rem' }}>
                    <p className="text-muted" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Live Session</p>
                    <h3 style={{ fontSize: '3rem', fontWeight: '800', color: '#8b5cf6' }}><CountUp end={stats.active_users} /></h3>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', marginTop: '4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Users size={24} style={{ color: 'var(--copper)' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>User Directory</h3>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                      {getFilteredUsers().length} RESULTS
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {/* Search Bar */}
                    <div style={{ position: 'relative' }}>
                      <ImageIcon size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3, color: 'var(--text-main)' }} />
                      <input
                        type="text"
                        placeholder="Search identity or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          padding: '0.65rem 1rem 0.65rem 2.5rem',
                          borderRadius: '10px',
                          background: 'var(--bg-alt)',
                          border: '1px solid var(--glass-border)',
                          color: 'var(--text-main)',
                          fontSize: '0.85rem',
                          width: '240px',
                          transition: 'all 0.3s'
                        }}
                      />
                    </div>

                    {/* Role Filter */}
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      style={{
                        padding: '0.65rem 1rem',
                        borderRadius: '10px',
                        background: 'var(--bg-alt)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-main)',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value="all" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>All Roles</option>
                      <option value="admin" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Administrators</option>
                      <option value="user" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>General Users</option>
                    </select>

                    {/* Status Filter */}
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{
                        padding: '0.65rem 1rem',
                        borderRadius: '10px',
                        background: 'var(--bg-alt)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-main)',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value="all" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>All Status</option>
                      <option value="online" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Online Now</option>
                      <option value="offline" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Currently Offline</option>
                    </select>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}>
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <th style={{ padding: '1rem' }}>User Identity</th>
                        <th style={{ padding: '1rem' }}>Contact Details</th>
                        <th style={{ padding: '1rem' }}>Access Level</th>
                        <th style={{ padding: '1rem' }}>Status</th>
                        <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredUsers().length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            No users found matching your search criteria.
                          </td>
                        </tr>
                      ) : getFilteredUsers().map(user => (
                        <tr key={user.id} className="user-row" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '15px' }}>
                          <td style={{ padding: '1.25rem 1rem', borderRadius: '15px 0 0 15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                              {/* Avatar Circle */}
                              <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, var(--copper), #b45309)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                fontWeight: '800',
                                color: '#fff',
                                boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)'
                              }}>
                                {user.full_name.charAt(0).toUpperCase()}
                              </div>
                              {/* Identity Info */}
                              <div>
                                <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--text-main)' }}>{user.full_name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>ID: #{user.id}</div>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: '1.25rem 1rem' }}>
                            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-main)' }}>{user.email}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>{user.mobile || 'N/A'}</div>
                          </td>

                          <td style={{ padding: '1.25rem 1rem' }}>
                            <span style={{
                              padding: '0.4rem 0.8rem',
                              borderRadius: '30px',
                              background: user.is_admin ? 'rgba(234, 88, 12, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                              color: user.is_admin ? 'var(--copper)' : 'var(--text-muted)',
                              fontSize: '0.65rem',
                              fontWeight: '800',
                              border: user.is_admin ? '1px solid rgba(234, 88, 12, 0.3)' : '1px solid var(--glass-border)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              boxShadow: user.is_admin ? '0 0 15px rgba(234, 88, 12, 0.1)' : 'none'
                            }}>
                              {user.is_admin ? 'ADMINISTRATOR' : 'GENERAL USER'}
                            </span>
                          </td>

                          <td style={{ padding: '1.25rem 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '700', color: user.is_logged_in ? '#25d366' : 'var(--text-muted)' }}>
                              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: user.is_logged_in ? '#25d366' : '#6b7280' }}></div>
                              {user.is_logged_in ? 'Online' : 'Offline'}
                            </div>
                          </td>

                          <td style={{ padding: '1.25rem 1rem', textAlign: 'right', borderRadius: '0 15px 15px 0' }}>
                            <button
                              onClick={() => handleToggleAdmin(user.id)}
                              style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '8px',
                                border: `1px solid ${user.is_admin ? '#ef444466' : '#22c55e66'}`,
                                background: user.is_admin ? 'rgba(239, 68, 68, 0.05)' : 'rgba(34, 197, 94, 0.05)',
                                color: user.is_admin ? '#ef4444' : '#22c55e',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              className="action-btn"
                            >
                              {user.is_admin ? 'Revoke Admin' : 'Make Admin'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem' }}>
                  <div className="glass-panel" style={{ padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem' }}>Add Product</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <input type="text" name="name" value={productForm.name} onChange={handleInputChange} placeholder="Product Name" style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff' }} required />
                      <textarea name="description" value={productForm.description} onChange={handleInputChange} placeholder="Description" rows="4" style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', resize: 'none' }} required />
                      {/* Main Image Upload with removal */}
                      <div className="form-group" style={{ position: 'relative' }}>
                        <button type="button" onClick={() => document.getElementById('mainImg').click()} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px dashed var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <ImageIcon size={18} />
                          {selectedFile ? selectedFile.name : 'Select Main Image'}
                          <input id="mainImg" type="file" hidden onChange={(e) => handleFileChange(e, 'main')} />
                        </button>
                        {selectedFile && (
                          <button
                            type="button"
                            onClick={removeMainImage}
                            style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>

                      {/* Sub-Images Upload Section */}
                      <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Gallery Sub-Images (Max 3)</label>
                        <button
                          type="button"
                          onClick={() => subFiles.length < 3 && document.getElementById('subImg').click()}
                          style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px dashed var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', cursor: subFiles.length >= 3 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: subFiles.length >= 3 ? 0.5 : 1 }}
                        >
                          <Plus size={18} />
                          {subFiles.length > 0 ? `${subFiles.length} Picked` : 'Pick Sub-Images'}
                          <input id="subImg" type="file" hidden multiple onChange={(e) => handleFileChange(e, 'sub')} />
                        </button>
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ padding: '1rem' }} disabled={formLoading}>
                        {formLoading ? 'Publishing...' : 'Publish Product'}
                      </button>
                      {message.text && <div style={{ padding: '1rem', borderRadius: '12px', background: message.type === 'success' ? '#25d36622' : '#ff4d4d22', color: message.type === 'success' ? '#25d366' : '#ff4d4d', textAlign: 'center' }}>{message.text}</div>}
                    </form>
                  </div>
                  <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem' }}>Asset Preview</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {/* Main Preview Container */}
                      <div style={{ width: '100%', aspectRatio: '16/9', background: '#0002', borderRadius: '12px', border: '1px solid var(--glass-border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        {previewUrl ? (
                          <img src={previewUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <ImageIcon size={32} opacity={0.2} />
                        )}
                        {previewUrl && (
                          <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'var(--copper)', color: '#fff', fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '800' }}>MAIN</div>
                        )}
                      </div>

                      {/* Sub Previews Grid */}
                      {subPreviews.length > 0 && (
                        <div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '0.75rem' }}>GALLERY IMAGES</p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                            {subPreviews.map((src, i) => (
                              <div key={i} style={{ aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--glass-border)', position: 'relative', background: '#0001' }}>
                                <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button
                                  type="button"
                                  onClick={() => removeSubImage(i)}
                                  style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(255, 77, 77, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem' }}>Inventory Status</h3>
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        <th style={{ padding: '0 1rem' }}>Product</th>
                        <th style={{ padding: '0 1rem' }}>Visibility</th>
                        <th style={{ padding: '0 1rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminProducts.map(product => (
                        <tr key={product.id} className="user-row" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          <td style={{ padding: '1.5rem 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <img src={`${process.env.NEXT_PUBLIC_API_URL}${product.image_url}`} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                              <div style={{ fontWeight: '700' }}>{product.name}</div>
                            </div>
                          </td>
                          <td>
                            <button onClick={() => handleTogglePublish(product.id)} style={{ padding: '0.4rem 1rem', borderRadius: '30px', background: 'transparent', border: '1px solid currentColor', color: product.is_published ? '#25d366' : '#ff4d4d', fontSize: '0.7rem', cursor: 'pointer', fontWeight: '700' }}>
                              {product.is_published ? 'PUBLISHED' : 'UNPUBLISHED'}
                            </button>
                          </td>
                          <td style={{ padding: '1.5rem 1rem', textAlign: 'right' }}>
                            <button onClick={() => handleDeleteProduct(product.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}><X size={20} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>

        <style jsx global>{`
          .user-row { transition: all 0.3s; }
          .user-row:hover { background: rgba(234, 88, 12, 0.05) !important; border-left: 4px solid var(--copper); }
          .action-btn:hover { background: rgba(234, 88, 12, 0.1) !important; transform: translateY(-1px); }
          .navbar, .footer { display: none !important; }
          .loader { width: 48px; height: 48px; border: 5px solid #ea580c22; border-bottom-color: #ea580c; border-radius: 50%; animation: rotation 1s linear infinite; }
          @keyframes rotation { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </AuthGuard>
  );
}
