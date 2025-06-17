// EmotionalAnalyzer.jsx
import { useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  FaSave,
  FaShareAlt,
  FaClock,
  FaTimesCircle,
  FaChevronDown,
  FaChevronUp,
  FaRegLightbulb,
  FaRegChartBar,
  FaRegSmile,
  FaRegFrown,
  FaRegMeh,
  FaLeaf,
  FaRunning,
  FaBook,
  FaMusic,
  FaUtensils
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiMentalHealthLine } from "react-icons/ri";
import { useEmotionData } from "../components/data/useEmotionData";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const EmotionalAnalyzer = () => {
  // Use our custom hook to manage emotion data
  const {
    activities,
    analysis,
    history,
    setActivities,
    setAnalysis,
    addToHistory,
    clearHistory,
    deleteHistoryItem
  } = useEmotionData();

  // Local component state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    analysis: true,
    moodchanger: true,
    activities: true
  });
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  
  const formRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const yPos = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yPos2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yPos3 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Activity suggestions data
  const activitySuggestions = {
    morning: [
      { icon: <FaRunning />, text: "Morning jog in the park" },
      { icon: <FaBook />, text: "Reading with coffee" },
      { icon: <FaMusic />, text: "Listening to podcasts" }
    ],
    afternoon: [
      { icon: <FaUtensils />, text: "Lunch with colleagues" },
      { icon: <FaBook />, text: "Studying/working" },
      { icon: <FaLeaf />, text: "Short walk outside" }
    ],
    evening: [
      { icon: <FaMusic />, text: "Playing guitar" },
      { icon: <FaRunning />, text: "Gym session" },
      { icon: <FaUtensils />, text: "Cooking dinner" }
    ],
    night: [
      { icon: <FaBook />, text: "Journaling" },
      { icon: <FaMusic />, text: "Meditation" },
      { icon: <FaLeaf />, text: "Planning next day" }
    ]
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivities(prev => ({ ...prev, [name]: value }));
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (time, suggestion) => {
    setActivities(prev => ({
      ...prev,
      [time]: prev[time] ? `${prev[time]}, ${suggestion}` : suggestion
    }));
    setSelectedSuggestion(null);
  };

  // Submit form for analysis
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnalysis(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required. Please log in.");
      setLoading(false);
      navigate("/login");
      return;
    }

    const prompt = `Morning: ${activities.morning}\nAfternoon: ${activities.afternoon}\nEvening: ${activities.evening}\nNight: ${activities.night}`;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai/emotion",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        activities: { ...activities },
        ...response.data,
      };
      
      addToHistory(newEntry);
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed. Please try again.");
      console.error("Analysis error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Clear all history
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history? This cannot be undone.")) {
      clearHistory();
      setSelectedHistory(null);
    }
  };

  // Delete a single history item
  const handleDeleteHistoryItem = (id) => {
    deleteHistoryItem(id);
    if (selectedHistory?.id === id) {
      setSelectedHistory(null);
    }
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Mood chart data configuration
  const moodChartData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [
          analysis?.score?.positive || 0,
          analysis?.score?.neutral || 0,
          analysis?.score?.negative || 0,
        ],
        backgroundColor: ["#4ade80", "#fbbf24", "#ef4444"],
        hoverBackgroundColor: ["#22c55e", "#f59e0b", "#dc2626"],
        borderWidth: 0,
      },
    ],
  };

  // Mood icons based on analysis
  const getMoodIcon = (mood) => {
    if (mood?.toLowerCase().includes("positive")) return <FaRegSmile className="text-green-500" />;
    if (mood?.toLowerCase().includes("negative")) return <FaRegFrown className="text-red-500" />;
    return <FaRegMeh className="text-yellow-500" />;
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-start justify-center p-4 md:p-8 relative overflow-hidden"
    >
      {/* SVG Background Animations */}
      <motion.svg 
        viewBox="0 0 500 50" 
        className="absolute top-[10%] left-0 w-full opacity-5"
        style={{ y: yPos }}
      >
        <motion.path 
          d="M0,25 C80,5 150,45 250,25 C350,5 420,45 500,25" 
          stroke="#7c3aed" 
          strokeWidth="1.5" 
          fill="none" 
          strokeDasharray="12 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </motion.svg>
      
      <motion.svg 
        viewBox="0 0 500 100" 
        className="absolute top-[30%] right-0 w-full opacity-5"
        style={{ y: yPos2 }}
      >
        <motion.path 
          d="M0,50 C150,10 300,90 500,50" 
          stroke="#3b82f6" 
          strokeWidth="1.5" 
          fill="none" 
          strokeDasharray="8 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 0.8 }}
        />
      </motion.svg>
      
      <motion.svg 
        viewBox="0 0 500 80" 
        className="absolute bottom-[20%] left-0 w-full opacity-5"
        style={{ y: yPos3 }}
      >
        <motion.path 
          d="M0,40 C100,0 200,80 300,40 C400,0 500,80 500,40" 
          stroke="#10b981" 
          strokeWidth="1.5" 
          fill="none" 
          strokeDasharray="10 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.3 }}
        />
      </motion.svg>

      <div className="w-full max-w-7xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M0,0 C20,50 40,30 60,70 S100,50 100,100 L100,0 Z" 
                fill="black"
              />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <RiMentalHealthLine className="text-3xl" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Emotional Wellness Tracker</h1>
                <p className="text-blue-100">Understand your emotional patterns through daily activities</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${showHistory ? "bg-white/20" : "bg-white/10 hover:bg-white/20"}`}
              >
                <FaClock />
                {showHistory ? "Hide History" : "Show History"}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activity Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FaRegChartBar />
                  Daily Activities
                </h2>
              </div>
              <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-6">
                {Object.entries(activities).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="capitalize font-medium text-gray-700 flex items-center gap-2">
                        {key}
                        <button
                          type="button"
                          onClick={() => setSelectedSuggestion(selectedSuggestion === key ? null : key)}
                          className="text-xs text-blue-600 hover:text-blue-800 ml-2 flex items-center gap-1"
                        >
                          {selectedSuggestion === key ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                          Suggestions
                        </button>
                      </label>
                      <span className="text-xs text-gray-500">
                        {value.length}/200
                      </span>
                    </div>
                    
                    <AnimatePresence>
                      {selectedSuggestion === key && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2 mb-2">
                            {activitySuggestions[key].map((suggestion, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleSuggestionSelect(key, suggestion.text)}
                                className="flex items-center gap-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-800 px-3 py-1 rounded-full transition-colors"
                              >
                                {suggestion.icon}
                                {suggestion.text}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <textarea
                      name={key}
                      value={value}
                      onChange={handleChange}
                      rows="3"
                      maxLength="200"
                      className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none resize-none transition-all"
                      placeholder={`Describe your ${key} activities...`}
                      required
                    />
                  </div>
                ))}
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-lg font-semibold shadow-md transition-all flex items-center justify-center gap-2 ${
                      loading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                    } text-white`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      "Analyze My Day"
                    )}
                  </button>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 text-red-500 text-center"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>
              </form>
            </motion.div>

            {/* Analysis Results */}
            <AnimatePresence>
              {(analysis || selectedHistory) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      {getMoodIcon(selectedHistory?.mood || analysis?.mood)}
                      {selectedHistory ? "Past Analysis" : "Today's Analysis"}
                    </h2>
                    <div className="flex gap-2">
                      <button className="text-gray-500 hover:text-gray-700 p-1">
                        <FaSave />
                      </button>
                      {selectedHistory && (
                        <button 
                          onClick={() => handleDeleteHistoryItem(selectedHistory.id)}
                          className="text-gray-500 hover:text-red-500 p-1"
                        >
                          <IoMdClose />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-600 font-medium">Date</p>
                        <p className="text-gray-800">{selectedHistory?.date || analysis?.date}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-100">
                        <p className="text-sm text-green-600 font-medium">Overall Mood</p>
                        <p className="text-gray-800 font-medium">{selectedHistory?.mood || analysis?.mood}</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-100">
                        <p className="text-sm text-purple-600 font-medium">Mood Score</p>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-16">
                            <Doughnut
                              data={{
                                labels: ["Positive", "Neutral", "Negative"],
                                datasets: [
                                  {
                                    data: selectedHistory
                                      ? [
                                          selectedHistory.score.positive,
                                          selectedHistory.score.neutral,
                                          selectedHistory.score.negative,
                                        ]
                                      : [
                                          analysis?.score?.positive || 0,
                                          analysis?.score?.neutral || 0,
                                          analysis?.score?.negative || 0,
                                        ],
                                    backgroundColor: ["#4ade80", "#fbbf24", "#ef4444"],
                                    borderWidth: 0,
                                  },
                                ],
                              }}
                              options={{
                                cutout: "70%",
                                plugins: {
                                  legend: { display: false },
                                  tooltip: { enabled: true },
                                },
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                              Positive: {selectedHistory?.score?.positive || analysis?.score?.positive}%
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                              Neutral: {selectedHistory?.score?.neutral || analysis?.score?.neutral}%
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                              Negative: {selectedHistory?.score?.negative || analysis?.score?.negative}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Analysis Sections */}
                    <div className="space-y-4">
                      {/* Behavior Analysis */}
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                        <div 
                          className="cursor-pointer"
                          onClick={() => toggleSection('analysis')}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-800">Behavior Analysis</h3>
                            {expandedSections.analysis ? <FaChevronUp /> : <FaChevronDown />}
                          </div>
                        </div>
                        <AnimatePresence>
                          {expandedSections.analysis && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 overflow-hidden"
                            >
                              <div className="prose prose-sm max-w-none text-gray-600">
                                {selectedHistory?.analysis || analysis?.analysis}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Mood Improvement Suggestions */}
                      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200">
                        <div 
                          className="cursor-pointer"
                          onClick={() => toggleSection('moodchanger')}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-800">Mood Improvement Suggestions</h3>
                            {expandedSections.moodchanger ? <FaChevronUp /> : <FaChevronDown />}
                          </div>
                        </div>
                        <AnimatePresence>
                          {expandedSections.moodchanger && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 overflow-hidden"
                            >
                              <ul className="space-y-3">
                                {(selectedHistory?.moodchanger || analysis?.moodchanger)?.split('\n').map((item, i) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 mt-1 text-indigo-500">
                                      <FaRegLightbulb />
                                    </span>
                                    <span className="text-gray-600">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Logged Activities */}
                      <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-lg border border-green-200">
                        <div 
                          className="cursor-pointer"
                          onClick={() => toggleSection('activities')}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-800">Logged Activities</h3>
                            {expandedSections.activities ? <FaChevronUp /> : <FaChevronDown />}
                          </div>
                        </div>
                        <AnimatePresence>
                          {expandedSections.activities && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 overflow-hidden"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Object.entries(selectedHistory?.activities || analysis?.activities || {}).map(([time, activity]) => (
                                  <div key={time} className="bg-white/80 p-3 rounded-lg border border-green-100 shadow-xs">
                                    <h4 className="capitalize font-medium text-gray-700 flex items-center gap-2">
                                      {time === 'morning' && <FaRunning className="text-green-500" />}
                                      {time === 'afternoon' && <FaUtensils className="text-yellow-500" />}
                                      {time === 'evening' && <FaMusic className="text-purple-500" />}
                                      {time === 'night' && <FaBook className="text-blue-500" />}
                                      {time}
                                    </h4>
                                    <p className="text-gray-600 mt-1">{activity}</p>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Trends and History */}
          <div className="space-y-6">
            {/* Weekly Trends */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FaRegChartBar />
                  Weekly Mood Trends
                </h2>
              </div>
              <div className="p-4">
                <div className="h-64">
                  <Bar
                    data={{
                      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                      datasets: [
                        {
                          label: "Positive",
                          data: [65, 59, 80, 81, 56, 55, 40],
                          backgroundColor: "#4ade80",
                          borderRadius: 4
                        },
                        {
                          label: "Neutral",
                          data: [28, 48, 40, 19, 86, 27, 90],
                          backgroundColor: "#fbbf24",
                          borderRadius: 4
                        },
                        {
                          label: "Negative",
                          data: [7, 13, 10, 5, 8, 18, 20],
                          backgroundColor: "#ef4444",
                          borderRadius: 4
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          stacked: true,
                          grid: {
                            display: false
                          }
                        },
                        y: {
                          stacked: true,
                          beginAtZero: true,
                          ticks: {
                            callback: function(value) {
                              return value + '%';
                            }
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            usePointStyle: true,
                            padding: 20
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Tips Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 px-6 py-4 border-b border-blue-200">
                <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2">
                  <FaRegLightbulb />
                  Wellness Tip
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <FaRegLightbulb />
                  </div>
                  <div>
                    <p className="text-blue-800 font-medium mb-2">Morning mindfulness can set a positive tone for your day</p>
                    <p className="text-gray-600 text-sm">Try starting your day with 5 minutes of deep breathing or gratitude journaling to enhance emotional awareness.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* History Panel */}
            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <FaClock />
                      Analysis History
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={handleClearHistory}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                        disabled={history.length === 0}
                      >
                        <FaTimesCircle />
                        Clear All
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 max-h-96 overflow-y-auto">
                    {history.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No analysis history yet. Complete your first analysis to see results here.
                      </div>
                    ) : (
                      <ul className="space-y-3">
                        {history.map((item) => (
                          <motion.li
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`p-3 rounded-lg cursor-pointer transition-all ${selectedHistory?.id === item.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                            onClick={() => {
                              setSelectedHistory(item);
                              setShowHistory(false);
                              window.scrollTo({ top: formRef.current?.offsetTop, behavior: 'smooth' });
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800">{item.date}</p>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                  {getMoodIcon(item.mood)}
                                  {item.mood}
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteHistoryItem(item.id);
                                }}
                                className="text-gray-400 hover:text-red-500 p-1"
                              >
                                <IoMdClose />
                              </button>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionalAnalyzer;