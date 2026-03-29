"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const dummyProducts = [
  { id: 1, title: 'Custom Metal Gears', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Precision metallic gear components.' },
  { id: 2, title: 'Precision CNC Bending', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Expert metal bending service for manufacturing.' },
  { id: 3, title: 'Sheet Metal Perforation', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Custom perforation patterns on steel sheets.' },
  { id: 4, title: 'Sheet Metal Enclosure', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Durable custom metal enclosures.' },
  { id: 5, title: 'Precision Machinery Parts', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Industrial machine components.' },
  { id: 6, title: 'Steel Bracket Assembly', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Precision welded metal brackets.' },
  { id: 7, title: 'MS CNC Cut Jali', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Mild steel laser-cut jali for architecture.' },
  { id: 8, title: 'Stainless Steel Letters', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Outdoor SS branding letters.' },
  { id: 9, title: 'Industrial Mesh Panels', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Laser-cut mesh panels for industrial use.' },
  { id: 10, title: 'Metal Stencils', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Stencils for scale painting.' },
  { id: 11, title: 'Engraved Metal Nameplates', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Deep-etched industrial metal plates.' },
  { id: 12, title: 'Mild Steel Grills', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Architectural steel grills.' },
  { id: 13, title: 'Metal Architectural Panels', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Custom laser-cut panels for buildings.' },
  { id: 14, title: 'Industrial Safety Grills', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Metal safety components for machinery.' },
  { id: 15, title: 'Metal Enclosures', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Protective casing for electronics.' },
  { id: 16, title: 'Metal Switchboard Plates', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Precision-cut metal control panels.' },
  { id: 17, title: 'MS Machine Frames', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Heavy-duty machine base frames.' },
  { id: 18, title: 'Lift Interiors', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Decorative elevator panelling.' },
  { id: 19, title: 'Control Panel Facades', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Precision sheets for electrical controls.' },
  { id: 20, title: 'Industrial Metal Ladder', category: 'Metal', image: './industrial_laser_background_1773484815633.png', desc: 'Custom-built industrial ladders and safety steps.' }
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [backendProducts, setBackendProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBackendProducts(data);
        }
      })
      .catch(err => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const productsData = backendProducts.length > 0
    ? backendProducts.map(p => {
      let imageUrl = p.image_url;
      if (imageUrl && imageUrl.startsWith('/static/')) {
        imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`;
      }
      return { id: p.id, title: p.name, desc: p.description, image: imageUrl };
    })
    : (!loading ? dummyProducts : []);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(productsData.length / itemsPerPage);

  const currentProducts = productsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ... (handlePageChange unchanged)

  return (
    <section id="products" className="section products-section" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container">
        <div className="section-header text-center">
          <h2 className="heading-md">OUR <span className="text-gradient">PRODUCTS & SAMPLES</span></h2>
          <p className="text-muted max-w-2xl mx-auto">
            Explore our portfolio of top-quality CNC laser cutting and fabrication samples. Click on any product for more details.
          </p>
        </div>

        <div className="products-grid-container" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          {loading ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="loader"></div>
            </div>
          ) : (
            <div className="products-grid grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {currentProducts.map((product, index) => (
                <Link href={`/products/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="product-card glass-panel"
                    style={{ overflow: 'hidden', borderRadius: '1rem', height: '100%', cursor: 'pointer' }}
                  >
                    <div className="product-image-container" style={{ position: 'relative', paddingTop: '75%' }}>
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="product-info" style={{ padding: '1.25rem' }}>
                      <h3 className="product-title" style={{ fontSize: '1.25rem', marginBottom: '0.25rem', fontWeight: 'bold' }}>{product.title}</h3>
                      <p className="product-desc text-muted" style={{ fontSize: '0.95rem', margin: 0, display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {product.desc}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <style jsx>{`
          .loader {
            width: 48px;
            height: 48px;
            border: 5px solid rgba(234, 88, 12, 0.1);
            border-bottom-color: var(--copper);
            border-radius: 50%;
            display: inline-block;
            animation: rotation 1s linear infinite;
          }
          @keyframes rotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '3rem', gap: '1rem' }}>
            {currentPage > 1 && (
              <button
                className="btn btn-outline"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
            )}

            <div className="page-numbers" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                  style={{ padding: '0.5rem 1rem' }}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {currentPage < totalPages && (
              <button
                className="btn btn-outline"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
