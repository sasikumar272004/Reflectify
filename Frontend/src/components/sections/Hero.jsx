import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight, FaBrain, FaChartLine } from 'react-icons/fa';
import FloatingBlob from "../common/FloatingBlob";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis';
import '../../../src/index.css'

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ navigate }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [transientPaths, setTransientPaths] = useState([]);
  const containerRef = useRef(null);
  
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
      direction: 'vertical',
    });

    // Connect GSAP ScrollTrigger with Lenis
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
  
  const yPos = useTransform(scrollYProgress, [0, 1], [0, 0]);

  // Rest of your component remains the same...
  return (
    <section 
      id="hero"
      ref={containerRef}
      className="min-h-[100vh] bg-gradient-to-b from-[#f9fbfd] via-[#f2f7fb] to-[#e8f3f5] relative overflow-hidden"
          >
         {/* Large transient wave paths */}
         {transientPaths.map((path) => (
        <motion.svg
          key={path.id}
          viewBox={`0 0 ${path.size.width.replace('vw', '00').replace('vh', '00')} ${path.size.height.replace('vh', '00').replace('vw', '00')}`}
          className="absolute pointer-events-none"
          style={{
            left: path.position.x,
            top: path.position.y,
            width: path.size.width,
            height: path.size.height,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: path.delay }}
        >
          <motion.path
            d={path.d}
            stroke={path.color}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: path.duration,
              ease: "easeInOut",
              delay: path.delay
            }}
          />
        </motion.svg>
      ))}

      {/* Original watercolor blobs */}
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
        >
          <FloatingBlob 
            size="lg" 
            color="rgba(124, 58, 237, 0.05)" 
            className="top-[15%] right-[20%]" 
            style={{ filter: "blur(80px)" }}
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
        >
          <FloatingBlob 
            size="xl" 
            color="rgba(14, 165, 233, 0.05)" 
            className="bottom-[25%] left-[20%]" 
            style={{ filter: "blur(90px)" }}
          />
        </motion.div>
      </div>

      {/* Your original two SVG paths (kept exactly as before) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* 1st Wave */}
            <motion.svg 
              viewBox="0 0 500 50" 
              className="absolute
            top-[40%] left-0 w-full opacity-10"
              style={{ y: yPos }}
            >
              <motion.path 
                d="M0,25 C80,5 150,45 250,25 C350,5 420,45 500,25" 
                stroke="#7c3aed" 
                strokeWidth="1.5" 
                fill="none" 
                strokeDasharray="12 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </motion.svg>

            {/* 2nd Wave */}
             {/* <motion.svg 
                viewBox="0 0 500 30" 
                className="absolute
 bottom-[-5%] z-50 left-0 w-full opacity-10"
                style={{ y: yPos }}
                initial={{ rotate: 0 }}
                animate={{ rotate: -50 }}
                transition={{ duration: 1 }}
              >
                <motion.path 
                  d="M0,15 C100,30 150,0 250,15 C350,30 400,0 500,15" 
                  stroke="#0ea5e9" 
                  strokeWidth="1.2" 
                  fill="none" 
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.8 }}
                />
              </motion.svg> */}


           
       </div>

      {/* Main title content (unchanged) */}
      <motion.div 
        className="absolute
 inset-0 flex items-center justify-center pointer-events-none z-0"
       >
        <motion.div 
          className="flex items-baseline justify-center gap-2 md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            className="money text-6xl md:text-8xl lg:text-9xl text-[#1e3a8a] tracking-tight font-semibold"
            whileHover={{ scale: 1.03 }}
            style={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.02)"
            }}
          >
            MONEY
          </motion.span>
          
          <motion.div
            className="relative h-[100px] w-[100px] mx-4 md:mx-8"
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
                stroke="#A888B5"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 0.5,
                  ease: "easeInOut",
                  repeatType: "loop", // Optional for clarity
                }}
              />
              <defs>
                <linearGradient id="multiplicationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          
          <motion.span 
            className="mind text-6xl md:text-8xl lg:text-9xl text-[#0ea5e9] tracking-tight font-semibold"
            whileHover={{ scale: 1.03 }}
            style={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.02)"
            }}
          >
            MIND
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute
 top-[35%] left-[15%] text-2xl font-['Sentient'] text-[#526f6e] px-4 cursor-pointer"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 50 }}
        whileHover={{ scale: 1.05, rotate: "-1deg" }}
        whileTap={{ scale: 0.95 }}
      >
        78% of financial decisions
      </motion.div>
      
      <motion.div 
        className="absolute
 top-[35%] right-[25%] text-2xl font-['Sentient'] text-[#41616f] px-4 cursor-pointer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 50 }}
        whileHover={{ scale: 1.05, rotate: "1deg" }}
        whileTap={{ scale: 0.95 }}
      >
        are emotionally driven
      </motion.div>

      {/* Enhanced content container */}
      <div className="container mx-auto px-6 relative h-screen">
        <div className="text-center absolute
 bottom-[10%] w-full">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="text-xl md:text-2xl text-[#1f646b] bg-transparent max-w-3xl mx-auto text-center font-['Sentient'] px-8 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Reflectify combines behavioral science with AI to reveal the hidden connections between your emotions and financial decisions.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Animated side label */}
      <motion.div
        className="inline-flex items-center px-5 py-3 absolute
 left-10 font-medium text-[#1e3a8a] origin-left font-['ClashDisplay'] cursor-pointer"
        initial={{ 
          opacity: 0, 
          scale: 0.9,
          y: "-50%",
          rotate: 90
        }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: "-50%",
          rotate: 90
        }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          top: "35%",
          background: "linear-gradient(to right, rgba(255,255,255,0.98), rgba(241, 245, 249, 0.9))",
          backdropFilter: "blur(8px)",
          borderRadius: "50px",
          border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "4px 4px 16px rgba(0,0,0,0.05)",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          textShadow: "0 1px 2px rgba(0,0,0,0.03)",
          zIndex: 10
        }}
      >
        Next-gen emotional & financial wellness
      </motion.div>

      {/* Interactive stats bubble */}
      <motion.div 
        className="absolute
 bottom-[25%] right-[10%] px-6 py-3 text-sm font-['Sentient'] cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, type: "spring" }}
        whileHover={{
          borderRadius: "20px",
          scale: 1.05,
          rotate: "2deg"
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "60px",
          border: "1px solid rgba(255, 255, 255, 0.98)",
          color: "#0ea5e9",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          transform: "rotate(-2deg)",
          zIndex: 10
        }}
      >
        <div className="flex items-center gap-2">
          <FaChartLine className="text-[#0ea5e9]" />
           financial awareness
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute
 bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-[#475569] text-sm mb-2 font-['Sentient']"
        >
        
        </motion.div>
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;