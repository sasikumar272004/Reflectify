import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight, FaBrain, FaChartLine, FaLightbulb, FaCoins } from 'react-icons/fa';
import { GiCash, GiBrain } from 'react-icons/gi';
import FloatingBlob from "../ui/FloatingBlob";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis';
import '../../../index.css'

gsap.registerPlugin(ScrollTrigger);

// CSS variables defined in the component's styles
const styles = `
 :root {
  /* Primary Colors */
  --color-primary-dark: #9D65C9;
  --color-primary: #D5A8E4;
  --color-primary-light: #FFC6E8;
  
  /* Secondary Colors */
  --color-secondary-dark: #A3D1FF;
  --color-secondary: #C8E7FF;
  --color-secondary-light: #E8F7FF;
  
  /* Accent Colors */
  --color-accent-purple: #E2C2FF;
  --color-accent-indigo: #C6DEFF;
  --color-accent-blue: #DBF3FA;
  --color-accent-pink: #FFD6F5;
  
  /* Background Colors */
  --color-bg-lightest: #FFF9FE;
  --color-bg-light: #F5EDFA;
  --color-bg-medium: #EBE0F5;
  --color-bg-dark: #E0D1F0;
  
  /* Text Colors */
  --color-text-dark: #4A3A60;
  --color-text-medium: #7A6B8F;
  --color-text-light: #FFFFFF;

  /* Gradients */
  --gradient-primary: linear-gradient(to right, #9D65C9, #D5A8E4, #FFC6E8);
  --gradient-secondary: linear-gradient(to right, #E8F7FF, #C8E7FF, #A3D1FF);
  --gradient-multiplication: linear-gradient(to right bottom, #E2C2FF, #C6DEFF, #DBF3FA);
  --gradient-wave: linear-gradient(to bottom, #E2C2FF, #C8E7FF);
  
  /* Blob Colors */
  --blob-purple: rgba(127, 0, 255, 0.08);
  --blob-blue: rgba(225, 0, 255, 0.08);
  --blob-pink: rgba(255, 0, 127, 0.08);
  
  /* Glass Effects */
  --glass-bg: rgba(255, 255, 255, 0.4);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  
  /* Card Colors */
  --card-bg: rgba(255, 255, 255, 0.95);
  --card-border: rgba(255, 255, 255, 0.98);
  --card-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  
  /* Center Blob Gradient */
  --blob-gradient: linear-gradient(to right, #7F00FF, #E100FF, #FF007F);
}



.title-money {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
}

.title-mind {
  background: var(--gradient-secondary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
}

.subtitle-text {
  color: var(--color-text-dark);
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

.side-label {
  background: linear-gradient(to right, rgba(255,255,255,0.98), rgba(241, 245, 249, 0.9));
  backdrop-filter: blur(8px);
  border: 1px solid var(--card-border);
  box-shadow: 4px 4px 16px rgba(0,0,0,0.05);
  color: var(--color-text-medium);
}

.stats-bubble {
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  color: var(--color-text-medium);
  box-shadow: var(--card-shadow);
}

.psychology-bubble {
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  color: var(--color-secondary-light);
  box-shadow: var(--card-shadow);
}
 

 
/* Center Blob Style */
.center-blob {
  background: var(--blob-gradient);
  opacity: 0.8;
  filter: blur(60px);
}
`;

