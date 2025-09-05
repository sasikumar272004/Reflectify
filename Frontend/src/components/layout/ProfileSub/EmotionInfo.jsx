import { motion } from "framer-motion";
import { FiPlus, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { RiMentalHealthLine } from "react-icons/ri";
import { BsLightningCharge } from "react-icons/bs";
import { TbMoodHappy, TbMoodNeutral, TbMoodSad } from "react-icons/tb";
import { BiChevronRight } from "react-icons/bi";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Array of SVG path data for morphing background
const svgPaths = [
  "M0,0 C20,50 40,30 60,70 S100,50 100,100 L100,0 Z",
  "M0,0 C30,40 50,10 70,60 S80,30 100,80 L100,0 Z",
  "M0,0 C10,60 30,20 50,80 S90,40 100,100 L100,0 Z",
  "M0,0 C40,30 20,70 60,50 S70,20 100,60 L100,0 Z"
];

const EmotionInfo = ({ moodData, moodChartData, formatDate, getMoodIcon, getMoodColor }) => {
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [gradientRotation, setGradientRotation] = useState(0);
  const navigate = useNavigate();
  // Cycle through SVG paths for morphing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPathIndex((prev) => (prev + 1) % svgPaths.length);
      setGradientRotation((prev) => (prev + 5) % 360);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative space-y-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-[0.03]">
        <motion.svg 
          className="w-full h-full"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          animate={{ 
            d: svgPaths[currentPathIndex],
            transition: { duration: 4, ease: "easeInOut" }
          }}
          initial={false}
        >
          <path 
            d={svgPaths[currentPathIndex]} 
            fill={`hsl(${gradientRotation}, 70%, 50%)`}
          />
        </motion.svg>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute -z-10 rounded-full"
          style={{
            background: `hsl(${Math.random() * 360}, 70%, 80%)`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.1
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 50],
            x: [0, (Math.random() - 0.5) * 30],
            transition: {
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        />
      ))}

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex flex-col md:flex-row md:items-center md:justify-between bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-white/20 overflow-hidden"
      >
        {/* Header background gradient */}
        <div 
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            background: `linear-gradient(${gradientRotation}deg, rgba(132,204,22,0.2), rgba(20,184,166,0.2), rgba(168,85,247,0.2))`
          }}
        />
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-teal-500">
            Emotional Wellbeing
          </h1>
          <p className="text-stone-600/90 text-sm md:text-base max-w-lg">
            Track and understand your emotional patterns with our advanced mood analytics
          </p>
        </div>
        
        <motion.button
        onClick={()=> navigate('/expense')}
          whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(101, 163, 13, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="relative z-10 mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-lime-500 to-lime-600 text-white rounded-xl shadow-lg hover:shadow-lime-200/50 transition-all text-base font-medium flex items-center"
        >
          <FiPlus className="mr-2 text-lg" />
          Log Mood
        </motion.button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {[
          {
            title: "Current Mood",
            value: moodData.length > 0 ? moodData[moodData.length - 1].mood : "N/A",
            icon: moodData.length > 0 ? getMoodIcon(moodData[moodData.length - 1].mood) : <TbMoodNeutral className="text-2xl" />,
            color: moodData.length > 0 ? 
              (moodData[moodData.length - 1].mood === 'happy' ? 'from-lime-100/80 to-lime-200/50' :
               moodData[moodData.length - 1].mood === 'sad' ? 'from-rose-100/80 to-rose-200/50' :
               'from-amber-100/80 to-amber-200/50') :
              'from-stone-100/80 to-stone-200/50',
            borderColor: moodData.length > 0 ?
              (moodData[moodData.length - 1].mood === 'happy' ? 'border-lime-200/50' :
               moodData[moodData.length - 1].mood === 'sad' ? 'border-rose-200/50' :
               'border-amber-200/50') :
              'border-stone-200/50'
          },
          {
            title: "Average Mood",
            value: moodData.length > 0 ? 
              (moodData.reduce((sum, m) => sum + m.intensity, 0) / moodData.length).toFixed(1) + "/10" : 
              "N/A",
            change: "+0.5",
            trend: "up",
            icon: <RiMentalHealthLine className="text-2xl" />,
            color: "from-blue-100/80 to-blue-200/50",
            borderColor: "border-blue-200/50"
          },
          {
            title: "Happy Days",
            value: moodData.filter(m => m.mood === 'happy').length,
            icon: <TbMoodHappy className="text-2xl" />,
            color: "from-lime-100/80 to-lime-200/50",
            borderColor: "border-lime-200/50"
          },
          {
            title: "Productivity Score",
            value: "72%",
            change: "+5%",
            trend: "up",
            icon: <BsLightningCharge className="text-2xl" />,
            color: "from-purple-100/80 to-purple-200/50",
            borderColor: "border-purple-200/50"
          }
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`bg-gradient-to-br ${card.color} backdrop-blur-sm rounded-2xl p-6 shadow-sm border ${card.borderColor} border-opacity-50 relative overflow-hidden`}
          >
            {/* Card decorative element */}
            <div 
              className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-20 blur-xl"
              style={{
                background: card.trend === "up" ? 
                  "radial-gradient(circle, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0) 70%)" :
                  card.trend === "down" ?
                  "radial-gradient(circle, rgba(239,68,68,0.5) 0%, rgba(239,68,68,0) 70%)" :
                  "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0) 70%)"
              }}
            />
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-xs md:text-sm text-stone-600/90 mb-1">{card.title}</p>
                <h3 className="text-xl md:text-2xl font-medium mb-2 capitalize">{card.value}</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center backdrop-blur-sm shadow-inner">
                {card.icon}
              </div>
            </div>
            
            {card.change && (
              <div className="relative z-10 flex items-center">
                {card.trend === "up" ? (
                  <FiTrendingUp className="text-green-500 mr-1" />
                ) : (
                  <FiTrendingDown className="text-rose-500 mr-1" />
                )}
                <span className={`text-xs ${card.trend === "up" ? "text-green-600/90" : "text-rose-600/90"}`}>
                  {card.change} from last week
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Mood Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden"
      >
        {/* Chart background */}
        <div 
          className="absolute inset-0 -z-10 opacity-10"
          style={{
            background: `linear-gradient(${gradientRotation}deg, rgba(132,204,22,0.05), rgba(20,184,166,0.05), rgba(168,85,247,0.05))`
          }}
        />
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h3 className="text-lg md:text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-teal-500">
              Mood Trends
            </h3>
            <p className="text-sm text-stone-600/90">Your emotional patterns over time</p>
          </div>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <button className="px-3 py-1 text-xs bg-white/70 rounded-lg shadow-inner">Week</button>
            <button className="px-3 py-1 text-xs bg-white/30 rounded-lg">Month</button>
            <button className="px-3 py-1 text-xs bg-white/30 rounded-lg">Year</button>
          </div>
        </div>
        
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={moodChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHappy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#84cc16" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#84cc16" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorSad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="intensity" 
                stroke="#84cc16" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorHappy)" 
                stackId="1"
                hide={moodChartData.filter(d => d.mood === 'happy').length === 0}
              />
              <Area 
                type="monotone" 
                dataKey="intensity" 
                stroke="#f59e0b" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorNeutral)" 
                stackId="1"
                hide={moodChartData.filter(d => d.mood === 'neutral').length === 0}
              />
              <Area 
                type="monotone" 
                dataKey="intensity" 
                stroke="#ef4444" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorSad)" 
                stackId="1"
                hide={moodChartData.filter(d => d.mood === 'sad').length === 0}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Journal */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden relative"
      >
        {/* Journal background */}
        <div 
          className="absolute inset-0 -z-10 opacity-10"
          style={{
            background: `linear-gradient(${gradientRotation}deg, rgba(132,204,22,0.05), rgba(20,184,166,0.05), rgba(168,85,247,0.05))`
          }}
        />
        
        <div className="p-6 border-b border-white/20">
          <h3 className="text-lg md:text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-teal-500">
            Mood Journal
          </h3>
        </div>
        
        <div className="divide-y divide-white/20">
          {moodData.length > 0 ? (
            moodData.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                className="p-6 hover:shadow-inner transition-all"
              >
                <div className="flex items-start">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 rounded-full ${getMoodColor(entry.mood)} flex items-center justify-center mr-4 shrink-0 shadow-inner`}
                  >
                    {getMoodIcon(entry.mood)}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-base font-medium capitalize">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-teal-500">
                          {entry.mood}
                        </span> - {entry.intensity}/10
                      </h4>
                      <span className="text-xs text-stone-500/90 shrink-0 ml-2">
                        {formatDate(entry.date)}
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-stone-600/90 mb-3">
                      {entry.note}
                    </p>
                    <div className="flex items-center space-x-3">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs px-3 py-1 bg-white/70 rounded-lg shadow-inner"
                      >
                        Edit
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs px-3 py-1 bg-white/70 rounded-lg shadow-inner"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-8 text-center text-stone-500/90">
              No mood entries yet. Click "Log Mood" to add your first entry.
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-white/20 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 text-sm text-lime-600/90 hover:text-lime-700 flex items-center font-medium"
          >
            View All Entries <BiChevronRight className="ml-1 text-lg" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmotionInfo;