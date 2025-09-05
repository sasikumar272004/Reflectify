// EmotionalAnalyzer.jsx
import { motion, AnimatePresence } from "framer-motion";
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
import { useEmotionalAnalyzer } from "./useEmotionalAnalyzer";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Soft candy color palette - all colors now referenced from here
const colors = {
background: ["#ADB2D4"],

primary: ["#C68EFD", "#B18BFF"],   
secondary: ["#FFAB6B", "#FFCF9A"], 
accent: ["#FFDB7D", "#FFC2FF", "#7FE3FF"], 
text: ["#2D2A44", "#4E4866"],      
chart: ["#C68EFD", "#FFAB6B", "#FFDB7D", "#B18BFF"],

gradients: {
  primary: "linear-gradient(135deg, #89CFF0 0%, #BFA2FF 60%, #D8B4FE 100%)",
  secondary: "linear-gradient(135deg, #FFAB6B 0%, #FFCF9A 100%)",
  accent: "linear-gradient(135deg, #FFDB7D 0%, #7FE3FF 100%)",
  background: "#ADB2D4"
}


};

// Icon mapping component
const IconRenderer = ({ iconName, className = "" }) => {
  const icons = {
    FaSave: <FaSave className={className} />,
    FaShareAlt: <FaShareAlt className={className} />,
    FaClock: <FaClock className={className} />,
    FaTimesCircle: <FaTimesCircle className={className} />,
    FaChevronDown: <FaChevronDown className={className} />,
    FaChevronUp: <FaChevronUp className={className} />,
    FaRegLightbulb: <FaRegLightbulb className={className} />,
    FaRegChartBar: <FaRegChartBar className={className} />,
    FaRegSmile: <FaRegSmile className={className} />,
    FaRegFrown: <FaRegFrown className={className} />,
    FaRegMeh: <FaRegMeh className={className} />,
    FaLeaf: <FaLeaf className={className} />,
    FaRunning: <FaRunning className={className} />,
    FaBook: <FaBook className={className} />,
    FaMusic: <FaMusic className={className} />,
    FaUtensils: <FaUtensils className={className} />,
    IoMdClose: <IoMdClose className={className} />,
    RiMentalHealthLine: <RiMentalHealthLine className={className} />,
  };
  
  return icons[iconName] || null;
};

