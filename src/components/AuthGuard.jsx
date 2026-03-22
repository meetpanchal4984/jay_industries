"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      // Redirect to login if not authenticated
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // If authorized, show children; otherwise show nothing (or a loader)
  if (!authorized) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--bg-main)'
      }}>
        <div className="loader">Checking authentication...</div>
      </div>
    );
  }

  return children;
}
