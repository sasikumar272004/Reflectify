import { motion } from "framer-motion";
import { RiMentalHealthLine } from 'react-icons/ri';
import { FiTwitter, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import FloatingBlob from "../common/FloatingBlob";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingBlob size={800} color="bg-violet-500/10" initialX={-300} initialY={-200} duration={40} />
        <FloatingBlob size={600} color="bg-indigo-500/10" initialX={800} initialY={100} duration={50} delay={10} />
        <FloatingBlob size={500} color="bg-teal-500/10" initialX={400} initialY={300} duration={30} delay={5} />
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white mr-3 shadow-lg"
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                <RiMentalHealthLine className="text-xl" />
              </motion.div>
              <motion.span 
                className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Reflectify
              </motion.span>
            </div>
            <p className="mb-6 text-slate-400">
              Bridging the gap between financial health and emotional wellbeing through cutting-edge behavioral science.
            </p>
            <div className="flex space-x-4">
              {[FiTwitter, FiFacebook, FiInstagram, FiLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  whileHover={{ y: -3, scale: 1.1, color: "#ffffff" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Product</h3>
            <ul className="space-y-3">
              <li><motion.a href="#emotional-analysis" className="hover:text-white transition-colors inline-block" whileHover={{ x: 5 }}>Emotional Analysis</motion.a></li>
              <li><motion.a href="#expense-insights" className="hover:text-white transition-colors inline-block" whileHover={{ x: 5 }}>Expense Tracker</motion.a></li>
                          </ul>
          </div>
          
          
          
          
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Reflectify. All rights reserved.</p>
          <div className="flex space-x-6">
            <motion.a href="#" className="hover:text-white transition-colors" whileHover={{ y: -2 }}>Privacy Policy</motion.a>
            <motion.a href="#" className="hover:text-white transition-colors" whileHover={{ y: -2 }}>Terms of Service</motion.a>
            <motion.a href="#" className="hover:text-white transition-colors" whileHover={{ y: -2 }}>Cookies</motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;