const Hero = ({ navigate }) => {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  
  // Add the styles to the document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
      direction: 'vertical',
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  return (
    <section 
      id="hero"
      ref={containerRef}
      className="min-h-[100vh] relative bg-[#F5EFFF]  overflow-hidden hero-section"
    >
      {/* Enhanced watercolor blobs with more vibrant colors */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[15%] right-[10%] md:right-[20%]"
        >
          <FloatingBlob 
            size="lg" 
            color="var(--blob-purple)" 
            style={{ filter: "blur(10px)" }}
          />
        </motion.div>
        
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute bottom-[15%] left-[10%] md:bottom-[25%] md:left-[20%]"
        >
          <FloatingBlob 
            size="xl" 
            color="var(--blob-blue)" 
            style={{ filter: "blur(90px)" }}
          />
        </motion.div>

        {/* New blob element */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
          className="absolute top-[30%] left-[25%]"
        >
          <FloatingBlob 
            size="md" 
            color="var(--blob-pink)" 
            style={{ filter: "blur(70px)" }}
          />
        </motion.div>
      </div>

      {/* SVG path animation (enhanced gradients) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        <motion.svg viewBox="0 0 800 800" className="absolute inset-0 w-full h-full">
          <filter id="quantum-fractal">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="6" />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          
          <defs>
            <radialGradient id="fractal-grad-1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#E8F6EF" />
              <stop offset="50%" stopColor="#D4F6FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--color-bg-dark)" stopOpacity="0.6" />
            </radialGradient>

           <radialGradient id="fractal-grad-2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
  <stop offset="0%" stopColor="#9c27b0" />
      <stop offset="100%" stopColor="#00bcd4" />
</radialGradient>
            
            <linearGradient id="title-gradient-money" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary-dark)" />
              <stop offset="50%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-primary-light)" />
            </linearGradient>
            
            <linearGradient id="title-gradient-mind" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-secondary-light)" />
              <stop offset="50%" stopColor="var(--color-secondary)" />
              <stop offset="100%" stopColor="var(--color-secondary-dark)" />
            </linearGradient>
          </defs>
          
          <motion.path
            fill="url(#fractal-grad-2)"
            filter="url(#quantum-fractal)"
            initial={{ d: "M400,150 C500,100 650,200 650,350 C650,500 500,650 400,650 C300,650 150,500 150,350 C150,200 300,200 400,150" }}
            animate={{
              d: [
                "M400,150 C500,100 650,200 650,350 C650,500 500,650 400,650 C300,650 150,500 150,350 C150,200 300,200 400,150",
                "M400,170 C470,130 630,220 630,360 C630,480 470,630 400,630 C330,630 170,480 170,360 C170,240 330,190 400,170",
                "M400,130 C530,70 670,180 670,340 C670,520 530,670 400,670 C270,670 130,520 130,340 C130,180 270,130 400,130",
                "M400,160 C450,120 620,210 620,370 C620,490 450,620 400,620 C350,620 180,490 180,370 C180,250 350,200 400,160"
              ],
              opacity: [0.6, 0.8, 0.7, 0.6],
              scale: [0.95, 1.05, 0.98, 0.95]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              times: [0, 0.4, 0.6, 1]
            }}
          />
          
          <motion.path
            fill="none"
            stroke="url(#fractal-grad-1)"
            strokeWidth="8"
            strokeOpacity="0.4"
            filter="url(#quantum-fractal)"
            initial={{ d: "M400,80 C600,20 720,120 720,340 C720,580 600,720 400,720 C200,720 80,580 80,340 C80,120 200,80 400,80" }}
            animate={{
              d: [
                "M400,80 C600,20 720,120 720,340 C720,580 600,720 400,720 C200,720 80,580 80,340 C80,120 200,80 400,80",
                "M400,100 C550,50 700,150 700,350 C700,550 550,700 400,700 C250,700 100,550 100,350 C100,150 250,150 400,100",
                "M400,60 C650,0 750,100 750,350 C750,600 650,750 400,750 C150,750 50,600 50,350 C50,100 150,60 400,60",
                "M400,90 C580,30 710,130 710,360 C710,590 580,710 400,710 C220,710 90,590 90,360 C90,130 220,90 400,90"
              ],
              opacity: [0.3, 0.5, 0.4, 0.3]
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              times: [0, 0.5, 0.8, 1]
            }}
          />
        </motion.svg>
       
      </div>

      {/* Main title content with enhanced styling */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            className="money text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight font-semibold title-money"
            whileHover={{ scale: 1.03 }}
          >
            MONEY
          </motion.span>
          
          <motion.div
            className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 mx-2 md:mx-4 lg:mx-8"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                duration: 15,
                ease: "linear",
                repeat: Infinity,
              },
              scale: {
                duration: 8,
                ease: [0.17, 0.67, 0.83, 0.67],
                repeat: Infinity,
              },
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.path
                d="M20,20 C30,30 70,70 80,80 M80,20 C70,30 30,70 20,80"
                stroke="url(#multiplicationGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
              />
              <defs>
                <linearGradient id="multiplicationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-accent-purple)" />
                  <stop offset="50%" stopColor="var(--color-accent-indigo)" />
                  <stop offset="100%" stopColor="var(--color-accent-blue)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          <motion.span 
            className="mind text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight font-semibold title-mind"
            whileHover={{ scale: 1.03 }}
          >
            MIND
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Subtitle */}
      <div className="container mx-auto px-6 relative h-full">
        <div className="text-center absolute bottom-[15%] sm:bottom-[10%] w-full left-0 px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl bg-transparent mx-auto text-center font-['Sentient'] px-4 sm:px-8 py-4 sm:py-6 subtitle-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Reflectify combines behavioral science with AI to reveal the hidden connections between your emotions and financial decisions.
            </motion.p>
          </motion.div>
        </div>
      </div>


     {/* Side Label */}
    <motion.div
      className="hidden sm:inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 absolute left-4 md:left-10 font-medium origin-left font-['ClashDisplay'] cursor-pointer side-label
                backdrop-blur-md bg-gradient-to-r from-[#d9e4ff]/80 to-[#f5e6ff]/80 shadow-md text-[#374151]"
      initial={{ opacity: 0, scale: 0.9, y: "-50%", rotate: 90 }}
      animate={{ opacity: 1, scale: 1, y: "-50%", rotate: 90 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      style={{ top: "35%", zIndex: 10, borderRadius: "12px" }}
    >
      <GiBrain className="text-[#6366f1]" />
      <span className="text-xs md:text-sm">Next-gen emotional & financial wellness</span>
    </motion.div>

    {/* Stats Bubble */}
    <motion.div
      className="absolute bottom-[20%] sm:bottom-[25%] right-[5%] sm:right-[10%] px-4 py-2 sm:px-6 sm:py-3 
                text-xs sm:text-sm font-['Sentient'] cursor-pointer stats-bubble
                bg-gradient-to-r from-[#a7f3d0] to-[#34d399] text-[#064e3b] shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, type: "spring" }}
      whileHover={{ borderRadius: "20px", scale: 1.05, rotate: "2deg" }}
      whileTap={{ scale: 0.95 }}
      style={{ borderRadius: "60px", transform: "rotate(-2deg)", zIndex: 10 }}
    >
      <div className="flex items-center gap-2">
        <GiCash className="text-[#047857]" />
        <span>financial awareness</span>
      </div>
    </motion.div>

    {/* Psychology Bubble */}
    <motion.div
      className="absolute top-[25%] right-[5%] sm:right-[10%] px-4 py-2 sm:px-6 sm:py-3 
                text-xs sm:text-sm font-['Sentient'] cursor-pointer psychology-bubble
                bg-gradient-to-r from-[#fef3c7] to-[#fdba74] text-[#78350f] shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, type: "spring" }}
      whileHover={{ borderRadius: "20px", scale: 1.05, rotate: "-1deg" }}
      whileTap={{ scale: 0.95 }}
      style={{ borderRadius: "60px", transform: "rotate(1deg)", zIndex: 10 }}
    >
      <div className="flex items-center gap-2">
        <FaLightbulb className="text-[#8e6620]" />
        <span className="text-[#39404f]">behavioral insights</span>
      </div>
    </motion.div>


  
    </section>
  );
};

export default Hero;