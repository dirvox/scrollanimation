import { useEffect, useRef, useState } from "react";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: "01",
    title: "Elegant Evening Gown",
    category: "Party Wear",
    image: "/girl-dress/1-removebg-preview.png",
    description:
      "A graceful floor-length gown crafted with luxurious fabric, perfect for evening parties, receptions, and special occasions.",
  },
  {
    id: "02",
    title: "Floral Summer Dress",
    category: "Casual Wear",
    image: "/girl-dress/2-removebg-preview.png",
    description:
      "Lightweight floral dress designed for everyday comfort with a fresh, feminine look ideal for brunches and vacations.",
  },
  {
    id: "03",
    title: "Traditional Ethnic Dress",
    category: "Ethnic Collection",
    image: "/girl-dress/8-removebg-preview.png",
    description:
      "Celebrate tradition with beautifully crafted ethnic wear featuring elegant patterns and premium detailing.",
  },
  {
    id: "04",
    title: "Designer Cocktail Dress",
    category: "Luxury Collection",
    image: "/girl-dress/7-removebg-preview.png",
    description:
      "Modern silhouette with sophisticated cuts, designed to make a bold statement at parties and premium events.",
  },
  {
    id: "05",
    title: "Princess Ball Gown",
    category: "Wedding Collection",
    image: "/girl-dress/6-removebg-preview.png",
    description:
      "A stunning ball gown featuring layered fabrics and elegant craftsmanship for weddings and grand celebrations.",
  },
  {
    id: "06",
    title: "Classic Maxi Dress",
    category: "Daily Fashion",
    image: "/girl-dress/4-removebg-preview.png",
    description:
      "A timeless maxi dress combining comfort and elegance, suitable for casual outings and weekend gatherings.",
  },
  {
    id: "07",
    title: "Luxury Designer Dress",
    category: "Premium Collection",
    image: "/girl-dress/3-removebg-preview.png",
    description:
      "Premium designer dress with refined tailoring, contemporary styling, and luxurious finishing touches.",
  },
];

export default function ModelDressScrollAnimaion() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeCard, setActiveCard] = useState(null);

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
          y,
        );

        const opacity = gsap.utils.mapRange(
          -radius * 0.45,
          radius * 0.45,
          0.2,
          1,
          y,
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
        rotation = self.progress * 360;

        positionCards(rotation);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="bg-white text-black overflow-hidden">
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
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" /> */}

        <div className="text-center relative z-10">
          <p className="uppercase tracking-[0.45em] text-zinc-500 text-xs md:text-sm mb-6">
            Animation for Shopping Webiste 
          </p>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black leading-none">
            Girls 
            <br />
            Dress
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
        className="relative h-screen overflow-hidden bg-white"
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
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
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
               
               
                will-change-transform
              "
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

            <div
  className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${
    activeCard === index
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8 pointer-events-none"
  }`}
>
  <div className="rounded-3xl bg-white/95 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] border border-gray-100 p-5">

    {/* Category Badge */}
    <div className="flex items-center justify-between">
      <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[11px] font-semibold uppercase tracking-wider">
        {item.category}
      </span>

      <span className="text-3xl font-black text-gray-200">
        {item.id}
      </span>
    </div>

    {/* Dress Name */}
    <h2 className="mt-4 text-2xl font-bold text-gray-900 leading-tight">
      {item.title}
    </h2>

    {/* Description */}
    <p className="mt-2 text-sm leading-6 text-gray-600">
      {item.description}
    </p>

    {/* Bottom */}
    <div className="mt-5 flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-400">Collection</p>
        <p className="font-semibold text-gray-800">
          Premium Fashion
        </p>
      </div>

      <button className="rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-all duration-300">
        View Details →
      </button>
    </div>

  </div>
</div>

              {/* OVERLAY */}
              {/* <div className="absolute inset-0 bg-black/40" /> */}

              {/* LIGHT */}
              {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_30%)]" /> */}

              {/* CONTENT */}
              {/* <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-7 ">
               
                <div className="flex items-start justify-between">
                  <div className="glass px-4 py-2 rounded-full border border-white/10">
                    <span className="text-xs text-white/80">
                      {item.id}
                    </span>
                  </div>

                  <div className="w-12 h-[2px] bg-white/40 rounded-full mt-4" />
                </div>

               
                <div>
                  <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-zinc-300 mb-4">
                    {item.category}
                  </p>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-none">
                    {item.title}
                  </h2>
                </div>
              </div> */}

              {/* BORDER */}
              {/* <div className="absolute inset-0 border border-white/10 rounded-[28px]" /> */}

              {/* SHADOW */}
              {/* <div className="absolute inset-0 shadow-[inset_0_-100px_120px_rgba(0,0,0,0.7)]" /> */}
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
