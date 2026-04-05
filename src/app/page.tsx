"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, Variants, useScroll, useTransform, useMotionTemplate, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Code, Database, Server, Rocket, Cpu, Terminal, Layout, Cloud, TrendingUp, PhoneCall, HeartHandshake, Mail, ExternalLink, Send } from 'lucide-react';
import styles from './page.module.css';
import Hero from '../components/Hero';
import LoadingScreen from '../components/LoadingScreen';

const WHATSAPP_PHONE = "+212661147321";

// ─── Constants for Hydration Safety ──────────────────────────────────────────
const PARTICLE_COLORS = ['#38BDF8', '#a855f7', '#38BDF8', '#a855f7', '#38BDF8'];
const PULSE_DUR = [1.8, 2.1, 1.5, 2.4, 1.9, 1.6, 2.2, 1.7, 2.0, 1.4, 2.3, 1.8, 1.6, 2.1, 1.9, 1.5, 2.0, 1.7, 2.3, 1.4, 1.8, 2.2];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const links = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '2.5rem',
        zIndex: 1000,
        display: 'flex',
        gap: '0.2rem',
        alignItems: 'center',
        background: scrolled ? 'rgba(5,8,22,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        border: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        borderRadius: '99px',
        padding: scrolled ? '0.4rem 1rem' : '0',
        transition: 'all 0.4s ease',
      }}
    >
      {links.map((link) => (
        <motion.a
          key={link}
          href={`#${link.toLowerCase()}`}
          whileHover={{ color: '#38BDF8' }}
          style={{
            position: 'relative',
            color: activeSection === link.toLowerCase() ? '#38BDF8' : 'rgba(255,255,255,0.55)',
            fontSize: '0.78rem',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '0.4rem 0.75rem',
            borderRadius: '99px',
            transition: 'color 0.25s ease',
            fontFamily: 'monospace',
          }}
        >
          {link}
          {activeSection === link.toLowerCase() && (
            <motion.span
              layoutId="navDot"
              style={{
                position: 'absolute',
                bottom: '-2px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#38BDF8',
                boxShadow: '0 0 6px #38BDF8',
              }}
            />
          )}
        </motion.a>
      ))}
    </motion.nav>
  );
};


const TickerBar = () => {
  const text = "AI DEVELOPER  |  FULLSTACK DEVELOPER  |  MLOPS  |  COMPUTER VISION ENTHUSIAST";
  const repeated = Array(8).fill(text); // repeat 8x for seamless loop

  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.tickerTrack}>
        {repeated.map((t, i) => (
          <span key={i} className={styles.tickerItem}>
            {t}
            <span className={styles.tickerDot}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Inline SVGs ─────────────────────────────────────────────────────────────

const GitHubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5a5.403 5.403 0 0 0-1 3.5c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const LinkedInIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

// ─── Starfield ────────────────────────────────────────────────────────────────

const NETWORK_NODES = [
  // Left cluster
  { cx: 8, cy: 15 }, { cx: 15, cy: 35 }, { cx: 5, cy: 55 },
  { cx: 22, cy: 70 }, { cx: 12, cy: 85 },
  // Right cluster
  { cx: 85, cy: 10 }, { cx: 92, cy: 28 }, { cx: 78, cy: 45 },
  { cx: 88, cy: 62 }, { cx: 95, cy: 80 },
  // Top scattered
  { cx: 35, cy: 8 }, { cx: 55, cy: 5 }, { cx: 72, cy: 12 },
  // Bottom scattered
  { cx: 30, cy: 90 }, { cx: 50, cy: 95 }, { cx: 68, cy: 88 },
  // Mid-left
  { cx: 25, cy: 48 }, { cx: 18, cy: 62 },
  // Mid-right
  { cx: 75, cy: 55 }, { cx: 82, cy: 38 },
];

const NETWORK_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 10], [1, 16], [2, 17], [3, 13],
  [5, 6], [6, 7], [7, 8], [8, 9], [5, 12], [6, 19], [7, 18], [8, 14],
  [10, 11], [11, 12], [11, 18], [12, 19], [13, 14], [14, 15],
  [16, 17], [17, 3], [18, 8], [19, 6], [0, 16], [4, 13], [9, 15],
];

const NODE_PULSE_DUR = [3, 4, 2.5, 3.5, 4, 2.8, 3.2, 4.5, 3, 2.6, 3.8, 4, 2.4, 3.6, 4.2, 2.8, 3, 3.4, 4, 2.6];
const EDGE_PULSE_DUR = [2, 2.5, 1.8, 2.2, 2.8, 2, 2.4, 1.6, 2.6, 2.2, 1.8, 2.4, 2, 2.8, 2.2, 1.6, 2.4, 2, 2.6, 1.8, 2.2, 2, 2.4, 2.8];

const NeuralBackground = () => {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="bgGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#050816" />
          <stop offset="100%" stopColor="#020510" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="100" height="100" fill="url(#bgGrad)" />

      {/* Edges */}
      {NETWORK_EDGES.map(([a, b], i) => (
        <motion.line
          key={`edge-${i}`}
          x1={NETWORK_NODES[a].cx} y1={NETWORK_NODES[a].cy}
          x2={NETWORK_NODES[b].cx} y2={NETWORK_NODES[b].cy}
          stroke="rgba(56,189,248,0.18)"
          strokeWidth="0.15"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.08, 0.25, 0.08] }}
          transition={{
            duration: EDGE_PULSE_DUR[i % EDGE_PULSE_DUR.length],
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
        />
      ))}

      {/* Nodes */}
      {NETWORK_NODES.map((n, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={n.cx} cy={n.cy}
          r={i % 5 === 0 ? 0.7 : 0.4}
          fill="#38BDF8"
          filter="url(#nodeGlow)"
          animate={{
            opacity: [0.3, 0.9, 0.3],
            r: [i % 5 === 0 ? 0.7 : 0.4, i % 5 === 0 ? 1 : 0.65, i % 5 === 0 ? 0.7 : 0.4],
          }}
          transition={{
            duration: NODE_PULSE_DUR[i % NODE_PULSE_DUR.length],
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
        />
      ))}
    </svg>
  );
};

const FloatingCode = () => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
    style={{
      position: 'absolute',
      left: '4%',
      top: '30%',
      transform: 'translateY(-50%)',
      zIndex: 3,
      pointerEvents: 'none',
    }}
  >
    <motion.div
      animate={{
        y: [0, -18, 0],
        rotate: [0, 0.4, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatType: 'mirror',
      }}
    >
      <pre style={{
        fontFamily: "'Fira Code', 'Courier New', monospace",
        fontSize: 'clamp(0.7rem, 1.2vw, 0.95rem)',
        lineHeight: 2,
        margin: 0,
        background: 'none',
        border: 'none',
        padding: 0,
        userSelect: 'none',
      }}>
        <span style={{ color: '#569cd6' }}>def </span>
        <span style={{ color: '#dcdcaa' }}>trouver_chemin</span>
        <span style={{ color: '#ffffff' }}>():</span>
        {'\n'}
        {'    '}
        <span style={{ color: '#9cdcfe' }}>pourquoi</span>
        <span style={{ color: '#ffffff' }}> = </span>
        <span style={{ color: '#ce9178' }}>"sens"</span>
        {'\n\n'}
        {'    '}
        <span style={{ color: '#c586c0' }}>if </span>
        <span style={{ color: '#9cdcfe' }}>pourquoi</span>
        <span style={{ color: '#ffffff' }}>:</span>
        {'\n'}
        {'        '}
        <span style={{ color: '#9cdcfe' }}>comment</span>
        <span style={{ color: '#ffffff' }}> = </span>
        <span style={{ color: '#ce9178' }}>"chemin vers la lumière"</span>
        {'\n'}
        {'        '}
        <span style={{ color: '#c586c0' }}>return </span>
        <span style={{ color: '#9cdcfe' }}>comment</span>
        {'\n'}
        {'    '}
        <span style={{ color: '#c586c0' }}>else</span>
        <span style={{ color: '#ffffff' }}>:</span>
        {'\n'}
        {'        '}
        <span style={{ color: '#c586c0' }}>return </span>
        <span style={{ color: '#ce9178' }}>"perdu"</span>
        {'\n\n'}
        <span style={{ color: '#dcdcaa' }}>print</span>
        <span style={{ color: '#ffffff' }}>(</span>
        <span style={{ color: '#dcdcaa' }}>trouver_chemin</span>
        <span style={{ color: '#ffffff' }}>())</span>
      </pre>

      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ color: '#38BDF8', fontFamily: 'monospace' }}
      >
        ▌
      </motion.span>
    </motion.div>
  </motion.div>
);

