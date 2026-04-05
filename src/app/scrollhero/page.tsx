"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Marquee Line ────────────────────────────────────────────────────────────
const MarqueeLine = ({
  text,
  color,
  speed = 30,
  bold = false,
  boldWords = [],
}: {
  text: string;
  color: string;
  speed?: number;
  bold?: boolean;
  boldWords?: string[];
}) => {
  const renderText = (t: string) => {
    if (!boldWords.length) return t;
    const parts = t.split(new RegExp(`(${boldWords.join("|")})`, "gi"));
    return parts.map((part, i) =>
      boldWords.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
        <strong key={i} style={{ color: "#38BDF8", fontWeight: 800 }}>
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const content = Array(6).fill(text);

  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        padding: "0.3rem 0",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          animation: `marqueeScroll ${speed}s linear infinite`,
          color,
          fontSize: "0.95rem",
          fontWeight: bold ? 700 : 400,
          letterSpacing: "0.08em",
          textTransform: bold ? "uppercase" : "none",
        }}
      >
        {content.map((t, i) => (
          <span
            key={i}
            style={{ paddingRight: "4rem", display: "inline-block" }}
          >
            {renderText(t)}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ScrollHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Image shrink: fullscreen → framed card
  const imgWidth = useTransform(scrollYProgress, [0, 0.7], ["100vw", "62vw"]);
  const imgBorderRadius = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["0px", "16px"]
  );
  const imgScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.88]);

  // Name fades in as scroll starts
  const nameOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const nameY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);

  // Marquee lines fade in slightly after name
  const tickerOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);

  return (
    <>
      {/* ── Keyframes injected once ── */}
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── Scroll container — tall so there's room to scroll ── */}
      <section
        ref={sectionRef}
        style={{
          position: "relative",
          height: "250vh",               /* tall scroll space */
          background: "#050816",
        }}
      >
        {/* ── Sticky wrapper keeps everything locked in viewport while scrolling ── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "#050816",
          }}
        >
          {/* Starfield */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 60%, #0a0d2e 0%, #020205 100%)",
              zIndex: 0,
            }}
          />

          {/* ── Portrait image — shrinks on scroll ── */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <motion.div
              style={{
                width: imgWidth,
                borderRadius: imgBorderRadius,
                scale: imgScale,
                overflow: "hidden",
                height: "100vh",
                position: "relative",
              }}
            >
              <img
                src="/portrait.png"
                alt="Miriam Benali"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  filter: "grayscale(100%) contrast(1.1)",
                }}
              />
              {/* Bottom fade so portrait blends into dark bg */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "30%",
                  background:
                    "linear-gradient(to bottom, transparent, #050816)",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </motion.div>

          {/* ── Name — appears on scroll ── */}
          <motion.div
            style={{
              position: "absolute",
              top: "8%",
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: nameOpacity,
              y: nameY,
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textShadow: "0 0 60px rgba(56,189,248,0.3)",
                margin: 0,
              }}
            >
              MIRIAM BENALI
            </h1>
          </motion.div>

          {/* ── Marquee tickers — appear on scroll ── */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "12%",
              left: 0,
              right: 0,
              zIndex: 10,
              opacity: tickerOpacity,
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            {/* Line 1 — blue, faster */}
            <MarqueeLine
              text="AI DEVELOPER | FULLSTACK DEVELOPER | MLOPS | COMPUTER VISION ENTHUSIAST |"
              color="#38BDF8"
              speed={22}
              bold={true}
            />

            {/* Line 2 — white with blue bold words, slower */}
            <MarqueeLine
              text="obsessed with turning data into intelligent systems — I build LLMs, RAG pipelines, and real-time ML infrastructure that scale  •  "
              color="#ffffff"
              speed={35}
              boldWords={["LLMs,", "RAG pipelines,", "real-time ML infrastructure"]}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}