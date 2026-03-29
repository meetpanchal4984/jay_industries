"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

const LaserBeam = () => {
  return (
    <mesh position={[0, -1, 0]}>
      <cylinderGeometry args={[0.02, 0.02, 10, 32]} />
      <meshBasicMaterial color="#ff3c3c" />
    </mesh>
  );
};

const AnimatedShape = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1, 0.3, 128, 64]} />
          <MeshDistortMaterial
            color="#c48c59"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.2}
            speed={2}
          />
        </mesh>
      </Float>
    </group>
  );
};

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-background" style={{ backgroundImage: "url('./industrial_laser_background_1773484815633.png')" }}>
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-container">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text-content"
        >
          <span className="subtitle text-gradient">PRECISION ENGINEERED</span>
          <h1 className="heading-xl">
            LASER CUTTING <br />
            <span className="laser-glow text-laser">EXCELLENCE</span>
          </h1>
          <p className="hero-desc text-lg text-muted">
            Jay Industries provides top-tier CNC laser cutting service and job work in Ahmedabad.
            From metal components to complex designs, we deliver absolute precision.
          </p>
          <div className="hero-actions">
            <Link href="/services" className="btn btn-primary">Our Services</Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-canvas-wrapper"
        >
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="var(--neon-blue)" />
            <directionalLight position={[-10, -10, -5]} intensity={1} color="#ff3c3c" />
            <AnimatedShape />
            <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color="#ff3c3c" />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
