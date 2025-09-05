import { motion } from "framer-motion";
import { FaArrowRight, FaChartPie, FaMoneyBillWave, FaPiggyBank, FaShieldAlt, FaRegSmileBeam, FaRegChartBar, FaRegLightbulb } from 'react-icons/fa';
import { IoAnalyticsSharp, IoWalletSharp, IoStatsChart } from 'react-icons/io5';
import { GiPayMoney, GiReceiveMoney, GiMoneyStack } from 'react-icons/gi';
import { RiSecurePaymentLine, RiExchangeDollarLine } from 'react-icons/ri';


const ExpenseInsights = ({ navigate }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const values = [45, 60, 35, 70, 50, 65];
  return (
    <section id="expense-insights" className="min-h-screen bg-gradient-to-br from-[#F5EFFF] to-[#f0e6ff]  overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-5 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-7xl relative min-h-screen flex flex-col justify-center py-16">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="inline-block mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm text-[#6d28d9] font-medium shadow-lg border border-[#d8b4fe] hover:border-[#a855f7] transition-all group"
              whileHover={{ 
                boxShadow: "0 10px 25px rgba(109, 40, 217, 0.15)"
              }}
            >
              <motion.span
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
                className="inline-block mr-3"
              >
                ✨
              </motion.span>
              Intelligent Financial Management
              <FaArrowRight className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.span>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6d28d9] to-[#a855f7]">
              Transform
            </span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ec4899] to-[#f97316]">
              Your Financial
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#10b981] to-[#0ea5e9]">
              Journey
            </span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-[#4b5563] text-left max-w-3xl mx-auto font-medium mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            AI-powered financial insights that help you understand spending patterns, optimize savings, and achieve your money goals with confidence.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-[#6d28d9] to-[#a855f7] text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center shadow-lg hover:shadow-purple-200"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px rgba(109, 40, 217, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/emotion")}
            >
              Start The Game 🤸
              <FaArrowRight className="ml-3" />
            </motion.button>
            
            
          </motion.div>
        </motion.div>
        
      
        
        {/* Feature Showcase */}
        <div className="mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#374151]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Powerful Features for <span className="text-[#6d28d9]">Financial Mastery</span>
          </motion.h2>
          
          <motion.p 
            className="text-center text-[#6b7280] max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Everything you need to take control of your finances in one beautiful platform
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
             
              {
                title: "Savings Goals",
                description: "Set and track progress toward financial targets with ease",
                icon: <FaPiggyBank className="text-4xl" />,
                color: "text-[#f59e0b]",
                bg: "bg-[#fffbeb]",
                border: "border-[#fde68a]"
              },
              {
                title: "Investment Tracking",
                description: "Monitor your portfolio performance in real-time",
                icon: <GiMoneyStack className="text-4xl" />,
                color: "text-[#0ea5e9]",
                bg: "bg-[#f0f9ff]",
                border: "border-[#bae6fd]"
              },
              {
                title: "Security First",
                description: "Bank-level encryption to keep your financial data safe",
                icon: <RiSecurePaymentLine className="text-4xl" />,
                color: "text-[#6366f1]",
                bg: "bg-[#eef2ff]",
                border: "border-[#c7d2fe]"
              },
            
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`${feature.bg} ${feature.border} rounded-3xl h-60 p-6 border shadow-2xl transition-all relative overflow-hidden group cursor-pointer`}
                whileHover={{ y: -8 }}
              >
                {/* Decorative Corner */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200 rounded-full opacity-20 -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200 rounded-full opacity-20 -ml-32 -mb-32"></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-5  ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1f2937] mb-3">{feature.title}</h3>
                  <p className="text-[#6b7280] mb-6">{feature.description}</p>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent my-4"></div>
                 
                </div>
              </motion.div>
            ))}
          </div>
        </div>


{/* chart */}
<motion.div
  className="relative bg-gradient-to-br from-[#fdfcfe] to-[#f5f3ff] rounded-4xl p-6 md:p-10 shadow-2xl overflow-hidden border border-[#e9d5ff]"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1 }}
  viewport={{ once: true, margin: "-100px" }}
