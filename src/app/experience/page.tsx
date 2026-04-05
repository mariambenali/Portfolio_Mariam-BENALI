"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./page.module.css";

// ─── Starfield Background ────────────────────────────────────────────────────
const SpaceBackground = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -350]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    setStars(Array.from({ length: 150 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2,
      yType: i % 3,
      color: Math.random() > 0.8 ? "#0ff" : Math.random() > 0.5 ? "#fff" : "#9d4edd",
    })));
  }, []);

  if (!stars.length) return null;

  return (
    <div className={styles.particleContainer}>
      <div className={styles.spaceGradient} />
      {stars.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "50%",
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            y: s.yType === 0 ? y1 : s.yType === 1 ? y2 : y3,
          }}
          animate={{ opacity: [s.opacity, s.opacity * 0.3, s.opacity] }}
          transition={{
            repeat: Infinity,
            duration: s.duration,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// ─── Marquee Line ─────────────────────────────────────────────────────────────
// Uses CSS @keyframes for GPU-accelerated, JS-free infinite scroll.
// Children are duplicated once: the track animates from 0 → -50% (= one copy width) seamlessly.
const MarqueeLine = ({
  children,
  speed,
}: {
  children: React.ReactNode;
  speed: number;
}) => (
  <div className={styles.marqueeTrack}>
    <div
      className={styles.marqueeInner}
      style={{ animationDuration: `${speed}s` }}
    >
      {/* Duplicate so -50% translation loops back to identical start */}
      <span className={styles.marqueeCopy}>{children}</span>
      <span className={styles.marqueeCopy}>{children}</span>
    </div>
  </div>
);

// ─── Experience Page ──────────────────────────────────────────────────────────
export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Raw transforms: scroll 0→45% drives the shrink
  const rawWidth = useTransform(scrollYProgress, [0, 0.45], ["100vw", "60vw"]);
  const rawRadius = useTransform(scrollYProgress, [0, 0.45], ["0px", "12px"]);
  const rawScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.9]);

  // Springs wrap the transforms for buttery smoothness
  const imageWidth = useSpring(rawWidth, { stiffness: 80, damping: 25, restDelta: 0.001 });
  const imageRadius = useSpring(rawRadius, { stiffness: 80, damping: 25, restDelta: 0.001 });
  const imageScale = useSpring(rawScale, { stiffness: 80, damping: 25, restDelta: 0.001 });

  return (
    <main className={styles.main} ref={containerRef}>
      <SpaceBackground />

      {/* ── Scroll hero section — 250vh gives scroll room for the transition ── */}
      <div className={styles.heroSection}>

        {/* ── Sticky viewport — locked in place while page scrolls beneath ── */}
        <div className={styles.stickyContainer}>

          {/* ── Portrait — starts fullscreen, shrinks to centered card ── */}
          <motion.div
            className={styles.imageWrapper}
            style={{
              width: imageWidth,
              borderRadius: imageRadius,
              scale: imageScale,
            }}
          >
            <img
              src="/portrait.png"
              alt="Miriam Benali"
              className={styles.portraitImg}
            />
            {/* Gradient at bottom blends portrait into dark background */}
            <div className={styles.imageFade} aria-hidden="true" />
          </motion.div>

          {/* ── Name + Marquees — always visible, edge-to-edge, over the portrait ── */}
          <div className={styles.bottomOverlay} aria-hidden="true">
            <h1 className={styles.heroName}>MIRIAM BENALI</h1>

            <div className={styles.marqueeContainer}>
              {/* Line 1 — sky blue, uppercase, bold, faster */}
              <MarqueeLine speed={22}>
                <span className={styles.ticker1}>
                  AI DEVELOPER&nbsp;&nbsp;|&nbsp;&nbsp;FULLSTACK DEVELOPER&nbsp;&nbsp;|&nbsp;&nbsp;MLOPS&nbsp;&nbsp;|&nbsp;&nbsp;COMPUTER VISION ENTHUSIAST&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </MarqueeLine>

              {/* Line 2 — white with blue bold keywords, slower */}
              <MarqueeLine speed={38}>
                <span className={styles.ticker2}>
                  obsessed with turning data into intelligent systems — I build&nbsp;
                  <strong className={styles.highlight}>LLMs</strong>,&nbsp;
                  <strong className={styles.highlight}>RAG pipelines</strong>, and&nbsp;
                  <strong className={styles.highlight}>real-time ML infrastructure</strong>
                  &nbsp;that scale&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </MarqueeLine>
            </div>
          </div>

        </div>
      </div>

      {/* ── Content below the hero scroll ── */}
      <section className={styles.contentSection}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>
        <motion.p
          className={styles.sectionText}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true }}
        >
          Software engineer specializing in AI-driven systems, fullstack
          architecture, and production-ready ML infrastructure that scales.
        </motion.p>
      </section>
    </main>
  );
}
