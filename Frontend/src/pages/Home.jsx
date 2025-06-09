import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

// Components
import Navbar from "../components/layout/Navbar";
import MobileMenu from "../components/layout/MobileMenu";
import Footer from "../components/layout/Footer";
import BackToTop from "../components/ui/BackToTop";
import Hero from "../components/sections/Hero";
import EmotionalAnalysis from "../components/sections/EmotionalAnalysis";
import ExpenseInsights from "../components/sections/ExpenseInsights";
import Transformation from "../components/sections/Transformation";


const Home = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navHidden, setNavHidden] = useState(false);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxYReverse = useTransform(scrollYProgress, [0, 1], [0, 200]);


  

  // Track scroll position for section highlighting
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sections = ["hero", "emotional-analysis", "expense-insights", "transformation", "testimonials", "cta"];
    const sectionPositions = sections.map(section => {
      const el = document.getElementById(section);
      if (!el) return { section, position: 0 };
      const rect = el.getBoundingClientRect();
      return { section, position: rect.top };
    });

    const closest = sectionPositions.reduce((prev, curr) => {
      return (Math.abs(curr.position) < Math.abs(prev.position) ? curr : prev);
    });

    setActiveSection(closest.section);
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/register");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/register");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 text-slate-800 overflow-x-hidden">
      <Navbar 
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setIsMenuOpen={setIsMenuOpen}
        navHidden={navHidden}
        handleLogout={handleLogout}
        navigate={navigate}
      />
      
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <Hero navigate={navigate} />
      <EmotionalAnalysis navigate={navigate} />
      <ExpenseInsights navigate={navigate} />
      <Transformation />
      
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Home;