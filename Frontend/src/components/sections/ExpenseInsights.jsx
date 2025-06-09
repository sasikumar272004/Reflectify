import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';
import { BsGraphUp } from 'react-icons/bs';
import { IoMdAnalytics } from 'react-icons/io';
import { TbPigMoney } from 'react-icons/tb';
import FloatingBlob from "../common/FloatingBlob";

const ExpenseInsights = ({ navigate }) => {
  return (
    <section id="expense-insights" className="min-h-screen p-10 relative bg-gradient-to-b from-[#e6edee] via-[#f2f7fb] to-[#f6eff8] overflow-hidden">
      {/* Background SVG Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Wave 1 - Diagonal */}
        <motion.svg 
          viewBox="0 0 500 100" 
          className="absolute top-[10%] left-0 w-full opacity-10"
          initial={{ opacity: 0, pathLength: 0 }}
          whileInView={{ opacity: 0.1, pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          viewport={{ once: true, margin: "-20%" }}
        >
          <path 
            d="M0,50 C150,10 350,90 500,50" 
            stroke="#7c3aed" 
            strokeWidth="1.5" 
            fill="none"
            strokeDasharray="12 6"
          />
        </motion.svg>

        {/* Wave 2 - Curved */}
        <motion.svg 
          viewBox="0 0 300 100" 
          className="absolute bottom-[15%] right-[5%] w-[400px] opacity-10"
          initial={{ opacity: 0, pathLength: 0 }}
          whileInView={{ opacity: 0.1, pathLength: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
          viewport={{ once: true, margin: "-20%" }}
        >
          <path 
            d="M0,50 Q150,0 300,50" 
            stroke="#0ea5e9" 
            strokeWidth="1.2" 
            fill="none"
            strokeDasharray="8 4"
          />
        </motion.svg>

        

        {/* Zigzag Path */}
        <motion.svg
          viewBox="0 0 200 50"
          className="absolute bottom-[25%] left-[0%] w-[300px] opacity-10"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true, margin: "-20%" }}
        >
          <motion.path
            d="M0,25 L50,5 L100,45 L150,5 L200,25"
            stroke="#7c3aed"
            strokeWidth="1.2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
            viewport={{ once: true }}
          />
        </motion.svg>

        {/* Floating Blobs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true, margin: "-20%" }}
        >
          <FloatingBlob 
            size="xl" 
            color="rgba(124, 58, 237, 0.05)" 
            className="top-[15%] right-[20%]" 
            style={{ filter: "blur(80px)" }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true, margin: "-20%" }}
        >
          <FloatingBlob 
            size="lg" 
            color="rgba(14, 165, 233, 0.05)" 
            className="bottom-[25%] left-[20%]" 
            style={{ filter: "blur(90px)" }}
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative min-h-screen flex flex-col justify-center">
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
              💰
            </motion.span>
            Financial Intelligence
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#1e3a8a]">
            Smart <span className="text-[#0ea5e9]">Expense Tracking</span> & Analysis
          </h2>
          
          <motion.p
            className="text-xl text-[#1f646b] max-w-3xl mx-auto font-['Sentient']"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Track your spending, categorize transactions, and receive AI-powered insights to optimize your financial health.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
           
            {
              title: "Smart Categorization",
              description: "AI automatically categorizes your transactions",
              icon: <IoMdAnalytics className="text-3xl" />,
              color: "from-indigo-500 to-blue-500"
            },
            {
              title: "Savings Optimization",
              description: "Personalized recommendations to save more",
              icon: <TbPigMoney className="text-3xl" />,
              color: "from-blue-500 to-teal-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-100 hover:border-violet-200 transition-all hover:shadow-xl"
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <motion.div 
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg`}
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: index * 0.5
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-[#1e3a8a]">{feature.title}</h3>
              <p className="text-[#526f6e] mb-6">{feature.description}</p>
              <motion.div 
                className="w-full h-1 rounded-full bg-slate-200 overflow-hidden"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className={`h-full bg-gradient-to-r ${feature.color}`}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Floating Text Elements */}
        <motion.div
          className="absolute bottom-[10%] left-[5%] text-2xl font-['Sentient'] text-[#526f6e] px-4 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 50 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotate: "-1deg" }}
        >
          "Track every penny effortlessly"
        </motion.div>
        
        <motion.div
          className="absolute top-[20%] right-[5%] text-2xl font-['Sentient'] text-[#41616f] px-4 cursor-pointer"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 50 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotate: "1deg" }}
        >
          AI-powered categorization
        </motion.div>

        {/* CTA Button */}
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
            onClick={() => navigate("/emotion")}
          >
            Explore Expense Tracker
            <FaArrowRight className="ml-3" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpenseInsights;