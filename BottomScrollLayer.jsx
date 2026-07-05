import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1200&auto=format&fit=crop",
];

const BottomScrollLayer = () => {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const radius = isMobile ? 160 : 340;

      cardsRef.current.forEach((card, index) => {
        const angle = (index / cards.length) * Math.PI * 2;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        gsap.set(card, {
          x,
          y,
          rotate: angle * (180 / Math.PI) + 90,
        });
      });

      // MAIN CIRCLE ROTATION
      gsap.to(circleRef.current, {
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1.5,
          pin: true,
        },
      });

      // Floating cards
      cardsRef.current.forEach((card, index) => {
        gsap.to(card, {
          y: "+=20",
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Entrance animation
      gsap.from(cardsRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.08,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "350vh",
        background:
          "linear-gradient(to bottom, #000000, #211515, #070707)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "70px",
          paddingInline: "20px",
          position: "relative",
          zIndex: 0,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(42px,7vw,95px)",
            fontWeight: "800",
            lineHeight: 1,
            color: "#202020",
            marginBottom: "22px",
          }}
        >
          Explore Our Vision
        </h1>

        {/* <p
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            color: "#666",
            fontSize: "clamp(15px,2vw,22px)",
            lineHeight: 1.7,
          }}
        >
          Scroll and watch beautiful cards rotate in a smooth circular motion.
        </p> */}
      </div>

      {/* CIRCLE AREA */}
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* CENTER GLOW */}
        <div
          style={{
            width: window.innerWidth < 768 ? "180px" : "320px",
            height: window.innerWidth < 768 ? "180px" : "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(220,220,220,0.4) 70%, transparent 100%)",
            position: "absolute",
            filter: "blur(10px)",
          }}
        />

        {/* ROTATING CIRCLE */}
        <div
          ref={circleRef}
          style={{
            width: window.innerWidth < 768 ? "320px" : "700px",
            height: window.innerWidth < 768 ? "320px" : "700px",
            borderRadius: "50%",
            position: "relative",
          }}
        >
          {cards.map((image, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{
                width: window.innerWidth < 768 ? "90px" : "180px",
                height: window.innerWidth < 768 ? "140px" : "280px",
                borderRadius: "30px",
                overflow: "hidden",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginLeft:
                  window.innerWidth < 768 ? "-45px" : "-90px",
                marginTop:
                  window.innerWidth < 768 ? "-70px" : "-140px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              <img
                src={image}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BottomScrollLayer;