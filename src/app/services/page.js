import React from 'react';
import Services from '../../components/Services';
import AuthGuard from '../../components/AuthGuard';

export default function ServicesPage() {
  return (
    <AuthGuard>
      <Services />
    </AuthGuard>
  );
}
