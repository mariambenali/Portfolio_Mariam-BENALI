"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Deterministic data defined at module level
const NODES = [
  { cx: 210, cy: 50 },  { cx: 340, cy: 90 },  { cx: 80, cy: 90 },
  { cx: 380, cy: 170 }, { cx: 40, cy: 170 },  { cx: 210, cy: 160 },
  { cx: 310, cy: 230 }, { cx: 110, cy: 230 }, { cx: 210, cy: 270 },
  { cx: 270, cy: 105 }, { cx: 150, cy: 105 }, { cx: 270, cy: 215 }, { cx: 150, cy: 215 },
];

const EDGES = [
  [0, 10], [0, 9], [1, 9], [1, 3], [3, 5], [3, 6],
  [2, 10], [2, 4], [4, 5], [4, 7], [5, 6], [5, 7],
  [6, 8], [7, 8], [9, 5], [10, 5], [0, 5], [8, 5],
];

const EDGE_LENGTHS = [95, 110, 85, 130, 100, 75, 115, 90, 105, 80, 125, 88, 102, 78, 118, 92, 107, 83];
const PULSE_DUR = [1.8, 2.1, 1.5, 2.4, 1.9, 1.6, 2.2, 1.7, 2.0, 1.4, 2.3, 1.8, 1.6, 2.1, 1.9, 1.5];

const FLOAT_PARTICLES = [
  { x: 12, delay: 0, color: '#38BDF8' },
  { x: 28, delay: 0.7, color: '#a855f7' },
  { x: 48, delay: 1.3, color: '#38BDF8' },
  { x: 63, delay: 0.4, color: '#a855f7' },
  { x: 78, delay: 1.0, color: '#38BDF8' },
  { x: 91, delay: 0.2, color: '#a855f7' },
];

