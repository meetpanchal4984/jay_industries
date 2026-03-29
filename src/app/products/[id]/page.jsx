"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Package, Maximize2, X } from 'lucide-react';
import { resolveBackendUrl } from '@/utils/url';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(resolveBackendUrl(`/products/${id}`))
      .then(res => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const allImages = product ? [
    { id: 'main', url: resolveBackendUrl(product.image_url) },
    ...(product.sub_images || []).map(img => ({ id: img.id, url: resolveBackendUrl(img.image_url) }))
  ] : [];

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', color: 'var(--text-main)', padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>⚠ {error}</h2>
        <Link href="/products" className="btn btn-primary">Back to Gallery</Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh' }}>
      <main style={{ paddingTop: '120px', paddingBottom: '100px' }}>
        <div className="container">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ marginBottom: '2.5rem' }}
          >
            <Link href="/products" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
              <ChevronLeft size={18} /> Back to Products
            </Link>
          </motion.div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            {/* Visual Section */}
            <div style={{ position: 'sticky', top: '120px' }}>
              {loading ? (
                <div className="skeleton" style={{ width: '100%', aspectRatio: '1/1', borderRadius: '24px' }}></div>
              ) : (
                <motion.div
                  layoutId="main-image"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="glass-panel"
                  style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '1/1', position: 'relative', cursor: 'zoom-in' }}
                  onClick={() => setSelectedImage(allImages[0]?.url)}
                >
                  <Image
                    src={allImages[0]?.url}
                    alt={product?.name || "Product"}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', background: 'rgba(0,0,0,0.5)', padding: '0.5rem', borderRadius: '12px', color: '#fff' }}>
                    <Maximize2 size={20} />
                  </div>
                </motion.div>
              )}

              {/* Gallery Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
                {loading ? (
                  [1, 2, 3].map(i => <div key={i} className="skeleton" style={{ aspectRatio: '1/1', borderRadius: '16px' }}></div>)
                ) : (
                  allImages.slice(1, 4).map((img, i) => (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + (i * 0.04) }}
                      onClick={() => setSelectedImage(img.url)}
                      className="glass-panel"
                      style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '1/1', cursor: 'pointer', border: '1px solid var(--glass-border)' }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image src={img.url} alt="Gallery" fill sizes="15vw" style={{ objectFit: 'cover' }} />
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Info Section */}
            <div>
              {loading ? (
                <>
                  <div className="skeleton" style={{ width: '150px', height: '20px', marginBottom: '1.5rem' }}></div>
                  <div className="skeleton" style={{ width: '80%', height: '60px', marginBottom: '2.5rem' }}></div>
                  <div className="skeleton" style={{ width: '100%', height: '200px', borderRadius: '24px' }}></div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--copper)', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    <Package size={16} /> Premium Quality
                  </div>
                  <h1 className="heading-lg" style={{ marginBottom: '1.5rem', fontSize: '3.5rem' }}>{product.name}</h1>

                  <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px', marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>Description</h3>
                    <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <button style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={40} />
            </button>
            <div style={{ position: 'relative', width: '90%', height: '80vh' }}>
              <Image
                src={selectedImage}
                alt="Enlarged"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (max-width: 968px) {
          .grid-2 { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .heading-lg { fontSize: 2.5rem !important; }
        }
      `}</style>
    </div>
  );
}
