import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, FiLogOut, FiSettings, FiPieChart, 
  FiHeart, FiDollarSign, FiBarChart2, FiHome,
  FiMenu, FiX, FiChevronDown, FiChevronUp
} from "react-icons/fi";
import { RiMentalHealthLine } from "react-icons/ri";
import { BsGraphUp, BsLightningCharge } from "react-icons/bs";

const Profile = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expandedCard, setExpandedCard] = useState(null);

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

  const features = [
    {
      id: 1,
      title: "Expense Analytics",
      description: "Detailed breakdown of your spending patterns with AI-powered insights",
      icon: <FiDollarSign className="text-2xl" />,
      color: "bg-amber-100",
      action: () => navigate("/expense-tracker")
    },
    {
      id: 2,
      title: "Emotion Tracker",
      description: "Understand your emotional patterns through journal entries and mood tracking",
      icon: <RiMentalHealthLine className="text-2xl" />,
      color: "bg-lime-100",
      action: () => navigate("/emotional-analyzer")
    },
    {
      id: 3,
      title: "Financial Goals",
      description: "Set and track progress toward your financial objectives",
      icon: <BsGraphUp className="text-2xl" />,
      color: "bg-sky-100",
      action: () => navigate("/financial-goals")
    },
    {
      id: 4,
      title: "Wellness Reports",
      description: "Weekly summaries of your emotional and financial wellbeing",
      icon: <FiHeart className="text-2xl" />,
      color: "bg-rose-100",
      action: () => navigate("/wellness-reports")
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="flex items-center">
          <FiHome className="text-2xl text-stone-700 mr-2" />
          <h1 className="text-xl font-medium">Reflectify</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 768) && (
          <motion.div 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-64    fixed md:static h-full z-50 md:z-0"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-1">
                <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center mr-3">
                  <FiHome className="text-stone-600" />
                </div>
                <h1 className="text-xl font-medium">Reflectify</h1>
              </div>

             
             
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium capitalize">{activeSection}</h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-stone-100">
                <BsLightningCharge className="text-stone-600" />
              </button>
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center"
                >
                  <FiUser className="text-stone-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeSection === "dashboard" && (
            <div className="space-y-8">
              {/* Welcome Banner */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-stone-100 to-amber-50 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-medium mb-2">Welcome back!</h1>
                    <p className="text-stone-600 max-w-2xl">
                      Your personal wellbeing dashboard is ready. Track expenses, analyze emotions, 
                      and discover patterns with our AI-powered insights.
                    </p>
                  </div>

                </div>
              </motion.div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className={`${feature.color} rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition`}
                    onClick={feature.action}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-white bg-opacity-50 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div className="text-2xl font-bold">{index + 1}</div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p className="text-stone-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Expanded Cards Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Expenses */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Recent Expenses</h3>
                    <button 
                      onClick={() => setExpandedCard(expandedCard === 'expenses' ? null : 'expenses')}
                      className="text-sm text-stone-500 hover:text-stone-900"
                    >
                      {expandedCard === 'expenses' ? 'Show Less' : 'Show More'}
                    </button>
                  </div>
                 
                  <button 
                    onClick={() => navigate("/emotion")}
                    className="w-full mt-4 py-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition"
                  >
                    View All Expenses
                  </button>
                </motion.div>

                {/* Mood Summary */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Mood Summary</h3>
                    <button 
                      onClick={() => setExpandedCard(expandedCard === 'mood' ? null : 'mood')}
                      className="text-sm text-stone-500 hover:text-stone-900"
                    >
                      {expandedCard === 'mood' ? 'Show Less' : 'Show More'}
                    </button>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-32 h-32 rounded-full bg-lime-100 flex items-center justify-center">
                      <RiMentalHealthLine className="text-4xl text-lime-600" />
                    </div>
                  </div>
                  
                  {expandedCard === 'mood' && (
                    <div className="mt-4 pt-4 border-t border-stone-200">
                      <p className="text-sm text-stone-600">
                        Your mood has been generally positive this week, with occasional neutral moments.
                        The AI detected increased stress levels on Wednesday afternoon.
                      </p>
                    </div>
                  )}
                  <button 
                    onClick={() => navigate("/expense")}
                    className="w-full mt-4 py-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition"
                  >
                    Detailed Analysis
                  </button>
                </motion.div>

                {/* Financial Health */}
               
              </div>
            </div>
          )}

          {activeSection === "expenses" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-medium mb-6">Expense Tracking</h2>
              <p>Expense tracking content would go here...</p>
            </motion.div>
          )}

          {activeSection === "emotions" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-medium mb-6">Emotional Analysis</h2>
              <p>Emotional analysis content would go here...</p>
            </motion.div>
          )}

          {activeSection === "reports" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-medium mb-6">Wellness Reports</h2>
              <p>Wellness reports content would go here...</p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;