export default function LoadingScreen() {
  const [count, setCount] = useState(4);
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState({ l1: '', l2: '', l3: '' });

  // Countdown logic
  useEffect(() => {
    if (count <= 0) return;
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  // Progress bar logic
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(iv);
          return 100;
        }
        return p + (p < 70 ? 1.8 : p < 90 ? 1.1 : 0.7);
      });
    }, 36);
    return () => clearInterval(iv);
  }, []);

  // Typing logic
  useEffect(() => {
    const L1 = '> Initializing AI Systems...';
    const L2 = '> Loading Neural Interface...';
    const L3 = '> Ready.';
    let i1 = 0, i2 = 0;

    const t1 = setInterval(() => {
      i1++;
      setLines(l => ({ ...l, l1: L1.slice(0, i1) }));
      if (i1 >= L1.length) clearInterval(t1);
    }, 35);

    const t2 = setTimeout(() => {
      const iv = setInterval(() => {
        i2++;
        setLines(l => ({ ...l, l2: L2.slice(0, i2) }));
        if (i2 >= L2.length) clearInterval(iv);
      }, 35);
    }, 1400);

    const t3 = setTimeout(() => {
      setLines(l => ({ ...l, l3: L3 }));
    }, 3000);

    return () => {
      clearInterval(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000008',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundImage: `
          linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px'
      }}
    >
      {/* Background radial vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, transparent 25%, #000008 75%)',
          pointerEvents: 'none'
        }}
      />

      {/* Floating Particles */}
      {FLOAT_PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            left: `${p.x}%`,
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            animation: `floatUp 6s ease-in infinite`,
            animationDelay: `${p.delay}s`,
            opacity: 0
          }}
        />
      ))}

      <style>{`
        @keyframes floatUp {
          from { transform: translateY(110vh); opacity: 0; }
          40% { opacity: 1; }
          to { transform: translateY(-10vh); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* ZONE 1: Neural Network SVG */}
      <div style={{ position: 'relative', width: '420px', height: '320px', zIndex: 10 }}>
        <svg width="420" height="320" viewBox="0 0 420 320" style={{ width: '100%', height: '100%' }}>
          <defs>
            <filter id="nodeglow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="nodeglowbright">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
          </defs>

          {/* Edges */}
          {EDGES.map(([a, b], i) => (
            <motion.line
              key={`edge-${i}`}
              x1={NODES[a].cx} y1={NODES[a].cy}
              x2={NODES[b].cx} y2={NODES[b].cy}
              stroke="rgba(56,189,248,0.3)"
              strokeWidth="1"
              strokeDasharray={EDGE_LENGTHS[i % EDGE_LENGTHS.length]}
              initial={{ strokeDashoffset: EDGE_LENGTHS[i % EDGE_LENGTHS.length] }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ delay: 0.4 + i * 0.06, duration: 0.6, ease: "easeOut" }}
            />
          ))}

          {/* Pulse dots on edges */}
          {EDGES.map(([a, b], i) => (
            <motion.circle
              key={`pulse-${i}`}
              r="2"
              fill="#a855f7"
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.05 }}
            >
              <animateMotion
                dur={`${PULSE_DUR[i % PULSE_DUR.length]}s`}
                repeatCount="indefinite"
                path={`M ${NODES[a].cx} ${NODES[a].cy} L ${NODES[b].cx} ${NODES[b].cy}`}
              />
            </motion.circle>
          ))}

          {/* Nodes */}
          {NODES.map((n, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={n.cx} cy={n.cy}
              r={i === 5 ? 7 : 4}
              fill="#38BDF8"
              filter="url(#nodeglow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.3, 1],
                opacity: 1,
                filter: i % 3 === 0
                  ? ["url(#nodeglow)", "url(#nodeglowbright)", "url(#nodeglow)"]
                  : "url(#nodeglow)"
              }}
              transition={{
                delay: i * 0.07,
                duration: 0.5,
                ease: "backOut",
                filter: { duration: 1.5 + (i % 4) * 0.4, repeat: Infinity }
              }}
            />
          ))}
        </svg>

        {/* Center Element overlaid on hub (node 5) */}
        <div
          style={{
            position: 'absolute',
            left: NODES[5].cx,
            top: NODES[5].cy,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20
          }}
        >
          {/* Outer ring */}
          <motion.div
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '1.5px solid rgba(56,189,248,0.4)'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          {/* Middle ring */}
          <motion.div
            style={{
              position: 'absolute',
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              borderTop: '2px solid #a855f7',
              borderRight: '0.5px solid transparent',
              borderBottom: '0.5px solid transparent',
              borderLeft: '0.5px solid transparent'
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          {/* Inner circle */}
          <motion.div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #0d1f3c, #000008)',
              border: '1.5px solid #38BDF8',
              boxShadow: '0 0 25px #38BDF8, 0 0 50px rgba(56,189,248,0.2), inset 0 0 15px rgba(56,189,248,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span
              style={{
                color: '#38BDF8',
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                letterSpacing: '0.15em'
              }}
            >
              MB
            </span>
          </motion.div>
        </div>
      </div>

      {/* ZONE 2: Center countdown */}
      <div style={{ marginTop: '2rem', height: '80px', zIndex: 10 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ y: 20, opacity: 0, scale: 1.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <span
              style={{
                fontSize: '3rem',
                fontWeight: 900,
                color: count > 0 ? '#38BDF8' : 'white',
                fontFamily: 'monospace'
              }}
            >
              {count > 0 ? `0${count}` : '✓'}
            </span>
            <p
              style={{
                color: '#475569',
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginTop: '0.3rem'
              }}
            >
              {count > 0 ? 'INITIALIZING' : 'READY'}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ZONE 3: Bottom text + progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '10vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
          padding: '0 2rem'
        }}
      >
        <div style={{ fontFamily: 'monospace', fontSize: '0.88rem', height: '70px' }}>
          <div style={{ color: '#38BDF8', height: '20px' }}>
            {lines.l1}
            {lines.l1 && !lines.l2 && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                ▋
              </motion.span>
            )}
          </div>
          <div style={{ color: '#a855f7', height: '20px', marginTop: '4px' }}>
            {lines.l2}
            {lines.l2 && !lines.l3 && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                ▋
              </motion.span>
            )}
          </div>
          <div style={{ color: 'white', fontWeight: 'bold', height: '20px', marginTop: '4px' }}>
            {lines.l3}
            {lines.l3 && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                ▋
              </motion.span>
            )}
          </div>
        </div>

        <div style={{ width: '52vw', marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
            <span style={{ color: '#475569', fontSize: '0.72rem', fontFamily: 'monospace' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(255,255,255,0.07)' }}>
            <motion.div
              style={{
                height: '100%',
                backgroundColor: '#38BDF8',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #38BDF8, #a855f7, #38BDF8)',
                backgroundSize: '200% 100%'
              }}
              animate={{ backgroundPosition: ['0%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
      </div>

      {/* EXIT FLASH */}
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'white',
          zIndex: 10000,
          pointerEvents: 'none'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 0.4, 0] }}
        transition={{ duration: 0.8, delay: 3.8, times: [0, 0.6, 0.7, 0.85, 1] }}
      />
    </div>
  );
}
