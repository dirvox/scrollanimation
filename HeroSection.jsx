"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const cards = [
  { image: "/hero/seoDashboard.png",    label: "SEO",        color: "#e8f4fd" },
  { image: "/hero/marketingDashboard.png", label: "Marketing", color: "#fdf0e8" },
  { image: "/hero/creative.png",         label: "Creative",   color: "#f0fdf4" },
  { image: "/hero/logoDesign.png",       label: "Branding",   color: "#fdf4f0" },
  { image: "/hero/contentWriting.png",   label: "Content",    color: "#f8f0fd" },
  { image: "/hero/webui.png",            label: "Web UI",     color: "#f0f4fd" },
  { image: "/hero/codeSs.png",           label: "Code",       color: "#fdfdf0" },
  { image: "/hero/appDevelopment.png",   label: "App Dev",    color: "#fdf0f8" },
];

/* ─── Scramble-text hook ─────────────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function useScramble(text, trigger) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const total = 20;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) =>
            char === " "
              ? " "
              : frame / total > i / text.length
              ? char
              : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      );
      frame++;
      if (frame > total) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [trigger, text]);
  return display;
}

/* ─── Magnetic card ─────────────────────────────────────── */
function MagneticCard({ data, index, isMobile }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(cardRef.current, {
      rotateY: x / 12,
      rotateX: -y / 12,
      duration: 0.4,
      ease: "power2.out",
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x * 0.4,
        y: y * 0.4,
        opacity: 1,
        duration: 0.4,
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
    }
    setHovered(false);
  };

  const w = isMobile ? 88 : 165;
  const h = isMobile ? 130 : 250;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{
        width: w,
        height: h,
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: -w / 2,
        marginTop: -h / 2,
        transformStyle: "preserve-3d",
        perspective: 800,
        cursor: "pointer",
        willChange: "transform",
      }}
    >
      {/* Card shell */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: isMobile ? 16 : 24,
          overflow: "hidden",
          position: "relative",
          background: data.color,
          boxShadow: hovered
            ? `0 32px 80px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.8)`
            : `0 16px 48px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)`,
          transition: "box-shadow 0.4s ease",
          border: "1px solid rgba(255,255,255,0.9)",
        }}
      >
        {/* Moving glow */}
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "60%",
            height: "60%",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)",
            pointerEvents: "none",
            opacity: 0,
            zIndex: 3,
            filter: "blur(8px)",
          }}
        />

        {/* Image */}
        <img
          src={data.image}
          alt={data.label}
          style={{
            width: "100%",
            height: "85%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Label bar */}
        <div
          style={{
            height: "15%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            style={{
              fontSize: isMobile ? 9 : 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#333",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {data.label}
          </span>
        </div>

        {/* Shimmer on hover */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
              animation: "shimmer 0.7s ease forwards",
              pointerEvents: "none",
              zIndex: 4,
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────── */
export default function BottomScrollLayer() {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const cardsRef = useRef([]);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const badgeRef = useRef(null);
  const orbitRingRef = useRef(null);
  const dotRingRef = useRef(null);
  const centerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scramble, setScramble] = useState(false);
  const word1 = useScramble("Design.", scramble);
  const word2 = useScramble("Develop.", scramble);
  const word3 = useScramble("Scale.", scramble);

  /* resize */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* heading animations */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -16, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(2)" }
    );

    // Word-by-word flip-up with perspective
    const words = headingRef.current.querySelectorAll(".word");
    tl.fromTo(
      words,
      { opacity: 0, y: 80, rotateX: -90, transformOrigin: "50% 100%" },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.14,
      },
      "-=0.2"
    );

    tl.fromTo(
      paraRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      "-=0.5"
    );

    // Trigger scramble after initial reveal
    tl.call(() => setScramble(true));

    // Continuous subtle float
    gsap.to(headingRef.current, {
      y: "+=8",
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  /* orbit + scroll */
  useEffect(() => {
    if (!circleRef.current) return;
    const radius = isMobile ? 145 : 310;

    const ctx = gsap.context(() => {
      // Position cards on circle
      cardsRef.current.forEach((card, i) => {
        const angle = (i / cards.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        gsap.set(card, {
          x,
          y,
          rotate: angle * (180 / Math.PI) + 90,
        });
      });

      // Entrance
      gsap.from(cardsRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1.4,
        stagger: 0.1,
        ease: "back.out(1.5)",
        delay: 0.6,
      });

      // Scroll-driven rotation
      gsap.to(circleRef.current, {
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3200",
          scrub: 1.8,
          pin: true,
        },
      });

      // Orbit rings counter-rotate
      if (orbitRingRef.current) {
        gsap.to(orbitRingRef.current, {
          rotate: -360,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=3200",
            scrub: 2,
          },
        });
      }
      if (dotRingRef.current) {
        gsap.to(dotRingRef.current, {
          rotate: 360,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=3200",
            scrub: 3,
          },
        });
      }

      // Float cards independently
      cardsRef.current.forEach((card, i) => {
        gsap.to(card, {
          y: `+=${isMobile ? 12 : 22}`,
          duration: 2.2 + i * 0.18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Center pulse
      if (centerRef.current) {
        gsap.to(centerRef.current, {
          scale: 1.08,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const orbitR = isMobile ? 150 : 320;
  const dotR = isMobile ? 105 : 220;
  const dotCount = isMobile ? 12 : 24;

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "150vh",
        background: "linear-gradient(160deg, #fafafa 0%, #f0f0f0 50%, #fafafa 100%)",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      }}
     
    >
      {/* ── Noise texture overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.5,
        }}
      />

      {/* ── Background grid ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── HEADER ── */}
      <div
        style={{
          textAlign: "center",
          paddingTop: isMobile ? "48px" : "72px",
          paddingInline: "24px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Badge */}
        {/* <div
          ref={badgeRef}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 999,
            padding: "6px 18px",
            marginBottom: 28,
            opacity: 0,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22c55e",
              display: "inline-block",
              boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#555",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Full-Stack Digital Agency
          </span>
        </div> */}

        {/* Heading */}
        <h1
          ref={headingRef}
          style={{
            fontSize: "clamp(44px, 8vw, 100px)",
            fontWeight: 900,
            lineHeight: 1,
            color: "#0a0a0a",
            marginBottom: 10,
            perspective: "800px",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "-0.03em",
            marginTop: isMobile ? 50 : 12,
          }}

         
        >
          {[word1, word2, word3].map((w, i) => (
            <span
              key={i}
              className="word"
              style={{
                display: "inline-block",
                marginRight: "0.22em",
                opacity: 0,
                backgroundImage:
                  i === 2
                    ? "linear-gradient(135deg, #111 0%, #555 100%)"
                    : "none",
                WebkitBackgroundClip: i === 2 ? "text" : "unset",
                WebkitTextFillColor: i === 2 ? "transparent" : "inherit",
                position: "relative",
              }}
            >
              {w}
              {/* Underline accent on last word */}
              {i === 2 && (
                <span
                  style={{
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 4,
                    background:
                      "linear-gradient(90deg, #111, transparent)",
                    borderRadius: 2,
                  }}
                />
              )}
            </span>
          ))}
        </h1>

        <p
          ref={paraRef}
          style={{
            maxWidth: 700,
            margin: "0 auto",
            color: "#777",
            fontSize: "clamp(14px, 2vw, 20px)",
            lineHeight: 1.75,
            opacity: 0,
            fontWeight: 400,
          }}
        >
          Complete digital solutions for startups, brands, and growing
          businesses
        </p>
      </div>

      {/* ── ORBIT AREA ── */}
      <div
        style={{
          height: isMobile ? "70vh" : "78vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          marginTop: isMobile ? 16 : 160,
        }}
      
      >
        {/* SVG orbit rings */}
        <svg
          ref={orbitRingRef}
          width={orbitR * 2 + 40}
          height={orbitR * 2 + 40}
          style={{ position: "absolute", pointerEvents: "none", opacity: 0.18 }}
          viewBox={`0 0 ${orbitR * 2 + 40} ${orbitR * 2 + 40}`}
        >
          <circle
            cx={orbitR + 20}
            cy={orbitR + 20}
            r={orbitR}
            fill="none"
            stroke="#111"
            strokeWidth="1"
            strokeDasharray="6 12"
          />
          <circle
            cx={orbitR + 20}
            cy={orbitR + 20}
            r={orbitR - 30}
            fill="none"
            stroke="#111"
            strokeWidth="0.5"
            strokeDasharray="2 8"
          />
        </svg>

        {/* Dot ring */}
        <div
          ref={dotRingRef}
          style={{
            position: "absolute",
            width: dotR * 2,
            height: dotR * 2,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        >
          {Array.from({ length: dotCount }).map((_, i) => {
            const a = (i / dotCount) * Math.PI * 2;
            const dx = Math.cos(a) * dotR + dotR;
            const dy = Math.sin(a) * dotR + dotR;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: i % 4 === 0 ? 5 : 3,
                  height: i % 4 === 0 ? 5 : 3,
                  borderRadius: "50%",
                  background: i % 4 === 0 ? "#111" : "#aaa",
                  left: dx,
                  top: dy,
                  transform: "translate(-50%,-50%)",
                }}
              />
            );
          })}
        </div>

        {/* Center glow */}
        <div
          ref={centerRef}
          style={{
            width: isMobile ? 120 : 200,
            height: isMobile ? 120 : 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(240,240,240,0.6) 60%, transparent 100%)",
            position: "absolute",
            filter: "blur(12px)",
            zIndex: 2,
          }}
        />

        {/* Center label */}
        <div
          style={{
            position: "absolute",
            zIndex: 5,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: isMobile ? 64 : 100,
              height: isMobile ? 64 : 100,
              borderRadius: "50%",
              background: "#111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
            }}
          
          >
            <span
              style={{
                color: "#fff",
                fontSize: isMobile ? 10 : 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "'DM Mono', monospace",
              }}
               
            >
             8+ <br />Services
            </span>
          </div>
        </div>

        {/* Rotating ring with cards */}
        <div
          ref={circleRef}
          style={{
            width: isMobile ? 300 : 640,
            height: isMobile ? 300 : 640,
            borderRadius: "50%",
            position: "relative",
            zIndex: 4,
          }}
           className="md:mt-70"
          
        >
          {cards.map((data, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ position: "absolute", top: "50%", left: "50%" }}
            >
              <MagneticCard data={data} index={i} isMobile={isMobile} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Shimmer keyframe ── */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(250%) skewX(-15deg); }
        }
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700;900&family=DM+Mono:wght@500;600&display=swap');
      `}</style>
    </section>
  );
}