import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FaUserCircle, FaBrain } from 'react-icons/fa';
import { RiMentalHealthFill, RiCloseLine } from 'react-icons/ri';
import { IoMdAnalytics } from 'react-icons/io';
import { BiMoney } from 'react-icons/bi';
import { BsGraphUp } from 'react-icons/bs';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const sections = [
  { id: "hero", label: "Neuro Home"  },
  { id: "emotional-analysis", label: "Emotion AI",  },
  { id: "expense-insights", label: "Finance Cortex",  },
  { id: "transformation", label: "Mind Journey",  },
 
];

const Navbar = ({
  isProfileOpen,
  setIsProfileOpen,
  activeSection,
  setActiveSection,
  setIsMenuOpen,
  navHidden,
  handleLogout,
  navigate
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const controls = useAnimation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHover = (id) => {
    setHoveredItem(id);
    controls.start({ opacity: 1, transition: { duration: 0.2 } });
  };

  const handleHoverEnd = () => {
    controls.start({ opacity: 0, transition: { duration: 0.2 } })
      .then(() => setHoveredItem(null));
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to profile page
    setIsProfileOpen(false); // Close the dropdown
  };

  return (
    <motion.nav
      className={`fixed top-0 pt-4 left-0 w-full z-[1000] ${scrolled ? 'backdrop-blur-xl' : 'backdrop-blur-md '}`}
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 }
      }}
      animate={navHidden ? "hidden" : "visible"}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      initial={false}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-3 cursor-pointer group relative"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('hero');
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#121212] to-[#282827] text-white flex items-center justify-center shadow-lg relative overflow-hidden"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <RiMentalHealthFill className="text-2xl" />
            
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                style={{
                  width: `${Math.random() * 100 + 50}%`,
                  height: `${Math.random() * 100 + 50}%`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </motion.div>
          
          <motion.span 
            className="text-2xl font-bold bg-gradient-to-r from-[#2c4242] to-[#636562] bg-clip-text text-transparent tracking-tight"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            REFLECTIFY
          </motion.span>
          
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: scrolled ? 1 : 0,
              opacity: scrolled ? 0.5 : 0
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-1 relative">
          {sections.map(({ id, label, icon }) => (
            <motion.button
              key={id}
              className={`relative px-5 py-3 text-sm font-medium transition-all flex items-center ${
                activeSection === id ? "text-[#424040]" : "text-[#42403f] hover:text-black"
              }`}
              onClick={() => {
                const section = document.getElementById(id);
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection(id);
                }
              }}
              onMouseEnter={() => handleHover(id)}
              onMouseLeave={handleHoverEnd}
              whileHover={{ 
                y: -2,
                textShadow: "0 0 8px rgba(192, 132, 252, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {icon}
              {label}
            </motion.button>
          ))}
          
          <AnimatePresence>
            {hoveredItem && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="100%" height="100%" className="absolute top-0 left-0">
                  {sections.filter(s => s.id !== hoveredItem).map((section) => (
                    <motion.path
                      key={`connection-${section.id}`}
                      d={`M ${sections.findIndex(s => s.id === hoveredItem) * 120 + 60} 60 ${
                        sections.findIndex(s => s.id === section.id) * 120 + 60
                      } 60`}
                      stroke="url()"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray="10 5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ pathLength: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  ))}
                </svg>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile and Mobile Menu */}
        <div className="relative">
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="cursor-pointer"
    onClick={handleProfileClick}
  >
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#141414] to-[#3b3937] flex items-center justify-center shadow-lg">
      <FiUser className="text-white text-lg" />
    </div>
  </motion.div>
</div>
      </div>
    </motion.nav>
  );
};

export default Navbar;