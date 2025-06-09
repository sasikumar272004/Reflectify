import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import { MdOutlinePsychology, MdOutlineEmojiEmotions } from 'react-icons/md';
import { FiCheckCircle } from 'react-icons/fi';
import FloatingBlob from "../common/FloatingBlob";

const EmotionalAnalysis = ({ navigate }) => {
  return (
    <section id="emotional-analysis" className="min-h-screen relative bg-gradient-to-b from-[#d4e2e5]  via-[#f2f7fb] to-[#e8f3f5] overflow-hidden">
      {/* Background SVG Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Wave 1 */}
        <motion.svg 
          viewBox="0 0 500 50" 
          className="absolute top-[15%] left-0 w-full opacity-10"
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          <motion.path 
            d="M0,25 C150,5 250,45 500,25" 
            stroke="#7c3aed" 
            strokeWidth="1.5" 
            fill="none"
            strokeDasharray="10 5"
          />
        </motion.svg>

        {/* Wave 2 */}
        <motion.svg 
          viewBox="0 0 500 30" 
          className="absolute bottom-[20%] right-0 w-full opacity-10 rotate-180"
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity, delay: 2 }}
        >
          <motion.path 
            d="M0,15 C100,30 150,0 250,15" 
            stroke="#0ea5e9" 
            strokeWidth="1.2" 
            fill="none"
            strokeDasharray="8 4"
          />
        </motion.svg>

        {/* Floating Circles */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute top-[30%] left-[10%] w-40 opacity-10"
          initial={{ y: -20 }}
          animate={{ y: 20 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <motion.circle
            cx="50" cy="50" r="40"
            stroke="#A888B5"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.5 }}
          />
        </motion.svg>

        {/* Floating Blobs */}
        <FloatingBlob 
          size="xl" 
          color="rgba(124, 58, 237, 0.05)" 
          className="top-[15%] right-[20%]" 
          style={{ filter: "blur(80px)" }}
        />
        <FloatingBlob 
          size="lg" 
          color="rgba(14, 165, 233, 0.05)" 
          className="bottom-[25%] left-[20%]" 
          style={{ filter: "blur(90px)" }}
        />
      </div>

      <div className="container mx-auto p-10 relative min-h-screen flex flex-col justify-center">
        <motion.div
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span 
            className="inline-flex items-center px-5 py-2 rounded-full bg-violet-100 text-violet-600 font-medium mb-8 shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="inline-block mr-2"
            >
              🧠
            </motion.span>
            Emotional Intelligence
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#1e3a8a]">
            Decode Your <span className="text-[#0ea5e9]">Emotional Patterns</span>
          </h2>
          
          <motion.p
            className="text-xl text-[#1f646b] max-w-3xl mx-auto font-['Sentient']"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Our AI analyzes your daily activities and emotional states to uncover hidden patterns that influence your financial decisions.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-8">
              <motion.div 
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white mr-6 shadow-lg"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <MdOutlinePsychology className="text-3xl" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#1e3a8a]">Daily Mood Tracking</h3>
            </div>
            <p className="text-[#526f6e] mb-6 font-['Sentient']">
              Log your emotional states throughout the day and see how they correlate with your spending habits.
            </p>
            
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-8">
              <motion.div 
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white mr-6 shadow-lg"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: 0.5
                }}
              >
                <MdOutlineEmojiEmotions className="text-3xl" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#1e3a8a]">AI-Powered Insights</h3>
            </div>
            <p className="text-[#526f6e] mb-6 font-['Sentient']">
              Our advanced algorithms detect emotional triggers and provide personalized recommendations.
            </p>
           
          </motion.div>
        </div>
        
        {/* Floating decorative elements */}
        <motion.div
          className="absolute bottom-[10%] left-[5%] text-2xl font-['Sentient'] text-[#526f6e] px-4 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 50 }}
          whileHover={{ scale: 1.05, rotate: "-1deg" }}
        >
          "Emotions drive 90% of spending"
        </motion.div>
        
        <motion.div
          className="absolute top-[20%] right-[5%] text-2xl font-['Sentient'] text-[#41616f] px-4 cursor-pointer"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 50 }}
          whileHover={{ scale: 1.05, rotate: "1deg" }}
        >
          Know your triggers
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center mx-auto shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/expense")}
          >
            Start Your Emotional Analysis
            <FaArrowRight className="ml-3" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default EmotionalAnalysis;