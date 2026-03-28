"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const dummyProducts = [
  { id: 1, title: 'Custom Metal Gears', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Precision metallic gear components.' },
  { id: 2, title: 'Acrylic Signages', category: 'Acrylic', image: './laser_cut_acrylic_sign_1773484675065.png', desc: 'Edge-lit brand aesthetic signs.' },
  { id: 3, title: 'Decorative Wood Panels', category: 'Wood', image: './laser_cut_wooden_panel_1773484771597.png', desc: 'Geometric interior wall patterns.' },
  { id: 4, title: 'Custom Nameplates', category: 'Acrylic', image: './laser_cut_acrylic_sign_1773484675065.png', desc: 'Bespoke entry name boards.' },
  { id: 5, title: 'Precision Machinery Parts', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Industrial machine components.' },
  { id: 6, title: 'Wooden Wall Clocks', category: 'Wood', image: './laser_cut_wooden_panel_1773484771597.png', desc: 'Laser-engraved wooden clocks.' },
  { id: 7, title: 'MDF Jali Designs', category: 'Wood', image: './laser_cut_wooden_panel_1773484771597.png', desc: 'MDF jali works for partitions.' },
  { id: 8, title: 'Stainless Steel Letters', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Outdoor SS branding letters.' },
  { id: 9, title: 'LED Acrylic Boards', category: 'Acrylic', image: './laser_cut_acrylic_sign_1773484675065.png', desc: 'Embedded LED display boards.' },
  { id: 10, title: 'Metal Stencils', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Stencils for scale painting.' },
  { id: 11, title: 'Wood Etched Photos', category: 'Wood', image: './laser_cut_wooden_panel_1773484771597.png', desc: 'Photorealistic wood etching.' },
  { id: 12, title: 'Mild Steel Grills', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Architectural steel grills.' },
  { id: 13, title: 'Corporate Trophies', category: 'Acrylic', image: './laser_cut_acrylic_sign_1773484675065.png', desc: 'Custom achievement awards.' },
  { id: 14, title: 'Safety Signs', category: 'Acrylic', image: './laser_cut_acrylic_sign_1773484675065.png', desc: 'High-visibility safety markers.' },
  { id: 15, title: 'Metal Enclosures', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Protective casing for electronics.' },
  { id: 16, title: 'Switchboard Panels', category: 'Acrylic', image: './laser_cut_acrylic_sign_1773484675065.png', desc: 'Laser-cut switchboard frames.' },
  { id: 17, title: 'Custom Keychains', category: 'Wood', image: './laser_cut_wooden_panel_1773484771597.png', desc: 'Bulk engraved wooden gifts.' },
  { id: 18, title: 'Lift Interiors', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Decorative elevator panelling.' },
  { id: 19, title: 'Room Dividers', category: 'Wood', image: './laser_cut_wooden_panel_1773484771597.png', desc: 'Intricate room division screens.' },
  { id: 20, title: 'Brass Letters', category: 'Metal', image: './laser_cut_metal_gear_1773484656911.png', desc: 'Premium solid brass text.' }
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
