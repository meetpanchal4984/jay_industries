import React from 'react';
import About from '../../components/About';
import AuthGuard from '../../components/AuthGuard';

export default function AboutPage() {
  return (
    <AuthGuard>
      <About />
    </AuthGuard>
  );
}
