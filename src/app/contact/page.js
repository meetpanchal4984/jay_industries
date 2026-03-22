import React from 'react';
import Contact from '../../components/Contact';
import AuthGuard from '../../components/AuthGuard';

export default function ContactPage() {
  return (
    <AuthGuard>
      <Contact />
    </AuthGuard>
  );
}