const EmotionalAnalyzer = () => {
  const {
    activities,
    analysis,
    history,
    loading,
    error,
    showHistory,
    selectedHistory,
    expandedSections,
    selectedSuggestion,
    formRef,
    containerRef,
    yPos,
    yPos2,
    yPos3,
    activitySuggestions,
    moodChartData,
    weeklyTrendsData,
    handleChange,
    handleSuggestionSelect,
    handleSubmit,
    handleClearHistory,
    handleDeleteHistoryItem,
    toggleSection,
    getMoodIcon,
    setShowHistory,
    setSelectedHistory,
    setSelectedSuggestion
  } = useEmotionalAnalyzer();

  return (
    <div 
      ref={containerRef}
      className="min-h-screen"
      style={{ background: colors.gradients.background }}
    >
    

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-lg relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-5">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="p-4 rounded-2xl"
                  style={{ background: colors.gradients.primary }}
                >
                  <RiMentalHealthLine className="text-3xl text-white" />
                </motion.div>
                <div>
                  <h1 className="text-4xl font-bold bg-clip-text text-transparent" 
                      style={{ backgroundImage: colors.gradients.primary }}>
                    Emotional Wellness Tracker
                  </h1>
                  <p className="mt-2" style={{ color: colors.text[0] }}>
                    Understand your emotional patterns through daily activities
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHistory(!showHistory)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all font-medium ${
                  showHistory ? "text-white" : "bg-white text-" + colors.text[0].replace('#', '')
                } shadow-md`}
                style={showHistory ? { background: colors.gradients.primary } : {}}
              >
                <FaClock />
                {showHistory ? "Hide History" : "Show History"}
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form and Analysis */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 shadow-lg overflow-hidden"
            >
              <div className="px-8 py-6 text-white" style={{ background: colors.gradients.primary }}>
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FaRegChartBar className="text-white" />
                  </div>
                  Daily Activities
                </h2>
              </div>
              
              <form ref={formRef} onSubmit={handleSubmit} className="p-8 space-y-8">
                {Object.entries(activities).map(([key, value]) => (
                  <div key={key} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="capitalize font-medium flex items-center gap-2" style={{ color: colors.text[0] }}>
                        <span className="text-white py-1 px-3 rounded-full text-sm" 
                              style={{ background: colors.gradients.primary }}>
                          {key}
                        </span>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSuggestion(selectedSuggestion === key ? null : key)}
                          className="text-sm ml-2 flex items-center gap-1 bg-white/50 px-3 py-1 rounded-lg"
                          style={{ color: colors.text[0] }}
                        >
                          {selectedSuggestion === key ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                          Suggestions
                        </motion.button>
                      </label>
                      <span className="text-xs bg-white/50 px-2 py-1 rounded-full" style={{ color: colors.text[0] }}>
                        {value.length}/200
                      </span>
                    </div>
                    
                    <AnimatePresence>
                      {selectedSuggestion === key && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mb-2"
                        >
                          <div className="flex flex-wrap gap-2 p-3 bg-white/50 rounded-xl">
                            {activitySuggestions[key].map((suggestion, idx) => (
                              <motion.button
                                key={idx}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={() => handleSuggestionSelect(key, suggestion.text)}
                                className="flex items-center gap-2 text-xs bg-white px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md border border-white"
                                style={{ color: colors.text[0] }}
                              >
                                <IconRenderer iconName={suggestion.icon} />
                                {suggestion.text}
                              </motion.button>
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
                      className="w-full p-4 bg-white/80 border border-white/50 rounded-xl shadow-inner focus:ring-2 outline-none resize-none transition-all placeholder-opacity-70"
                      style={{ 
                        color: colors.text[2],
                        placeholderColor: colors.text[0] + '80',
                        focusRingColor: colors.accent[0]
                      }}
                      placeholder={`Describe your ${key} activities...`}
                      required
                    />
                  </div>
                ))}
                
                <div className="pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: `0 5px 20px ${colors.accent[0]}80` }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-8 rounded-xl font-semibold shadow-xl transition-all flex items-center justify-center gap-3 text-white"
                    style={{ 
                      background: loading ? colors.primary[0] : colors.gradients.primary,
                      opacity: loading ? 0.7 : 1
                    }}
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
                      <>
                        Analyze My Day
                        <FaRegChartBar />
                      </>
                    )}
                  </motion.button>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-center bg-white/50 py-2 rounded-xl"
                      style={{ color: colors.accent[0] }}
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 shadow-lg overflow-hidden"
                >
                  <div className="px-8 py-6 text-white flex justify-between items-center" 
                       style={{ background: colors.gradients.primary }}>
                    <h2 className="text-2xl font-semibold flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        {(() => {
                          const moodIcon = getMoodIcon(selectedHistory?.mood || analysis?.mood);
                          return <IconRenderer iconName={moodIcon.icon} className="text-white" />;
                        })()}
                      </div>
                      {selectedHistory ? "Past Analysis" : "Today's Analysis"}
                    </h2>
                    <div className="flex gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-white/80 hover:text-white p-2 bg-white/20 rounded-lg"
                      >
                        <FaSave />
                      </motion.button>
                      {selectedHistory && (
                        <motion.button 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteHistoryItem(selectedHistory.id)}
                          className="text-white/80 hover:text-white p-2 bg-white/20 rounded-lg"
                        >
                          <IoMdClose />
                        </motion.button>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white/80 p-5 rounded-xl border border-white/50 shadow-sm">
                        <p className="text-sm font-medium" style={{ color: colors.text[1] }}>Date</p>
                        <p className="mt-1 font-medium" style={{ color: colors.text[0] }}>
                          {selectedHistory?.date || analysis?.date}
                        </p>
                      </div>
                      <div className="bg-white/80 p-5 rounded-xl border border-white/50 shadow-sm">
                        <p className="text-sm font-medium" style={{ color: colors.text[1] }}>Overall Mood</p>
                        <p className="font-medium mt-1 flex items-center gap-2" style={{ color: colors.text[0] }}>
                          {(() => {
                            const moodIcon = getMoodIcon(selectedHistory?.mood || analysis?.mood);
                            return <IconRenderer iconName={moodIcon.icon} className={`text-lg ${moodIcon.className}`} />;
                          })()}
                          {selectedHistory?.mood || analysis?.mood}
                        </p>
                      </div>
                      <div className="bg-white/80 p-5 rounded-xl border border-white/50 shadow-sm">
                        <p className="text-sm font-medium" style={{ color: colors.text[1] }}>Mood Score</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="w-20 h-20">
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
                                    backgroundColor: [colors.accent[2], colors.accent[1], colors.accent[0]],
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
                          <div className="space-y-1">
                            <p className="text-xs flex items-center gap-2" style={{ color: colors.text[0] }}>
                              <span className="w-3 h-3 rounded-full" style={{ background: colors.accent[2] }}></span>
                              Positive: {selectedHistory?.score?.positive || analysis?.score?.positive}%
                            </p>
                            <p className="text-xs flex items-center gap-2" style={{ color: colors.text[0] }}>
                              <span className="w-3 h-3 rounded-full" style={{ background: colors.accent[1] }}></span>
                              Neutral: {selectedHistory?.score?.neutral || analysis?.score?.neutral}%
                            </p>
                            <p className="text-xs flex items-center gap-2" style={{ color: colors.text[0] }}>
                              <span className="w-3 h-3 rounded-full" style={{ background: colors.accent[0] }}></span>
                              Negative: {selectedHistory?.score?.negative || analysis?.score?.negative}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Analysis Sections */}
                    <div className="space-y-6">
                      {/* Behavior Analysis */}
                      <motion.div 
                        whileHover={{ y: -3 }}
                        className="bg-white/80 p-5 rounded-xl border border-white/50 shadow-sm"
                      >
                        <div 
                          className="cursor-pointer"
                          onClick={() => toggleSection('analysis')}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium" style={{ color: colors.text[0] }}>Behavior Analysis</h3>
                            {expandedSections.analysis ? 
                              <FaChevronUp style={{ color: colors.text[1] }} /> : 
                              <FaChevronDown style={{ color: colors.text[1] }} />
                            }
                          </div>
                        </div>
                        <AnimatePresence>
                          {expandedSections.analysis && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 overflow-hidden"
                            >
                              <div className="bg-white/50 p-4 rounded-lg" style={{ color: colors.text[2] }}>
                                {selectedHistory?.analysis || analysis?.analysis}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Mood Improvement Suggestions */}
                      <motion.div 
                        whileHover={{ y: -3 }}
                        className="bg-white/80 p-5 rounded-xl border border-white/50 shadow-sm"
                      >
                        <div 
                          className="cursor-pointer"
                          onClick={() => toggleSection('moodchanger')}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium" style={{ color: colors.text[0] }}>Mood Improvement Suggestions</h3>
                            {expandedSections.moodchanger ? 
                              <FaChevronUp style={{ color: colors.text[1] }} /> : 
                              <FaChevronDown style={{ color: colors.text[1] }} />
                            }
                          </div>
                        </div>
                        <AnimatePresence>
                          {expandedSections.moodchanger && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 overflow-hidden"
                            >
                              <ul className="space-y-4">
                                {(selectedHistory?.moodchanger || analysis?.moodchanger)?.split('\n').map((item, i) => (
                                  <motion.li 
                                    key={i} 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4 bg-white/50 p-4 rounded-lg"
                                  >
                                    <span className="flex-shrink-0 mt-1 text-white p-2 rounded-lg" 
                                          style={{ background: colors.gradients.primary }}>
                                      <FaRegLightbulb />
                                    </span>
                                    <span style={{ color: colors.text[2] }}>{item}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Logged Activities */}
                      <motion.div 
                        whileHover={{ y: -3 }}
                        className="bg-white/80 p-5 rounded-xl border border-white/50 shadow-sm"
                      >
                        <div 
                          className="cursor-pointer"
                          onClick={() => toggleSection('activities')}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium" style={{ color: colors.text[0] }}>Logged Activities</h3>
                            {expandedSections.activities ? 
                              <FaChevronUp style={{ color: colors.text[1] }} /> : 
                              <FaChevronDown style={{ color: colors.text[1] }} />
                            }
                          </div>
                        </div>
                        <AnimatePresence>
                          {expandedSections.activities && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 overflow-hidden"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(selectedHistory?.activities || analysis?.activities || {}).map(([time, activity]) => (
                                  <motion.div 
                                    key={time} 
                                    whileHover={{ scale: 1.02, y: -3 }}
                                    className="bg-white p-4 rounded-xl border border-white/50 shadow-sm"
                                  >
                                    <h4 className="capitalize font-medium flex items-center gap-3" style={{ color: colors.text[0] }}>
                                      {time === 'morning' && <FaRunning style={{ color: colors.accent[2] }} />}
                                      {time === 'afternoon' && <FaUtensils style={{ color: colors.accent[0] }} />}
                                      {time === 'evening' && <FaMusic style={{ color: colors.primary[0] }} />}
                                      {time === 'night' && <FaBook style={{ color: colors.primary[1] }} />}
                                      {time}
                                    </h4>
                                    <p className="mt-2" style={{ color: colors.text[2] }}>{activity}</p>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Trends and History */}
          <div className="space-y-8">
            {/* Weekly Trends */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 shadow-lg overflow-hidden"
            >
              <div className="px-6 py-5 text-white" style={{ background: colors.gradients.tertiary }}>
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FaRegChartBar className="text-white" />
                  </div>
                  Weekly Mood Trends
                </h2>
              </div>
              <div className="p-6">
                <div className="h-72">
                  <Bar
                    data={weeklyTrendsData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          stacked: true,
                          grid: {
                            display: false,
                            color: colors.text[0] + '20'
                          },
                          ticks: {
                            color: colors.text[0]
                          }
                        },
                        y: {
                          stacked: true,
                          beginAtZero: true,
                          grid: {
                            color: colors.text[0] + '20'
                          },
                          ticks: {
                            color: colors.text[0],
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
                            color: colors.text[0],
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
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-3xl border border-white/50 shadow-lg overflow-hidden backdrop-blur-md"
              style={{ background: colors.gradients.secondary, backgroundSize: '200% 200%' }}
            >
              <div className="px-6 py-5 text-white" style={{ background: colors.gradients.secondary }}>
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FaRegLightbulb className="text-white" />
                  </div>
                  Wellness Tip
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl text-white" style={{ background: colors.gradients.secondary }}>
                    <FaRegLightbulb className="text-xl" />
                  </div>
                  <div>
                    <p className="font-medium mb-2 text-white">Morning mindfulness can set a positive tone for your day</p>
                    <p className="text-white/90 text-sm">Try starting your day with 5 minutes of deep breathing or gratitude journaling to enhance emotional awareness.</p>
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
                  transition={{ duration: 0.4 }}
                  className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 shadow-lg overflow-hidden"
                >
                  <div className="px-6 py-5 text-white flex justify-between items-center" 
                       style={{ background: colors.gradients.primary }}>
                    <h2 className="text-xl font-semibold flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <FaClock className="text-white" />
                      </div>
                      Analysis History
                    </h2>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClearHistory}
                        className="text-sm text-white/90 hover:text-white flex items-center gap-1 bg-white/20 px-3 py-1 rounded-lg"
                        disabled={history.length === 0}
                      >
                        <FaTimesCircle />
                        Clear All
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="p-6 max-h-96 overflow-y-auto">
                    {history.length === 0 ? (
                      <div className="text-center py-8 rounded-xl bg-white/50" style={{ color: colors.text[1] }}>
                        No analysis history yet. Complete your first analysis to see results here.
                      </div>
                    ) : (
                      <ul className="space-y-4">
                        {history.map((item) => (
                          <motion.li
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`p-4 rounded-xl cursor-pointer transition-all ${
                              selectedHistory?.id === item.id 
                                ? 'border' 
                                : 'bg-white/80 hover:bg-white border border-white/50'
                            } shadow-sm`}
                            style={selectedHistory?.id === item.id ? {
                              background: `linear-gradient(135deg, ${colors.primary[0]}20, ${colors.primary[1]}20)`,
                              borderColor: colors.primary[0]
                            } : {}}
                            onClick={() => {
                              setSelectedHistory(item);
                              setShowHistory(false);
                              window.scrollTo({ top: formRef.current?.offsetTop, behavior: 'smooth' });
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium" style={{ color: colors.text[0] }}>{item.date}</p>
                                <p className="text-sm flex items-center gap-2 mt-1" style={{ color: colors.text[1] }}>
                                  {(() => {
                                    const moodIcon = getMoodIcon(item.mood);
                                    return <IconRenderer iconName={moodIcon.icon} className={moodIcon.className} />;
                                  })()}
                                  {item.mood}
                                </p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteHistoryItem(item.id);
                                }}
                                className="p-1"
                                style={{ color: colors.text[1] }}
                              >
                                <IoMdClose />
                              </motion.button>
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

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center text-sm"
          style={{ color: colors.text[1] }}
        >
          <p>Track your emotions, understand your patterns, and improve your wellbeing</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default EmotionalAnalyzer;