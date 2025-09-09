import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  FiUser, FiLogOut, FiSettings, FiPieChart, 
  FiHeart, FiDollarSign, FiBarChart2, FiHome,
  FiMenu, FiX, FiChevronDown, FiChevronUp, FiCalendar,
  FiTrendingUp, FiTrendingDown, FiPlus, FiCreditCard
} from "react-icons/fi";
import { RiMentalHealthLine } from "react-icons/ri";
import { BsGraphUp, BsLightningCharge, BsPieChart } from "react-icons/bs";
import { TbMoodHappy, TbMoodNeutral, TbMoodSad } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiChevronRight } from "react-icons/bi";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Sidebar  from "../components/layout/ProfileSub/SideBar";
import EmotionInfo from "../components/layout/ProfileSub/EmotionInfo";
import ExpenseInfo from "../components/layout/ProfileSub/Expenseinfo";
import Settings from "../components/layout/ProfileSub/Setttings";

const Profile = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expandedCard, setExpandedCard] = useState(null);
  const [userData, setUserData] = useState(null);
  const [moodData, setMoodData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: containerRef
  });
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  // Generate dynamic data
  const generateMockData = () => {
    // Generate mood data for last 7 days
    const moods = ["happy", "neutral", "sad"];
    const moodEntries = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const mood = moods[Math.floor(Math.random() * moods.length)];
      const intensity = mood === "happy" ? 
        Math.floor(Math.random() * 4) + 6 : 
        mood === "sad" ? 
        Math.floor(Math.random() * 3) + 1 : 
        Math.floor(Math.random() * 3) + 4;
      
      const notes = {
        happy: ["Had a great day", "Finished project", "Met with friends", "Received good news"],
        neutral: ["Regular work day", "Nothing special", "Quiet day at home"],
        sad: ["Missed appointment", "Feeling tired", "Argument with friend"]
      };
      
      moodEntries.push({
        date: date.toISOString().split('T')[0],
        mood,
        intensity,
        note: notes[mood][Math.floor(Math.random() * notes[mood].length)]
      });
    }
    
    // Generate expense data for last 5 days
    const categories = ["Food", "Transport", "Entertainment", "Shopping", "Utilities"];
    const expenseEntries = [];
    
    for (let i = 4; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const category = categories[Math.floor(Math.random() * categories.length)];
      const amount = Math.floor(Math.random() * 100) + 10;
      
      const notes = {
        Food: ["Lunch out", "Grocery shopping", "Dinner with friends"],
        Transport: ["Taxi ride", "Bus pass", "Gas refill"],
        Entertainment: ["Movie tickets", "Concert", "Museum visit"],
        Shopping: ["New clothes", "Electronics", "Home decor"],
        Utilities: ["Electric bill", "Internet payment", "Water bill"]
      };
      
      expenseEntries.push({
        id: i + 1,
        category,
        amount,
        date: date.toISOString().split('T')[0],
        note: notes[category][Math.floor(Math.random() * notes[category].length)]
      });
    }
    
    return { moodEntries, expenseEntries };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/register");
          return;
        }

        // Generate dynamic mock data
        const { moodEntries, expenseEntries } = generateMockData();

        const mockUser = {
          name: "Alex Johnson",
          email: "alex.johnson@example.com",
          avatar: "",
          joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6).toISOString().split('T')[0] // 6 months ago
        };

        setUserData(mockUser);
        setMoodData(moodEntries);
        setExpenseData(expenseEntries);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, activeSection]); // Re-fetch when section changes

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/register");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const features = [
    {
      id: 1,
      title: "Expense Analytics",
      description: "Detailed breakdown of your spending patterns with AI-powered insights",
      icon: <FiDollarSign className="text-2xl" />,
      color: "bg-gradient-to-br from-amber-50 to-amber-100",
      action: () => setActiveSection("expenses"),
      animationDelay: 0.1
    },
    {
      id: 2,
      title: "Emotion Tracker",
      description: "Understand your emotional patterns through journal entries and mood tracking",
      icon: <RiMentalHealthLine className="text-2xl" />,
      color: "bg-gradient-to-br from-lime-50 to-lime-100",
      action: () => setActiveSection("emotions"),
      animationDelay: 0.2
    }
  ];

  const moodChartData = moodData.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    intensity: entry.intensity,
    mood: entry.mood
  }));

  const expenseChartData = [
    { name: 'Food', value: expenseData.filter(e => e.category === 'Food').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Transport', value: expenseData.filter(e => e.category === 'Transport').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Entertainment', value: expenseData.filter(e => e.category === 'Entertainment').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Shopping', value: expenseData.filter(e => e.category === 'Shopping').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Utilities', value: expenseData.filter(e => e.category === 'Utilities').reduce((sum, e) => sum + e.amount, 0) },
  ].filter(item => item.value > 0);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getMoodIcon = (mood) => {
    switch (mood) {
      case 'happy': return <TbMoodHappy className="text-2xl text-lime-600" />;
      case 'sad': return <TbMoodSad className="text-2xl text-rose-600" />;
      default: return <TbMoodNeutral className="text-2xl text-amber-600" />;
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'happy': return 'bg-lime-100 text-lime-800';
      case 'sad': return 'bg-rose-100 text-rose-800';
      default: return 'bg-amber-100 text-amber-800';
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

 

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col md:flex-row overflow-hidden">
    

      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <motion.header 
          style={{ opacity }}
          className="bg-white shadow-sm p-4 sticky top-0 z-30"
        >
          <div className="flex justify-between items-center">
            <motion.h2 
              key={activeSection}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-medium capitalize"
            >
              {activeSection}
            </motion.h2>
            <div className="flex items-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-stone-100 relative"
              >
                <IoMdNotificationsOutline className="text-stone-600 text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </motion.button>
              <div className="relative">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-medium"
                >
                  {userData?.name.charAt(0)}
                </motion.button>
                
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-40 overflow-hidden"
                    >
                      <div className="p-4 border-b border-stone-200">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-medium mr-3">
                            {userData?.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium">{userData?.name}</h3>
                            <p className="text-sm text-stone-500">{userData?.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button 
                          onClick={() => {
                            setActiveSection("settings");
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 rounded-lg"
                        >
                          <FiUser className="mr-3" />
                          Profile Settings
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 rounded-lg"
                        >
                          <FiLogOut className="mr-3" />
                          Log Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <main 
          ref={containerRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 bg-stone-50"
        >
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-stone-100 to-amber-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-stone-200 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-full opacity-20 -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime-200 rounded-full opacity-20 -ml-32 -mb-32"></div>
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <motion.h1 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl font-medium mb-2"
                      >
                        Welcome back, <span className="text-amber-600">{userData?.name.split(' ')[0]}!</span>
                      </motion.h1>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-stone-600 text-sm md:text-base max-w-2xl"
                      >
                        Your personal wellbeing dashboard is ready. Track expenses, analyze emotions, 
                        and discover patterns with our AI-powered insights.
                      </motion.p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 md:mt-0 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-md hover:shadow-lg transition text-sm md:text-base"
                    >
                      Get Started
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                    className={`${feature.color} rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm cursor-pointer hover:shadow-md transition border border-white border-opacity-50`}
                    onClick={feature.action}
                  >
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <motion.div 
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white bg-opacity-50 flex items-center justify-center backdrop-blur-sm"
                      >
                        {feature.icon}
                      </motion.div>
                      <div className="text-xl md:text-2xl font-bold text-stone-400">{index + 1}</div>
                    </div>
                    <h3 className="text-base md:text-lg font-medium mb-1 md:mb-2">{feature.title}</h3>
                    <p className="text-stone-600 text-xs md:text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Analytics Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Mood Tracking Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-stone-200"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6">
                    <div className="mb-2 md:mb-0">
                      <h3 className="text-base md:text-lg font-medium">Mood Tracking</h3>
                      <p className="text-xs md:text-sm text-stone-500">Your emotional patterns this week</p>
                    </div>
                    <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
                      <div className="flex items-center shrink-0">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-lime-500 mr-1"></div>
                        <span className="text-xs">Happy</span>
                      </div>
                      <div className="flex items-center shrink-0">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-amber-500 mr-1"></div>
                        <span className="text-xs">Neutral</span>
                      </div>
                      <div className="flex items-center shrink-0">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-rose-500 mr-1"></div>
                        <span className="text-xs">Sad</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-48 md:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={moodChartData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorHappy" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#84cc16" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="intensity" 
                          stroke="#84cc16" 
                          fillOpacity={1} 
                          fill="url(#colorHappy)" 
                          name="Happy"
                          stackId="1"
                          hide={moodChartData.filter(d => d.mood === 'happy').length === 0}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="intensity" 
                          stroke="#f59e0b" 
                          fillOpacity={1} 
                          fill="url(#colorNeutral)" 
                          name="Neutral"
                          stackId="1"
                          hide={moodChartData.filter(d => d.mood === 'neutral').length === 0}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="intensity" 
                          stroke="#ef4444" 
                          fillOpacity={1} 
                          fill="url(#colorSad)" 
                          name="Sad"
                          stackId="1"
                          hide={moodChartData.filter(d => d.mood === 'sad').length === 0}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-3 md:mt-4">
                    <h4 className="text-xs md:text-sm font-medium mb-1 md:mb-2">Recent Mood Entries</h4>
                    <div className="space-y-1 md:space-y-2">
                      {moodData.slice(0, 3).map((entry, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ x: 5 }}
                          className="flex items-center p-2 md:p-3 bg-stone-50 rounded-lg"
                        >
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${getMoodColor(entry.mood)} flex items-center justify-center mr-2 md:mr-3`}>
                            {getMoodIcon(entry.mood)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <span className="text-sm md:text-base font-medium capitalize truncate">{entry.mood}</span>
                              <span className="text-xs text-stone-500 shrink-0 ml-2">{formatDate(entry.date)}</span>
                            </div>
                            <p className="text-xs md:text-sm text-stone-600 truncate">{entry.note}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Expense Tracking Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-stone-200"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6">
                    <div className="mb-2 md:mb-0">
                      <h3 className="text-base md:text-lg font-medium">Expense Tracking</h3>
                      <p className="text-xs md:text-sm text-stone-500">Your spending this week</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm md:text-base font-medium">
                        Total: {formatCurrency(expenseData.reduce((sum, e) => sum + e.amount, 0))}
                      </span>
                    </div>
                  </div>
                  <div className="h-48 md:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      {expenseChartData.length > 0 ? (
                        <PieChart>
                          <Pie
                            data={expenseChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={60}
                            innerRadius={30}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {expenseChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      ) : (
                        <div className="h-full flex items-center justify-center text-stone-400">
                          No expense data available
                        </div>
                      )}
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-3 md:mt-4">
                    <h4 className="text-xs md:text-sm font-medium mb-1 md:mb-2">Recent Expenses</h4>
                    <div className="space-y-1 md:space-y-2">
                      {expenseData.slice(0, 3).map((expense) => (
                        <motion.div
                          key={expense.id}
                          whileHover={{ x: 5 }}
                          className="flex items-center justify-between p-2 md:p-3 bg-stone-50 rounded-lg"
                        >
                          <div className="flex items-center min-w-0">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-stone-100 flex items-center justify-center mr-2 md:mr-3 shrink-0">
                              <FiCreditCard className="text-stone-600 text-sm md:text-base" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm md:text-base font-medium truncate">{expense.category}</div>
                              <div className="text-xs md:text-sm text-stone-600 truncate">{expense.note}</div>
                            </div>
                          </div>
                          <div className="text-right shrink-0 ml-2">
                            <div className="text-sm md:text-base font-medium text-rose-600">-{formatCurrency(expense.amount)}</div>
                            <div className="text-xs text-stone-500">{formatDate(expense.date)}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-stone-200"
              >
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <div>
                    <h3 className="text-base md:text-lg font-medium">Recent Activity</h3>
                    <p className="text-xs md:text-sm text-stone-500">Your latest actions and updates</p>
                  </div>
                  <button className="text-xs md:text-sm text-amber-600 hover:text-amber-700">
                    View All
                  </button>
                </div>
                <div className="space-y-2 md:space-y-4">
                  {[
                    {
                      id: 1,
                      type: 'expense',
                      title: 'Added new expense',
                      description: expenseData.length > 0 ? 
                        `${expenseData[0].category} - ${formatCurrency(expenseData[0].amount)}` : 
                        'No recent expenses',
                      time: 'Today',
                      icon: <FiDollarSign className="text-amber-600" />
                    },
                    {
                      id: 2,
                      type: 'mood',
                      title: 'Logged mood',
                      description: moodData.length > 0 ? 
                        `Feeling ${moodData[0].mood} - ${moodData[0].note}` : 
                        'No recent mood entries',
                      time: 'Today',
                      icon: moodData.length > 0 ? 
                        getMoodIcon(moodData[0].mood) : 
                        <TbMoodNeutral className="text-amber-600" />
                    },
                    {
                      id: 3,
                      type: 'goal',
                      title: 'Goal progress',
                      description: 'Saved 15% of monthly goal',
                      time: '1 day ago',
                      icon: <BsGraphUp className="text-sky-600" />
                    }
                  ].map((activity) => (
                    <motion.div
                      key={activity.id}
                      whileHover={{ backgroundColor: 'rgba(250, 250, 250, 1)' }}
                      className="flex items-start p-2 md:p-3 rounded-lg hover:bg-stone-50"
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-stone-100 flex items-center justify-center mr-2 md:mr-3 mt-1 shrink-0">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm md:text-base font-medium truncate">{activity.title}</h4>
                          <span className="text-xs text-stone-500 shrink-0 ml-2">{activity.time}</span>
                        </div>
                        <p className="text-xs md:text-sm text-stone-600 truncate">{activity.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {activeSection === "expenses" && (
            <ExpenseInfo 
              expenseData={expenseData}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          )}

          {/* Emotions Section */}
          {activeSection === "emotions" && (
            <EmotionInfo
              moodData={moodData}
              moodChartData={moodChartData}
              formatDate={formatDate}
              getMoodIcon={getMoodIcon}
              getMoodColor={getMoodColor}
            />
          )}


         

         {activeSection === "settings" && (
            <Settings
              userData={userData}
            />
          )}

</main>
</div>
</div>
);
};

export default Profile;