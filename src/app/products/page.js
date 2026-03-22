import React from 'react';
import Products from '../../components/Products';
import AuthGuard from '../../components/AuthGuard';

export default function ProductsPage() {
  return (
    <AuthGuard>
      <Products />
    </AuthGuard>
  );
}
