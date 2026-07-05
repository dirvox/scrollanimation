import { useEffect, useRef } from "react";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: "01",
    title: "Raven Claw",
    category: "Fashion Editorial",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1600&q=80",
  },
  {
    id: "02",
    title: "Clive Willow",
    category: "Luxury Identity",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1600&q=80",
  },
  {
    id: "03",
    title: "Clay Nicolas",
    category: "Creative Direction",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1600&q=80",
  },
  {
    id: "04",
    title: "Solène Voss",
    category: "Visual Campaign",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1600&q=80",
  },
  {
    id: "05",
    title: "Maren Holt",
    category: "Brand Story",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80",
  },
  {
    id: "06",
    title: "Noir Studio",
    category: "Art Direction",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&q=80",
  },
  {
    id: "07",
    title: "Velvet Echo",
    category: "Modern Portfolio",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=1600&q=80",
  },
];

export default function CircularScrollCarousel() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const items = cardsRef.current;

    const total = items.length;
    const radius = window.innerWidth < 768 ? 260 : 480;

    // POSITION CARDS IN CIRCLE
    const positionCards = (rotation) => {
      items.forEach((card, i) => {
        const angle = ((360 / total) * i + rotation) * (Math.PI / 180);

        const x = Math.sin(angle) * radius;
        const y = Math.cos(angle) * radius * 0.45;

        // FRONT CARD EFFECT
        const scale = gsap.utils.mapRange(
          -radius * 0.45,
          radius * 0.45,
          0.65,
          1,
          y
        );

        const opacity = gsap.utils.mapRange(
          -radius * 0.45,
          radius * 0.45,
          0.2,
          1,
          y
        );

        const zIndex = Math.round(scale * 100);

        gsap.set(card, {
          x,
          y,
          scale,
          opacity,
          zIndex,
          rotateY: x / 18,
          rotateX: -y / 30,
          filter: `blur(${(1 - scale) * 6}px)`,
        });
      });
    };

    let rotation = 0;

    positionCards(rotation);

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=6000",
      scrub: 1.5,
      pin: true,

      onUpdate: (self) => {
        rotation = self.progress * 720;

        positionCards(rotation);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* GLOBAL STYLE */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;800;900&display=swap');

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          background:black;
          font-family:'Inter',sans-serif;
          overflow-x:hidden;
        }

        .glass{
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
      `}</style>

      {/* HERO */}
      <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

        <div className="text-center relative z-10">
          <p className="uppercase tracking-[0.45em] text-zinc-500 text-xs md:text-sm mb-6">
            Circular Scroll Animation
          </p>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black leading-none">
            Infinite
            <br />
            Motion
          </h1>

          <p className="mt-8 text-zinc-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Scroll down and watch cards rotate like a cinematic circular
            carousel with smooth layered motion.
          </p>
        </div>
      </section>

      {/* CIRCLE SECTION */}
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-black"
      >
        {/* BG LIGHT */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />

        {/* CENTER GLOW */}
        <div className="absolute left-1/2 top-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-white/5 blur-[120px] rounded-full" />

        {/* CARDS */}
        <div className="relative w-full h-full flex items-center justify-center perspective-[2000px] md:pb-[210px]">
          {cards.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="
                absolute
                w-[230px]
                sm:w-[280px]
                md:w-[340px]
                lg:w-[380px]
                h-[340px]
                sm:h-[420px]
                md:h-[500px]
                rounded-[28px]
                overflow-hidden
                border
                border-white/10
                bg-zinc-900
                shadow-[0_25px_80px_rgba(0,0,0,0.8)]
                will-change-transform
              "
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40" />

              {/* LIGHT */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_30%)]" />

              {/* CONTENT */}
              <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-7 ">
                {/* TOP */}
                <div className="flex items-start justify-between">
                  <div className="glass px-4 py-2 rounded-full border border-white/10">
                    <span className="text-xs text-white/80">
                      {item.id}
                    </span>
                  </div>

                  <div className="w-12 h-[2px] bg-white/40 rounded-full mt-4" />
                </div>

                {/* BOTTOM */}
                <div>
                  <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-zinc-300 mb-4">
                    {item.category}
                  </p>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-none">
                    {item.title}
                  </h2>
                </div>
              </div>

              {/* BORDER */}
              <div className="absolute inset-0 border border-white/10 rounded-[28px]" />

              {/* SHADOW */}
              <div className="absolute inset-0 shadow-[inset_0_-100px_120px_rgba(0,0,0,0.7)]" />
            </div>
          ))}
        </div>
      </section>

      {/* END */}
      <section className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-8">
            Smooth Ending
          </h2>

          <p className="text-zinc-400 text-sm md:text-lg">
            Circular cinematic carousel animation completed.
          </p>
        </div>
      </section>
    </div>
  );
}