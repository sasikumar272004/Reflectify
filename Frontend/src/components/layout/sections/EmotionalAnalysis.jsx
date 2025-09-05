import React, { useEffect, useRef } from "react";
import { GiArtificialIntelligence } from "react-icons/gi";
import gsap from "gsap";

const EmotionAnalysisCandy = ({ navigate }) => {
  const scope = useRef(null);

  // === Color Palette ===
  const colors = {
     // Main background
  bgMain: "#E5D9F2",       // soft lavender
  bgSection: "#F0E7FA",    // lighter section for contrast

  // Text colors
  textPrimary: "#2D2D2D",  // dark gray for main text
  textSecondary: "#555555",// lighter gray for descriptions

  // Accent colors
  pink: "#FF9BC3",          // pastel pink
  purple: "#A78BFA",        // soft purple
  blue: "#4EA8DE",          // pastel blue

  // Gradient combinations
  gradientPinkToBlue: "linear-gradient(90deg, #FF9BC3, #A78BFA, #4EA8DE)", 
  gradientPurpleToPink: "linear-gradient(90deg, #A78BFA, #FF9BC3)",
 buttonGradient: "linear-gradient(90deg, #FFDEE9, #B5C7ED)" ,

  // Waves
  waveColor: "#F5EFFF",     // soft wave color

  // Blobs/SVG decorative colors
  svgBlob1: "#D9B3FF",
  svgBlob2: "#E0D4FF",
  svgBlob3: "#FFD6E8",
  svgBlob4: "#D0F0FF",

  // Badge
  badgeBg: "rgba(255,255,255,0.6)",
  badgeText: "#A78BFA",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".candy-section").forEach((sec) => {
        gsap.from(sec, { opacity: 0, y: 40, duration: 1, ease: "power2.out", delay: 0.2 });
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={scope}
      style={{ backgroundColor: colors.bgMain }}
      className="relative w-full min-h-screen overflow-hidden"
      id="emotional-analysis"
    >
      {/* Top Wave */}
      <div className="absolute top-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-40">
          <path fill={colors.waveColor} d="M0,64L48,74.7C96,85,192,107,288,133.3C384,160,480,192,576,176C672,160,768,96,864,96C960,96,1056,160,1152,176C1248,192,1344,160,1392,144L1440,128L1440,0L0,0Z"></path>
        </svg>
      </div>

      {/* Section 1 - Intro */}
      <section className="candy-section relative min-h-fit flex flex-col items-center justify-center px-6 py-20">
        <span
          style={{ backgroundColor: colors.badgeBg, color: colors.badgeText }}
          className="inline-flex items-center px-6 py-2 mb-6 mt-20 rounded-full backdrop-blur shadow"
        >
          <GiArtificialIntelligence className="mr-2" /> Emotional Intelligence NEW
        </span>

        <h1
          style={{ backgroundImage: colors.gradientPinkToBlue, WebkitBackgroundClip: "text", color: "transparent" }}
          className="text-5xl md:text-7xl font-extrabold h-[90px] drop-shadow-md mb-6 text-center"
        >
          Emotional Intelligence Reimagined
        </h1>

        <p style={{ color: colors.textPrimary }} className="max-w-3xl text-lg md:text-xl text-center leading-relaxed mb-10">
          Discover your hidden emotional dimensions with playful, AI-powered insights blending psychology and future-tech.
        </p>
      </section>

      {/* Section 2 - How It Works */}
      <section
        className="candy-section relative min-h-screen flex flex-col items-center justify-center px-6 pb-20"
        style={{ backgroundColor: colors.bgMain }}
      >
        <h2
          style={{ backgroundImage: colors.gradientPurpleToPink, WebkitBackgroundClip: "text", color: "transparent" }}
          className="text-4xl md:text-6xl font-bold mb-4 text-center"
        >
          How It Works
        </h2>
        <p style={{ color: colors.textSecondary }} className="max-w-2xl text-center mb-12">
          Our advanced AI analyzes your emotional patterns using proven psychological frameworks
        </p>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mb-16">
          {[
            { num: "01", color: colors.pink, title: "Share Your Feelings", text: "Through simple text inputs or voice messages, share what you're experiencing emotionally." },
            { num: "02", color: colors.purple, title: "AI Analysis", text: "Our algorithms process your input using natural language understanding and emotional recognition." },
            { num: "03", color: colors.blue, title: "Get Insights", text: "Receive detailed reports, patterns recognition, and personalized recommendations." },
          ].map((item) => (
            <div key={item.num} className="flex-1">
              <div style={{ backgroundColor: colors.badgeBg }} className="backdrop-blur p-8 rounded-3xl border border-white/60 shadow-xl">
                <div className="text-5xl font-bold mb-2" style={{ color: item.color }}>{item.num}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p style={{ color: colors.textSecondary }} className="mb-4">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="/expense"
          style={{ backgroundImage: colors.buttonGradient }}
          className="relative inline-block mb-20 px-12 py-5 rounded-3xl text-2xl font-semibold tracking-wide text-gray-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 overflow-hidden group"
        >
          🚀 Explore Now
          <span className="absolute inset-0 -z-10"></span>
          <span className="absolute inset-0 rounded-3xl border-2 border-white/40 group-hover:border-white/60 animate-pulse"></span>
        </a>
      </section>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-40">
          <path fill={colors.waveColor} d="M0,64L48,74.7C96,85,192,107,288,133.3C384,160,480,192,576,176C672,160,768,96,864,96C960,96,1056,160,1152,176C1248,192,1344,160,1392,144L1440,128L1440,0L0,0Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default EmotionAnalysisCandy;