>
  {/* Layered Background Shapes */}
  <div className="absolute -top-32 -left-32 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full bg-gradient-to-r from-[#6d28d9]/10 to-[#ec4899]/10 blur-3xl animate-pulse-slow"></div>
  <div className="absolute -bottom-40 -right-40 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-gradient-to-r from-[#10b981]/10 to-[#0ea5e9]/10 blur-3xl"></div>

  <div className="flex flex-col lg:flex-row items-center relative z-10 gap-8 md:gap-12">
    {/* Left Section: Text + Stats */}
    <div className="w-full lg:w-1/2 space-y-6">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1f2937] leading-tight"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6d28d9] to-[#a855f7]">
          Beautiful Financial
        </span>{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ec4899] to-[#f97316]">
          Visualizations
        </span>
      </motion.h2>

      <motion.p
        className="text-gray-500 text-sm sm:text-base md:text-lg"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        Transform raw financial data into interactive dashboards and intuitive visual stories that reveal your money flow at a glance.
      </motion.p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {[
          { title: "Spending Trends", value: "12.4% ↓", color: "text-[#10b981]", icon: <IoStatsChart className="text-3xl" />, desc: "Lower than last month" },
          { title: "Savings Rate", value: "18.7% ↑", color: "text-[#0ea5e9]", icon: <GiReceiveMoney className="text-3xl" />, desc: "Increased by 3.2%" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="p-4 md:p-5 rounded-2xl border border-[#e2e8f0] shadow-lg bg-white hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className={`${stat.color} mb-2 md:mb-3`}>{stat.icon}</div>
            <h4 className="text-gray-800 font-semibold mb-1">{stat.title}</h4>
            <p className={`${stat.color} font-bold text-xl md:text-2xl mb-1`}>{stat.value}</p>
            <p className="text-gray-400 text-xs md:text-sm">{stat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Right Section: Animated Chart */}
    <div className="relative w-full sm:w-[500px] md:w-[550px] h-[300px] sm:h-[350px] md:h-[400px] bg-[#f8fafc] rounded-3xl border border-[#e2e8f0] p-4 md:p-6 shadow-lg flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="font-semibold text-gray-700 text-sm md:text-base">Monthly Spending Overview</h3>
        <span className="text-xs md:text-sm text-[#6d28d9] font-medium">2023</span>
      </div>

      {/* Bars */}
      <div className="flex h-full items-end gap-2 sm:gap-3 relative">
        {months.map((month, i) => (
          <div key={month} className="flex-1 flex flex-col items-center justify-end h-full relative group">
            {/* Animated Bar */}
            <motion.div
              className={`w-full rounded-t-3xl ${i % 2 === 0 ? 'bg-gradient-to-t from-[#6d28d9] to-[#a855f7]' : 'bg-gradient-to-t from-[#ec4899] to-[#f97316]'} shadow-md`}
              initial={{ height: 0 }}
              animate={{ height: `${values[i]}%` }}
              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
            />

            {/* Hover Tooltip */}
            <div className="absolute -top-6 md:-top-8 bg-white text-gray-800 text-xs md:text-sm font-medium px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
              {values[i]}%
            </div>

            {/* Month Label */}
            <span className="text-gray-400 text-[9px] sm:text-xs md:text-xs mt-1">{month}</span>
          </div>
        ))}
      </div>

      {/* Floating Indicators */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${i % 2 === 0 ? 'bg-[#6d28d9]/20' : 'bg-[#ec4899]/20'}`}
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: Math.random() * 0.5 }}
        />
      ))}
    </div>
  </div>
</motion.div>

     

        {/* Final CTA */}
       <motion.div
  className="text-center mb-24 mt-16"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1.2 }}
  viewport={{ once: true, margin: "-100px" }}
>
  <motion.h2
    className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, margin: "-50px" }}
  >
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
      A new perspective on
    </span>
    <br />
<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6dd5ed] via-[#8e44ad] to-[#f48fb1] font-semibold drop-shadow-md">
  financial intelligence.
</span>



  </motion.h2>
  
  <motion.p
    className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-light tracking-wide leading-relaxed"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, margin: "-50px" }}
  >
    Discover what happens when thoughtful design meets financial intelligence.
  </motion.p>
  
  <motion.div
    className="flex flex-col sm:flex-row justify-center gap-5 items-center"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.6 }}
    viewport={{ once: true, margin: "-50px" }}
  >
    
    
     <a
          href="/emotion"
          className="relative inline-block mb-20 px-12 py-5 bg-gradient-to-l from-pink-300 to-red-200 rounded-3xl text-2xl font-extralight tracking-wide text-gray-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 overflow-hidden group"
        >
           Explore Now 🎯🎯
          <span className="absolute inset-0 -z-10"></span>
          <span className="absolute inset-0 rounded-3xl border-2 border-white/40 group-hover:border-white/60 animate-pulse"></span>
        </a>
  </motion.div>
  

  
  
</motion.div>
      </div>
      

       <div className="absolute bottom-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-40">
          <path fill='#2c303d' d="M0,64L48,74.7C96,85,192,107,288,133.3C384,160,480,192,576,176C672,160,768,96,864,96C960,96,1056,160,1152,176C1248,192,1344,160,1392,144L1440,128L1440,0L0,0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default ExpenseInsights;