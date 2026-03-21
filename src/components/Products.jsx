"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const products = [
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
  const itemsPerPage = 9; // Display 9 items per page for a 3x3 grid
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const element = document.getElementById("products");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="products" className="section products-section" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container">
        <div className="section-header text-center">
          <h2 className="heading-md">OUR <span className="text-gradient">PRODUCTS & SAMPLES</span></h2>
          <p className="text-muted max-w-2xl mx-auto">
            Explore our portfolio of top-quality CNC laser cutting and fabrication samples.
          </p>
        </div>

        <div className="products-grid grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {currentProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="product-card glass-panel"
              style={{ overflow: 'hidden', borderRadius: '1rem' }}
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
                <p className="product-desc text-muted" style={{ fontSize: '0.95rem', margin: 0 }}>{product.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem', gap: '1rem' }}>
            {currentPage > 1 && (
              <button
                className="btn btn-outline"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
            )}

            <div className="page-numbers" style={{ display: 'flex', gap: '0.5rem' }}>
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