const FloatingQuote = () => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 1.2, duration: 1.2, ease: 'easeOut' }}
    style={{
      position: 'absolute',
      right: '3%',
      top: '38%',
      transform: 'translateY(-50%)',
      zIndex: 3,
      maxWidth: '26%',
      pointerEvents: 'none',
    }}
  >
    <motion.div
      animate={{
        y: [0, -12, 0],
        rotate: [0, -0.3, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatType: 'mirror',
        delay: 1,
      }}
    >
      <span style={{
        color: 'rgba(56,189,248,0.3)',
        fontSize: '3rem',
        lineHeight: 0,
        display: 'block',
        marginBottom: '0.5rem',
        fontFamily: 'Georgia, serif',
      }}>
        "
      </span>
      <p style={{
        color: 'rgba(255,255,255,0.82)',
        fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
        fontStyle: 'italic',
        fontWeight: 300,
        lineHeight: 1.75,
        margin: '0 0 1rem',
        fontFamily: 'Georgia, "Times New Roman", serif',
        textShadow: '0 2px 20px rgba(0,0,0,0.8)',
        letterSpacing: '0.01em',
      }}>
        J'ai d'abord interrogé le Pourquoi avant de tracer
        le Comment, car nul chemin ne mène à la lumière
        s'il n'est guidé par le sens."
      </p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{
          color: '#38BDF8',
          fontSize: '0.8rem',
          fontStyle: 'italic',
          fontWeight: 500,
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.08em',
          margin: 0,
          paddingLeft: '0.5rem',
          borderLeft: '2px solid rgba(56,189,248,0.4)',
        }}
      >
        — Miriam Benali
      </motion.p>
    </motion.div>
  </motion.div>
);

// ─── About — inner card starfield ────────────────────────────────────────────

