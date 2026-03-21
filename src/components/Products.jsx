"use client";
import React from 'react';
import { motion } from 'framer-motion';

const products = [
  {
    id: 1,
    title: 'Custom Metal Gears',
    category: 'Metal Laser Cutting',
    image: './laser_cut_metal_gear_1773484656911.png',
    desc: 'Precision engineered metallic parts for machinery and industrial applications.'
  },
  {
    id: 2,
    title: 'Acrylic Signages',
    category: 'Acrylic Job Work',
    image: './laser_cut_acrylic_sign_1773484675065.png',
    desc: 'Modern, glowing edge-lit signs perfect for brand aesthetics and storefronts.'
  },
  {
    id: 3,
    title: 'Decorative Wood Panels',
    category: 'Wood Engraving & Cutting',
    image: './laser_cut_wooden_panel_1773484771597.png',
    desc: 'Intricate geometric and mandala patterns for premium interior designs.'
  }
];

const Products = () => {
  return (
    <section id="products" className="section products-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="heading-md">OUR <span className="text-gradient">SERVICES & WORK</span></h2>
          <p className="text-muted max-w-2xl mx-auto">
            Explore our portfolio of top-quality CNC laser cutting jobs across various materials.
          </p>
        </div>

        <div className="products-grid grid-3">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="product-card glass-panel"
            >
              <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="product-category">{product.category}</div>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-desc text-muted">{product.desc}</p>
                <button className="btn btn-outline product-btn">View Details</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
