"use client";
import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    title: 'Laser Cutting',
    icon: '✂️',
    desc: 'High-precision CNC laser cutting for various metals and industrial materials with perfect edge finishing.'
  },
  {
    id: 2,
    title: 'Metal Bending',
    icon: '🏗️',
    desc: 'Professional CNC press brake bending services for accurate angles and complex metal formations.'
  },
  {
    id: 3,
    title: 'Press Machine Work',
    icon: '⚙️',
    desc: 'Heavy-duty mechanical and hydraulic press operations for stamping, punching, and forming.'
  },
  {
    id: 4,
    title: 'Welding & Assembly',
    icon: '👨‍🏭',
    desc: 'Professional TIG, MIG, and spot welding services for complete metal structure assemblies.'
  },
  {
    id: 5,
    title: 'Custom Fabrication',
    icon: '🛠️',
    desc: 'End-to-end custom metal fabrication and job work tailored precisely to your design requirements.'
  },
  {
    id: 6,
    title: 'Playground Equipment',
    icon: '🪜',
    desc: 'High-quality, durable metal steps, industrial ladders, and safety staircases designed for longevity.'
  }
];

const Services = () => {
  return (
    <section id="services" className="section services-section" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container">
        <div className="section-header text-center">
          <h2 className="heading-md">OUR <span className="text-gradient">CORE SERVICES</span></h2>
          <p className="text-muted max-w-2xl mx-auto">
            We provide top-tier industrial manufacturing services using state-of-the-art machinery and highly skilled technicians.
          </p>
        </div>

        <div className="services-grid grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="service-card glass-panel"
              style={{ padding: '2rem', textAlign: 'center', borderRadius: '1rem' }}
            >
              <div className="service-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {service.icon}
              </div>
              <h3 className="service-title" style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>{service.title}</h3>
              <p className="service-desc text-muted">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
