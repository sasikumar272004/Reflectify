import { motion } from "framer-motion";
import { FaRegGem } from 'react-icons/fa';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { GiBrain } from 'react-icons/gi';
import { BiTrendingUp } from 'react-icons/bi';
import FloatingBlob from "../common/FloatingBlob";

const Transformation = () => {
  return (
    <section id="transformation" className="py-28 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingBlob size={800} color="bg-indigo-300" initialX={-300} initialY={-200} duration={20} />
        <FloatingBlob size={600} color="bg-purple-300" initialX={800} initialY={100} duration={25} delay={5} />
        <FloatingBlob size={500} color="bg-pink-300" initialX={400} initialY={300} duration={18} delay={3} />
      </div>
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span 
            className="inline-flex items-center px-5 py-2 rounded-full bg-indigo-100 text-indigo-600 font-medium mb-8 shadow-sm"
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
              🦋
            </motion.span>
            Your Transformation Journey
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            From Awareness to Financial Freedom
          </h2>
          
          <motion.p
            className="text-xl text-slate-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Discover how Reflectify users have transformed their financial lives through emotional awareness.
          </motion.p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <motion.div 
              className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-indigo-300 to-purple-300 -translate-x-1/2"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            />
            
            <div className="space-y-24">
              {[
                {
                  step: "1",
                  title: "Emotional Awareness",
                  description: "Recognize your emotional spending triggers and patterns",
                  icon: <MdOutlineEmojiEmotions className="text-2xl" />,
                  color: "from-indigo-400 to-purple-400"
                },
                {
                  step: "2",
                  title: "Behavioral Insights",
                  description: "Understand the psychology behind your financial decisions",
                  icon: <GiBrain className="text-2xl" />,
                  color: "from-purple-400 to-pink-400",
                  reverse: true
                },
                {
                  step: "3",
                  title: "Positive Change",
                  description: "Implement healthy financial habits based on your unique psychology",
                  icon: <BiTrendingUp className="text-2xl" />,
                  color: "from-pink-400 to-rose-400"
                },
                {
                  step: "4",
                  title: "Financial Freedom",
                  description: "Achieve peace of mind and control over your finances",
                  icon: <FaRegGem className="text-2xl" />,
                  color: "from-rose-400 to-amber-400",
                  reverse: true
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex ${item.reverse ? 'flex-row-reverse' : ''} items-center`}
                  initial={{ opacity: 0, x: item.reverse ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className={`w-1/2 ${item.reverse ? 'pr-12' : 'pl-12'}`}>
                    <motion.div
                      className={`p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow ${item.reverse ? 'text-right' : 'text-left'}`}
                      whileHover={{ 
                        y: -5,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                    >
                      <motion.div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 ${item.reverse ? 'ml-auto' : 'mr-auto'}`}
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
                        {item.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-slate-600 mb-6">{item.description}</p>
                      <div className={`flex ${item.reverse ? 'justify-end' : 'justify-start'}`}>
                        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
                          Step {item.step}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl relative z-10 mx-auto">
                    {item.step}
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transformation;