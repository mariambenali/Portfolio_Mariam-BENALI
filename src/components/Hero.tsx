"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero({ fadeInUp }: { fadeInUp: Variants }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // We use refs instead of state for high-frequency updates preventing re-renders
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });

  // Smoothly animated target mask radius (growing when hovered)
  const targetSize = useRef(0);
  const currentSize = useRef(0);

  // Minimal state for toggling CSS class on the glowing rim
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track mouse coordinates directly on the container.
    // This allows parallax logic and the mask origins to align flawlessly.
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePos.current = { x, y };

      // Snap right to pointer on initial entry so it doesn't tween from exactly -1000px across the screen
      if (currentPos.current.x === -1000) {
        currentPos.current.x = x;
        currentPos.current.y = y;
      }
    };

    const handleMouseEnter = () => {
      targetSize.current = 220; // Maximum mask radius on hover
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      targetSize.current = 0;
      setIsHovered(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Smooth linear interpolation function for organic following
    const lerp = (start: number, end: number, amt: number) => {
      return (1 - amt) * start + amt * end;
    };

    // The core loop optimizing the parallax & mask updates outside the React tree
    const animate = () => {
      if (!container) return;

      // 1. Lerp cursor coordinates
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.1);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.1);

      // 2. Lerp mask size
      currentSize.current = lerp(currentSize.current, targetSize.current, 0.12);

      // Injecting cursor & size values natively directly bypassing render cycle
      container.style.setProperty('--x', `${currentPos.current.x}px`);
      container.style.setProperty('--y', `${currentPos.current.y}px`);
      container.style.setProperty('--size', `${currentSize.current}px`);

      // 3. Optional Parallax Translation 
      // Calculates how far the mouse is away from the container's center point
      const centerX = container.clientWidth / 2;
      const centerY = container.clientHeight / 2;

      // Multiply by a micro-decimal for subtle shifts
      const offsetX = (currentPos.current.x - centerX) * 0.015;
      const offsetY = (currentPos.current.y - centerY) * 0.015;

      container.style.setProperty('--lx', `${-offsetX}px`);
      container.style.setProperty('--ly', `${-offsetY}px`);

      rafRef.current = requestAnimationFrame(animate);
    };

    // Fire ignition sequence
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      // Clean up to prevent memleaks
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <motion.div
      variants={fadeInUp}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      className={styles.heroContainer}
      ref={containerRef}
    >
      <div className={styles.imageWrapper}>

        {/* PARALLAX LAYER 0: Procedural SVG noise/film grain for high-end aesthetic */}
        <div className={styles.noiseOverlay}></div>

        {/* PARALLAX LAYER 1: VRAI BASE PORTRAIT (Always visible base layer under mask) */}
        <div className={styles.baseLayer}>
          <img src="/portrait.png" alt="Miriam Normal Version" className={styles.portraitImg} />
        </div>

        {/* PARALLAX LAYER 2: METAMORPHOSIS REVEAL (CSS MASK bounds this strictly around the cursor) */}
        <div className={styles.revealLayer}>
          <img src="/robot.png" alt="Cyborg Metamorphosis Version" className={styles.cyborgImg} />
        </div>

        {/* SCANNED BORDERS: The cyan ring floating over the exact edge of the gradient scale */}
        <div className={`${styles.glowFollower} ${isHovered ? styles.showGlow : ''}`}></div>

      </div>
    </motion.div>
  );
}