const CardStars = () => {
  const [dots, setDots] = useState<any[]>([]);

  useEffect(() => {
    setDots(Array.from({ length: 28 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 1.6 + 0.4,
      opacity: Math.random() * 0.35 + 0.08,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    })));
  }, []);

  if (!dots.length) return null;

  return (
    <div className={styles.cardStars} aria-hidden>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            backgroundColor: '#fff',
            opacity: d.opacity,
            display: 'block',
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: d.duration, delay: d.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

// ─── About — 3D tilt card ─────────────────────────────────────────────────────

const AboutCard = ({ fadeInUp }: { fadeInUp: Variants }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const TILT = { stiffness: 200, damping: 30 } as const;
  const sRotX = useSpring(rotateX, TILT);
  const sRotY = useSpring(rotateY, TILT);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div
      className={styles.aboutCard}
      style={{ rotateX: sRotX, rotateY: sRotY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <CardStars />

      <div className={styles.cardGrid}>
        <div className={styles.cardLeft}>
          <div className={styles.cardSeparator}>
            <span className={styles.separatorLine} />
            <div className={styles.cardDescBlock}>
              <p className={styles.cardDescTitle}>
                AI Engineer &amp; Fullstack Developer | Building Intelligent &amp; Scalable Solutions
              </p>
              <p className={styles.cardDescBody}>
                Currently AI Engineer &amp; Fullstack Developer, I design and develop intelligent
                solutions that combine artificial intelligence with modern web applications.
                My goal is to transform complex ideas into high-performing, practical, and
                scalable products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Projets — 3D Carousel components ────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "Facial Detection Emotion",
    description: "Ce projet utilise Deep Learning pour détecter les visages dans des images et prédire les émotions associées. Il combine OpenCV, TensorFlow/Keras, et FastAPI pour créer une API capable de traiter des images en temps réel.",
    tags: ["Python", "TensorFlow", "OpenCV", "FastAPI", "CNN"],
    image: "/emotion.png",
    github: "https://github.com/mariambenali/Facial-Detection_DeepLearning",
    angle: 0
  },
  {
    id: 2,
    title: "HR-Pulse",
    subtitle: "Automated Job Offer Analysis Platform",
    description: "A full-stack AI-powered platform that automates the analysis of job offers, extracts key skills using NER, predicts salary ranges, and exposes everything through a modern API — fully containerized and observable.",
    tags: ["Python", "FastAPI", "NER", "Hugging Face", "Docker", "PostgreSQL", "MLflow"],
    image: "/hr.png",
    github: "https://github.com/mariambenali/HR-pulse-ai-platform",
    angle: 60
  },
  {
    id: 3,
    title: "RetentionAI",
    subtitle: "Smart HR Assistant for Predicting Employee Turnover",
    description: "RetentionAI is a full-stack HR analytics platform combining supervised machine learning and generative AI. It exposes a secure JWT-based API, uses PostgreSQL for data persistence, and is containerized with Docker to deliver an explainable, scalable, and production-ready solutio",
    tags: ["Python", "Docker", "JWT", "Matplotlib", "Supervised Machine Learning", "FastAPI", "Scikit-learn", "Prompt Engineering", "Generative AI"],
    image: "/retention.png",
    github: "https://github.com/mariambenali/RetentionAI-Smart-HR-Assistant-for-Predicting-Employee-Turnover",
    angle: 120
  },
  {
    id: 4,
    title: "Quant-AI_pr-diction_prix_Bitcoin",
    subtitle: "End-to-End ML Deployment Platform",
    description: "The project aims to create an end-to-end platform that collects Binance data, calculates technical indicators, trains a Machine Learning model to predict the price of Bitcoin over the next 10 minutes, and exposes the results via a REST API",
    tags: ["Docker", "Data Science", "Machine Learning", "Airflow", "JWT", "PySpark", "Data Engineering", "Regression Models", "MLflow", "FastAPI"],
    image: "bitcoin.png",
    github: "https://github.com/mariambenali/Quant-AI_pr-diction_prix_Bitcoin",
    angle: 180
  },
  {
    id: 5,
    title: "RAG-AI_Assistant",
    subtitle: "AI Assistant using RAG for support IT",
    description: "An internal intelligent assistant capable of reliably answering IT technicians’ questions based on an IT support PDF (procedures, incidents, FAQs)",
    tags: ["postgres", "machine-learning", "jwt", "jupyter", "docker-compose", "postgresql", "ci-cd", "python3", "rag", "mlflow", "fastapi", "huggingface", "langchain"],
    image: "rag.png",
    github: "https://github.com/mariambenali/AI-Assistant-using-RAG-LangChain-for-support-IT",
    angle: 240
  },
  {
    id: 6,
    title: "NLP-Classification_Support_Tickets",
    subtitle: "NLP-based classification of support tickets",
    description: "End-to-end NLP batch pipeline for IT support ticket classification, covering data exploration, text preprocessing",
    tags: ["python", "nlp", "kubernetes", "machine-learning", "grafana", "prometheus", "mlops", "github-actions", "huggingface", "evidently", "chromadb"],
    image: "nlp.png",
    github: "https://github.com/mariambenali/NLP-Classification_Support_Tickets",
    angle: 300
  }
];

const CARD_ANGLES = [0, 60, 120, 180, 240, 300];

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '360px',
        transformStyle: 'preserve-3d',
        transform: `rotateY(${CARD_ANGLES[index]}deg) translateZ(600px)`,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      <div className={styles.projectCard}>
        <div className={styles.cardImageWrapper}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className={styles.cardImage}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.removeAttribute('style');
              }}
            />
          ) : null}

          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '0.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 12px #38BDF8)' }}>🧠</div>
            <span style={{
              color: '#38BDF8',
              fontSize: '0.78rem',
              fontFamily: 'monospace',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              opacity: 0.8,
            }}>
              HR · NER · API · ML
            </span>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #38BDF8, transparent)',
            }} className={styles.scanLineAnim} />
          </div>
        </div>

        <div
          className={styles.cardContent}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <motion.div
              className={styles.hoverOverlay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => window.open(project.github, '_blank')}
            >
              <div className={styles.githubCircle}>
                <img src="/github.png" alt="GitHub" className={styles.githubLogo} />
              </div>
              <span className={styles.viewCodeText}>View the code</span>
            </motion.div>
          )}

          <h3 className={styles.projectTitle}>{project.title}</h3>

          {project.subtitle && (
            <p style={{
              color: '#38BDF8',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              margin: '0 0 0.6rem',
              fontStyle: 'italic',
            }}>
              {project.subtitle}
            </p>
          )}

          <p className={styles.projectDesc}>{project.description}</p>
          <div className={styles.projectTech}>
            {project.tags.map((tag: string) => (
              <span key={tag} className={styles.techTag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCarousel = ({ carouselRef }: { carouselRef: React.RefObject<HTMLElement | null> }) => {
  const rotationValue = useMotionValue(0);
  const springRotation = useSpring(rotationValue, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let isAnimating = false;

    const handleWheel = (e: WheelEvent) => {
      // Extremely low thresholds ignored
      if (Math.abs(e.deltaY) < 3) return;

      const isScrollingDown = e.deltaY > 0;
      const currentRot = rotationValue.get();

      const minRotation = (projects.length - 1) * -60;
      const maxRotation = 0;

      // ONLY allow scroll escape if we are entirely finished animating
      if (!isAnimating) {
        if (isScrollingDown && currentRot <= minRotation) return;
        if (!isScrollingDown && currentRot >= maxRotation) return;
      }

      // Inside carousel limit - intercept standard scroll rigidly
      e.preventDefault();
      e.stopPropagation();

      if (!isAnimating) {
        isAnimating = true;
        const delta = isScrollingDown ? 1 : -1;
        rotationValue.set(currentRot - delta * 60);
        setTimeout(() => { isAnimating = false; }, 1200); // 1.2s strong trap lock
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [carouselRef, rotationValue]);

  return (
    <>
      <div style={{
        position: 'absolute', top: '5%',
        left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', zIndex: 10, whiteSpace: 'nowrap'
      }}>
        <h2 className={styles.sectionTitle}>
          My <span className={styles.titleGradient}>Projects</span>
        </h2>
        <div className={styles.projectsUnderline} style={{ margin: '0 auto' }} />
      </div>

      <div style={{
        position: 'absolute', top: '13%', left: '50%',
        transform: 'translateX(-50%)', zIndex: 10, whiteSpace: 'nowrap',
        background: 'rgba(0,0,0,0.6)', borderRadius: '99px',
        padding: '0.4rem 1.2rem', color: 'rgba(255,255,255,0.65)',
        fontSize: '0.78rem', border: '1px solid rgba(255,255,255,0.1)'
      }}>
        Scroll/Wheel to rotate the 3D Carousel
      </div>

      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        perspective: '1400px', perspectiveOrigin: '50% 50%',
        width: '100%', height: '600px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <motion.div style={{
          position: 'relative',
          width: '360px', height: '500px',
          transformStyle: 'preserve-3d',
          rotateY: springRotation,
          z: -600, // Important shift backwards so the active front-card is flush
        }}>
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
};

// ─── Experience — VS Code Card component ──────────────────────────────────────

const experiences = [
  {
    title: "AI Engineer",
    from: "2025",
    to: "Present",
    company: "Simplon",
    type: "Certificate",
    side: "right",
    tab: "job-1.py"
  },
  {
    title: "Manager",
    from: "2024",
    to: "2025",
    company: "Business Family",
    type: "Personal",
    side: "left",
    tab: "job-2.py"
  },
  {
    title: "Telesales & Customer Service Agent",
    from: "Mars 2024",
    to: "Jul 2024",
    company: "Webhelp",
    type: "CDI",
    side: "right",
    tab: "job-3.py"
  },
  {
    title: "Webmarketer",
    from: "2022",
    to: "2023",
    company: "COMELIA",
    type: "CDI",
    side: "left",
    tab: "job-4.py"
  },
  {
    title: "Banking Customer Service",
    from: "2021",
    to: "2022",
    company: "Banque Populaire",
    type: "CDD",
    side: "right",
    tab: "job-5.py"
  },
];

const ExperienceCard = ({ exp, index }: { exp: any, index: number }) => {
  const isLeft = exp.side === 'left';
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const tiltY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  const sTiltX = useSpring(tiltX, { stiffness: 180, damping: 22 });
  const sTiltY = useSpring(tiltY, { stiffness: 180, damping: 22 });

  return (
    <motion.div
      className={`${styles.timelineCardWrapper} ${isLeft ? styles.timelineCardWrapperLeft : styles.timelineCardWrapperRight}`}
      initial={{ opacity: 0, x: isLeft ? -120 : 120, y: -60, rotate: isLeft ? -6 : 6, scale: 0.85 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: isLeft ? -2 : 2, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3
        }}
      >
        <motion.div
          style={{ rotateX: sTiltX, rotateY: sTiltY, transformPerspective: 900 }}
          className={styles.vscodeCard}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mouseX.set((e.clientX - r.left) / r.width - 0.5);
            mouseY.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onMouseLeave={() => {
            mouseX.set(0);
            mouseY.set(0);
          }}
        >
          <div className={styles.vscodeTopBar}>
            <div className={styles.vscodeDots}>
              <div className={`${styles.vscodeDot} ${styles.dotRed}`} />
              <div className={`${styles.vscodeDot} ${styles.dotYellow}`} />
              <div className={`${styles.vscodeDot} ${styles.dotGreen}`} />
            </div>
            <div className={styles.vscodeTabs}>
              <div className={`${styles.vscodeTab} ${styles.vscodeTabActive}`}>{exp.tab}</div>
              <div className={styles.vscodeTab}>terminal</div>
              <div className={styles.vscodeTab}>git</div>
            </div>
          </div>
          <div className={styles.vscodeBody}>
            <div className={styles.lineNumbers}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <span key={n}>{n}</span>)}
            </div>
            <div className={styles.codeArea}>
              <span className={styles.keyword}>job</span> <span className={styles.symbol}>=</span> <span className={styles.symbol}>{'{'}</span>
              <br />
              {'  '}<span className={styles.key}>"title"</span><span className={styles.symbol}>:</span> <span className={styles.stringValue}>"{exp.title}"</span><span className={styles.symbol}>,</span>
              <br />
              {'  '}<span className={styles.key}>"from"</span><span className={styles.symbol}>:</span> <span className={styles.stringValue}>"{exp.from}"</span><span className={styles.symbol}>,</span>
              <br />
              {'  '}<span className={styles.key}>"to"</span><span className={styles.symbol}>:</span> <span className={styles.stringValue}>"{exp.to}"</span><span className={styles.symbol}>,</span>
              <br />
              {'  '}<span className={styles.key}>"company"</span><span className={styles.symbol}>:</span> <span className={styles.stringValue}>"{exp.company}"</span><span className={styles.symbol}>,</span>
              <br />
              {'  '}<span className={styles.key}>"type"</span><span className={styles.symbol}>:</span> <span className={styles.stringValue}>"{exp.type}"</span><span className={styles.symbol}>,</span>
              <br />
              <span className={styles.symbol}>{'}'}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceParticles = () => {
  const [dots, setDots] = useState<{ left: string, top: string, color: string, delay: string }[]>([]);

  useEffect(() => {
    setDots(Array.from({ length: 5 }).map((_, i) => ({
      left: `calc(50% + ${(Math.random() - 0.5) * 40}px)`,
      top: `${Math.random() * 100}%`,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      delay: `${i * 0.8}s`
    })));
  }, []);

  if (!dots.length) return null;

  return (
    <>
      {dots.map((p, i) => (
        <div
          key={i}
          className={styles.particleTrail}
          style={{
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
            animationDelay: p.delay
          }}
        />
      ))}
    </>
  );
};


const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: !form.name.trim(),
      email: !form.email.trim(),
      message: !form.message.trim(),
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.message) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }

    const text = encodeURIComponent(
      `Nom: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, "_blank");
  };

  return (
    <motion.form
      className={styles.contactFormCard}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Your Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`${styles.contactInput} ${errors.name ? styles.inputError : ''}`}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Your Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={`${styles.contactInput} ${errors.email ? styles.inputError : ''}`}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Message</label>
        <textarea
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${styles.contactTextarea} ${errors.message ? styles.inputError : ''}`}
        />
      </div>
      <motion.button
        type="submit"
        className={styles.sendBtn}
        animate={shaking ? { x: [-8, 8, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        SEND MESSAGE
      </motion.button>
    </motion.form>
  );
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.footerGrid}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, staggerChildren: 0.1 }}
      >
        <div className={styles.brandCol}>
          <div className={styles.footerBrand}>
            <span>&lt;MB /&gt;</span>
          </div>
          <p className={styles.footerDesc}>
            AI Engineer &amp; Fullstack Developer building intelligent and scalable solutions.
          </p>
          <div className={styles.footerSocialRow}>
            {[
              { icon: <GitHubIcon size={20} />, link: "https://github.com/mariambenali" },
              { icon: <LinkedInIcon size={20} />, link: "https://www.linkedin.com/in/mariam-benali-6a8a5932/" },
              { icon: <Mail size={20} />, link: "mailto:miriam.bena@email.com" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                className={styles.footerSocialIcon}
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className={styles.footerNavCol}>
          <h4 className={styles.footerColTitle}>NAVIGATION</h4>
          <div className={styles.footerNavList}>
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={styles.footerNavLink}>
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.footerConnectCol}>
          <h4 className={styles.footerColTitle}>CONNECT</h4>
          <div className={styles.footerSocialRow}>
            {[
              { icon: <GitHubIcon size={20} />, link: "https://github.com/mariambenali" },
              { icon: <LinkedInIcon size={20} />, link: "https://www.linkedin.com/in/mariam-benali-6a8a5932/" },
              { icon: <Mail size={20} />, link: "mailto:miriam.bena@email.com" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                className={styles.footerSocialIcon}
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          <p className={styles.footerEmail}>miriam.bena@email.com</p>
        </div>
      </motion.div>

      <motion.div
        className={styles.footerBottom}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <span>© 2026 Mariam Benali. All rights reserved.</span>
        <span>Built with Next.js &amp; Framer Motion ❤️</span>
      </motion.div>
    </footer>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoading(true);
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setIsLoading(false);
      document.documentElement.style.overflow = '';
    }, 4500);
    return () => clearTimeout(t);
  }, []);

  const [activeTab, setActiveTab] = useState<'technical' | 'managerial'>('technical');
  const experienceRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: expScroll } = useScroll({
    target: mounted ? experienceRef : undefined,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(useTransform(expScroll, [0, 0.9], [0, 1]), {
    stiffness: 60,
    damping: 20
  });

  const { scrollYProgress } = useScroll({
    target: mounted ? heroRef : undefined,
    offset: ['start start', 'end start']
  });

  const SPRING = { stiffness: 88, damping: 27, restDelta: 0.001 } as const;
  const porScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.62]);
  const porY = useTransform(scrollYProgress, [0, 0.55], [0, -30]);
  const porOpacity = useTransform(scrollYProgress, [0.1, 0.55], [1, 0.78]);
  const blurRaw = useTransform(scrollYProgress, [0.15, 0.55], [0, 4]);

  const sPorScale = useSpring(porScale, SPRING);
  const sPorY = useSpring(porY, SPRING);
  const sPorOpacity = useSpring(porOpacity, SPRING);
  const sBlur = useSpring(blurRaw, SPRING);
  const blurFilter = useMotionTemplate`blur(${sBlur}px)`;

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <>
      <Navbar />

      {mounted && (
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loader"
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(18px)' }}
              transition={{ duration: 0.6, ease: [0.4, 0, 1, 1] }}
              style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
            >
              <LoadingScreen />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <motion.main
        className={styles.main}
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted && !isLoading ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* HERO SECTION */}
        <section id="home" ref={heroRef} className={`${styles.section} ${styles.hero}`}>
          {/* Layer 1 — Neural network */}
          <NeuralBackground />

          {/* Layer 2 — Dark overlay */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 50%, rgba(2,5,16,0.2) 0%, rgba(2,5,16,0.7) 100%)'
          }} />

          {/* Layer 3 — Floating code left */}
          <FloatingCode />

          {/* Layer 4 — Quote right */}
          <FloatingQuote />

          <motion.div
            className={styles.heroContent}
            style={{ zIndex: 10 }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeInUp} className={styles.title}>
              Miriam Benali
            </motion.h1>

            <motion.div
              className={styles.heroPortraitWrapper}
              style={{
                scale: sPorScale,
                y: sPorY,
                opacity: sPorOpacity,
                filter: blurFilter,
              }}
            >
              <Hero fadeInUp={fadeInUp} />
            </motion.div>
          </motion.div>

          <TickerBar />


        </section>

        {/* ABOUT SECTION */}
        <section className={styles.section} id="about">
          <div className={styles.aboutWrapper}>
            <motion.div
              className={styles.aboutTitleBlock}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h2 className={styles.aboutTitleText}>
                <span className={styles.titleWhite}>About Me &amp; </span>
                <span className={styles.titleGradient}>My Vision</span>
              </h2>
              <div className={styles.titleUnderline} />
            </motion.div>
            <AboutCard fadeInUp={fadeInUp} />
          </div>
        </section>

        <section
          id="projects"
          ref={carouselRef}
          className={styles.projectsSection}
          style={{ height: '100vh', overflow: 'hidden', padding: '0', position: 'relative' }}
        >
          <ProjectCarousel carouselRef={carouselRef} />
        </section>

        {/* SKILLS SECTION */}
        <section className={styles.section} id="skills">
          <div className={styles.skillsTitleBlock}>
            <h2 className={styles.skillsTitleText}>
              <span className={styles.titleWhite}>My </span>
              <span className={styles.titleGradient}>Skills</span>
            </h2>
            <div className={styles.skillsUnderline} />
          </div>

          <div className={styles.tabsContainer}>
            <button
              className={`${styles.tabButton} ${activeTab === 'technical' ? styles.tabActive : styles.tabInactive}`}
              onClick={() => setActiveTab('technical')}
            >
              Technical Skills
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'managerial' ? styles.tabActive : styles.tabInactive}`}
              onClick={() => setActiveTab('managerial')}
            >
              Managerial Skills
            </button>
          </div>

          <div className={styles.cardsWrapper}>
            <AnimatePresence mode="wait">
              {activeTab === 'technical' && (
                <motion.div
                  key="technical"
                  className={styles.techGrid}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 } },
                    exit: { opacity: 0, x: -20, transition: { duration: 0.4, ease: "easeOut" } }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  exit="exit"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {[
                    { title: "🐍 Programming", desc: "Solid foundations in scripted, queried, and dynamic programming across data, backend, and web contexts.", tags: ["Python", "SQL", "JavaScript"], icon: <Terminal size={32} color="#38BDF8" /> },
                    { title: "🧠 AI / Machine Learning", desc: "Building and deploying intelligent models — from image recognition to language understanding and retrieval-augmented generation.", tags: ["Computer Vision", "TensorFlow", "Keras", "LSTM", "CNN", "NLP", "LLM", "Hugging Face", "RAG", "Scikit-learn"], icon: <BrainCircuit size={32} color="#38BDF8" /> },
                    { title: "⚙️ Backend & APIs", desc: "Designing fast, secure, and scalable server-side logic and authenticated API pipelines.", tags: ["FastAPI", "Django", "REST APIs", "JWT"], icon: <Server size={32} color="#38BDF8" /> },
                    { title: "🗄️ Data & Databases", desc: "Structuring, querying, and transforming data for reliable analytical and production pipelines.", tags: ["PostgreSQL", "Azure SQL", "Pandas", "NumPy", "Data Processing"], icon: <Database size={32} color="#38BDF8" /> },
                    { title: "☁️ Cloud & MLOps", desc: "End-to-end ML lifecycle management — from containerized deployments to observability and automated pipelines.", tags: ["Docker", "Podman", "Terraform", "GitHub Actions", "CI/CD", "Azure", "Kubernetes", "MLflow", "Evidently", "OpenTelemetry", "Jaeger"], icon: <Cloud size={32} color="#38BDF8" /> },
                    { title: "🖥️ Frontend", desc: "Crafting modern, responsive, and data-driven interfaces for web and ML applications.", tags: ["Next.js", "TailwindCSS", "Streamlit", "HTML", "CSS"], icon: <Layout size={32} color="#38BDF8" /> }
                  ].map((item, idx) => (
                    <motion.div key={idx} className={styles.techCard} variants={fadeInUp} whileHover={{ y: -6, borderColor: '#00BFFF' }}>
                      <div className={styles.iconBlock}>{item.icon}</div>
                      <div className={styles.cardContentWrapper}>
                        <h3 className={styles.techCardTitle}>{item.title}</h3>
                        <p className={styles.techCardDesc}>{item.desc}</p>
                        <div className={styles.tagsContainer}>{item.tags.map(tag => <span key={tag} className={styles.tagPill}>{tag}</span>)}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'managerial' && (
                <motion.div
                  key="managerial"
                  className={styles.managerialList}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 } },
                    exit: { opacity: 0, x: -20, transition: { duration: 0.4, ease: "easeOut" } }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  exit="exit"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {[
                    { title: "📈 Web Marketing", desc: "Driving organic visibility through strategic keyword targeting, traffic analysis, and search engine optimization.", icon: <TrendingUp size={32} color="#38BDF8" /> },
                    { title: "📞 Commercial & Sales", desc: "Proven track record in remote sales, client acquisition, and communication-driven conversion.", icon: <PhoneCall size={32} color="#38BDF8" /> },
                    { title: "🏦 Banking Customer Service", desc: "Delivering high-quality support in regulated environments with precision, empathy, and compliance.", icon: <HeartHandshake size={32} color="#38BDF8" /> }
                  ].map((item, idx) => (
                    <motion.div key={idx} className={styles.managerialRow} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } } }} whileHover={{ x: 8 }}>
                      <div className={styles.managerialIconBlock}>{item.icon}</div>
                      <div className={styles.managerialContent}><h3 className={styles.managerialTitle}>{item.title}</h3><p className={styles.managerialDesc}>{item.desc}</p></div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section className={styles.experienceSection} id="experience" ref={experienceRef}>
          <ExperienceParticles />
          <div className={styles.experienceHeader}>
            <h2 className={styles.experienceTitle}>
              <span className={styles.titleWhite}>My </span>
              <span className={styles.experienceTitleGradient}>Experience</span>
            </h2>
            <p className={styles.experienceSubtitle}>The positions I have worked in my career so far</p>
            <div className={styles.experienceUnderline} />
          </div>
          <div className={styles.timelineContainer}>
            <div className={styles.timelineLineWrapper}>
              <motion.div className={styles.timelineLineBlur} style={{ scaleY }} />
              <motion.div className={styles.timelineLine} style={{ scaleY }} />
            </div>
            {experiences.map((exp, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <motion.div
                  className={styles.timelineDot}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    scale: { repeat: Infinity, duration: 2 },
                    opacity: { delay: idx * 0.12 + 0.2 },
                    initial: { delay: idx * 0.12 + 0.2 }
                  }}
                />
                <ExperienceCard exp={exp} index={idx} />
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className={styles.contactSection} id="contact">
          <div className={styles.contactHeader}>
            <h2 className={styles.contactTitle}>
              <span className={styles.titleWhite}>Let's Work</span>
              <span className={styles.experienceTitleGradient}> Together</span>
            </h2>
            <p className={styles.contactSubtitle}>Have a project in mind? Let's build something exceptional together.</p>
            <div className={styles.contactUnderline} />
          </div>
          <div className={styles.contactGrid}>
            <ContactForm />
            <motion.div
              className={styles.socialStack}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12 }
                }
              }}
            >
              {[
                { name: "LinkedIn", icon: <LinkedInIcon size={24} />, bg: "#0A66C2", link: "https://www.linkedin.com/in/mariam-benali-6a8a5932/" },
                { name: "GitHub", icon: <GitHubIcon size={24} />, bg: "#181717", link: "https://github.com/mariambenali" },
                { name: "Email", icon: <Mail size={24} color="#fff" />, bg: "#38BDF8", link: "mailto:miriam.bena@email.com" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  className={styles.socialBtn}
                  variants={{ hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={styles.socialIconBox} style={{ backgroundColor: social.bg }}>{social.icon}</div>
                  <span className={styles.socialLabelText}>{social.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        <Footer />
      </motion.main>
    </>
  );
}
