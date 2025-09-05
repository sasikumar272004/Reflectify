import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiMentalHealthLine } from 'react-icons/ri';

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, activeSection, setActiveSection }) => {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.div 
            className="absolute top-0 right-0 h-full w-80 bg-white shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex justify-between items-center border-b">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white mr-3">
                  <RiMentalHealthLine className="text-xl" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Reflectify
                </span>
              </div>
              <button 
                className="text-2xl text-slate-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <RiCloseLine />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {["hero", "emotional-analysis", "expense-insights", "transformation", "testimonials", "cta"].map((item) => (
                <motion.button
                  key={item}
                  className={`block w-full text-left py-3 px-4 rounded-lg transition-colors ${activeSection === item ? "bg-violet-100 text-violet-600" : "hover:bg-slate-100"}`}
                  onClick={() => {
                    const section = document.getElementById(item);
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection(item);
                      setIsMenuOpen(false);
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;