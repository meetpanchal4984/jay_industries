"use client";
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section section-darker about-section">
      <div className="container about-container">
        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-image"
          >
            <div className="stats-box">
              <span className="stats-num">10+</span>
              <span className="stats-text text-muted">Years Experience</span>
            </div>
            <img src="./laser_cut_acrylic_sign_1773484675065.png" alt="Laser Cutting Acrylic Sign" className="responsive-img" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-content"
          >
            <h2 className="heading-md">ABOUT <span className="text-gradient">JAY INDUSTRIES</span></h2>
            <p className="text-lg text-muted about-desc">
              We are a premier provider of laser cutting services, specializing in CNC laser cutting machine job work.
              Based in Ahmedabad, Gujarat, we pride ourselves on delivering intricate, precise, and high-quality
              cutouts tailored to client specifications.
            </p>

            <ul className="about-features">
              <li>
                <div className="feature-icon">✨</div>
                <div>
                  <h4 className="feature-title">High Precision</h4>
                  <p className="text-muted feature-text">State-of-the-art CNC technology ensuring micron-level accuracy.</p>
                </div>
              </li>
              <li>
                <div className="feature-icon">⚡</div>
                <div>
                  <h4 className="feature-title">Fast Turnaround</h4>
                  <p className="text-muted feature-text">Efficient project completion without compromising on quality.</p>
                </div>
              </li>
              <li>
                <div className="feature-icon">🛠️</div>
                <div>
                  <h4 className="feature-title">Versatile Materials</h4>
                  <p className="text-muted feature-text">Expertise in cutting metal, acrylic, wood, and more.</p>
                </div>
              </li>
            </ul>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
