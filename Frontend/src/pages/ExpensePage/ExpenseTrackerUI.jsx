import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShareAlt, FaSave, FaSun, FaMoon, FaPlus, 
  FaTrash, FaExclamationTriangle, FaChartLine,
  FaFileExport, FaFilter, FaHistory, FaPiggyBank,
  FaLightbulb, FaBell, FaChartPie, FaMoneyBillWave, 
  FaTimes, FaChevronDown, FaChevronUp, FaCalendarAlt,
  FaEdit, FaSync, FaHome, FaWallet, FaChartBar
} from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Color palette
const colors = {
  primary: '#6366f1',
  primaryLight: '#818cf8',
  primaryDark: '#4f46e5',
  secondary: '#ec4899',
  secondaryLight: '#f472b6',
  secondaryDark: '#db2777',
  accent: '#f59e0b',
  accentLight: '#fbbf24',
  accentDark: '#d97706',
  success: '#10b981',
  successLight: '#34d399',
  successDark: '#059669',
  warning: '#f59e0b',
  warningLight: '#fbbf24',
  warningDark: '#d97706',
  danger: '#ef4444',
  dangerLight: '#f87171',
  dangerDark: '#dc2626',
  info: '#3b82f6',
  infoLight: '#60a5fa',
  infoDark: '#2563eb',
  light: '#f8fafc',
  dark: '#1e293b',
  gray: '#64748b',
  grayLight: '#cbd5e1',
  grayDark: '#475569'
};

export const ExpenseTrackerUI = ({
  // State
  expenses,
  analysis,
  loading,
  error,
  darkMode,
  dailyLogs,
  showDailyLogs,
  savingsGoal,
  monthlyEarning,
  notifications,
  showNotifications,
  categories,
  savingsProgress,
  savingsPercentage,
  
  // Functions
  setDarkMode,
  setShowDailyLogs,
  setSavingsGoal,
  setMonthlyEarning,
  setShowNotifications,
  handleExpenseChange,
  addExpense,
  removeExpense,
  handleSubmit,
  saveCurrentDay,
  loadFromDailyLogs,
  deleteLogItem,
  clearDailyLogs,
  refreshExpenses,
  markNotificationAsRead,
  removeNotification,
  handleNumberInputChange
}) => {
  return (
    <div className={`min-h-screen w-full transition-all duration-300 ${
      darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    }`}>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName={() => "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"}
      />
      
      {/* Header */}
      <header className={`w-full py-4 px-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${darkMode ? "bg-indigo-900" : "bg-gradient-to-r from-indigo-500 to-purple-500"} text-white`}>
              <FaChartLine size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Daily Expense Tracker
            </h1>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-3 rounded-xl relative transition-all ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
                aria-label="Notifications"
              >
                <FaBell className={darkMode ? "text-white" : "text-gray-800"} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg z-50 ${darkMode ? "bg-gray-700" : "bg-white"} border ${darkMode ? "border-gray-600" : "border-gray-200"}`}
                  >
                    <div className={`p-3 font-semibold border-b ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
                      Notifications
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-3 text-sm text-gray-500">No notifications</div>
                      ) : (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-3 border-b ${darkMode ? "border-gray-600 hover:bg-gray-600" : "border-gray-200 hover:bg-gray-50"} cursor-pointer relative ${!notification.read ? (darkMode ? "bg-gray-600" : "bg-blue-50") : ""}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <button
                              onClick={(e) => removeNotification(notification.id, e)}
                              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            >
                              <FaTimes size={12} />
                            </button>
                            <div className="flex items-start pr-6">
                              {notification.type === 'warning' ? (
                                <FaExclamationTriangle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                              ) : (
                                <FaLightbulb className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                              )}
                              <div className="text-sm">{notification.message}</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button
              onClick={() => setShowDailyLogs(!showDailyLogs)}
              className={`p-3 rounded-xl transition-all ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} ${showDailyLogs ? (darkMode ? "bg-gray-600" : "bg-gray-200") : ""}`}
              aria-label="View daily logs"
            >
              <FaHistory className={darkMode ? "text-white" : "text-gray-800"} />
            </button>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl transition-all ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl shadow-xl p-6 mb-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaWallet className="text-indigo-500" /> Expense Entry
            </h2>
            <span className="text-sm px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
              {new Date().toLocaleDateString()}
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded flex items-center"
            >
              <FaExclamationTriangle className="mr-3 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Expense Items</h3>
              <button
                type="button"
                onClick={addExpense}
                className="flex items-center gap-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl transition"
              >
                <FaPlus size={12} /> Add Expense
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto p-2 pr-1">
              {expenses.map((expense) => (
                <motion.div 
                  key={expense.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-12 gap-3 items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="col-span-12 sm:col-span-3">
                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Amount</label>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
                      }`}
                      placeholder="0.00"
                      value={expense.amount}
                      onChange={(e) => handleExpenseChange(expense.id, "amount", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="col-span-12 sm:col-span-3">
                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Category</label>
                    <select
                      className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
                      }`}
                      value={expense.category}
                      onChange={(e) => handleExpenseChange(expense.id, "category", e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-span-12 sm:col-span-3">
                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Date</label>
                    <input
                      type="date"
                      className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
                      }`}
                      value={expense.date}
                      onChange={(e) => handleExpenseChange(expense.id, "date", e.target.value)}
                    />
                  </div>
                  
                  <div className="col-span-12 sm:col-span-2">
                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Description</label>
                    <input
                      type="text"
                      className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
                      }`}
                      placeholder="Description"
                      value={expense.description}
                      onChange={(e) => handleExpenseChange(expense.id, "description", e.target.value)}
                    />
                  </div>
                  
                  <div className="col-span-12 sm:col-span-1 flex justify-center pt-5">
                    {expenses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExpense(expense.id)}
                        className="p-2 text-red-500 hover:text-red-700 transition"
                        aria-label="Remove expense"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Monthly Earning Input */}
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                <FaMoneyBillWave className="inline mr-2 text-green-500" />
                Monthly Earnings ($)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
                }`}
                placeholder="Enter your monthly earnings"
                value={monthlyEarning || ''}
                onChange={(e) => handleNumberInputChange(setMonthlyEarning, e)}
              />
            </div>

            {/* Savings Goal Input */}
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                <FaPiggyBank className="inline mr-2 text-yellow-500" />
                Monthly Savings Goal ($)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 bg-white"
                }`}
                placeholder="Enter your savings goal"
                value={savingsGoal || ''}
                onChange={(e) => handleNumberInputChange(setSavingsGoal, e)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={saveCurrentDay}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition duration-300 transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
            >
              <FaSave className="mr-2" /> Save Day
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300 transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
              disabled={loading}
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
                  <FaChartLine className="mr-2" />
                  Analyze Expenses
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Analysis Section - Full Width */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              id="analysis-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className={`rounded-2xl shadow-xl p-6 mb-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FaChartBar className="text-indigo-500" /> Spending Analysis
                </h2>
                <button
                  onClick={refreshExpenses}
                  className="p-2 rounded-xl transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Refresh analysis"
                >
                  <FaSync className={darkMode ? "text-white" : "text-gray-800"} />
                </button>
              </div>

              {/* Progress Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Savings Progress */}
                {monthlyEarning > 0 && (
                  <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-indigo-50"}`}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium flex items-center">
                        <FaMoneyBillWave className="mr-2 text-green-500" />
                        Savings Rate
                      </span>
                      <span className="text-sm font-medium">
                        {savingsPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-3 ${
                      darkMode ? "bg-gray-600" : "bg-gray-200"
                    }`}>
                      <div 
                        className={`h-3 rounded-full ${
                          savingsPercentage > 30 ? "bg-green-500" : 
                          savingsPercentage > 15 ? "bg-yellow-500" : "bg-red-500"
                        }`} 
                        style={{ width: `${Math.min(savingsPercentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Earnings: ${monthlyEarning.toLocaleString()}</span>
                      <span>Saved: ${((monthlyEarning * savingsPercentage) / 100).toLocaleString()}</span>
                    </div>
                  </div>
                )}
                
                {/* Savings Goal Progress */}
                {savingsGoal > 0 && (
                  <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-yellow-50"}`}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium flex items-center">
                        <FaPiggyBank className="mr-2 text-yellow-500" />
                        Goal Progress
                      </span>
                      <span className="text-sm font-medium">
                        {savingsProgress.toFixed(1)}%
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-3 ${
                      darkMode ? "bg-gray-600" : "bg-gray-200"
                    }`}>
                      <div 
                        className={`h-3 rounded-full ${
                          savingsProgress > 75 ? "bg-green-500" : 
                          savingsProgress > 50 ? "bg-yellow-500" : "bg-red-500"
                        }`} 
                        style={{ width: `${Math.min(savingsProgress, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Goal: ${savingsGoal.toLocaleString()}</span>
                      <span>Achieved: ${((savingsGoal * savingsProgress) / 100).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Display raw response if parsing failed */}
              {!analysis.spendingSnapshot?.length && !analysis.smartSwaps?.length && analysis.rawResponse && (
                <div className={`mb-6 p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-yellow-50"
                }`}>
                  <h3 className="font-semibold mb-2 text-lg">Analysis Results</h3>
                  <pre className={`whitespace-pre-wrap text-sm ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}>
                    {typeof analysis.rawResponse === 'string' 
                      ? analysis.rawResponse 
                      : JSON.stringify(analysis.rawResponse, null, 2)}
                  </pre>
                </div>
              )}

              {/* Analysis Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Spending Snapshot Section */}
                {analysis.spendingSnapshot?.length > 0 && (
                  <div className={`p-4 rounded-xl border-l-4 border-indigo-500 ${
                    darkMode ? "bg-gray-700" : "bg-indigo-50"
                  }`}>
                    <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
                      <FaChartPie className="text-indigo-500" /> Spending Snapshot
                    </h3>
                    <ul className="space-y-2">
                      {analysis.spendingSnapshot.map((item, index) => (
                        <li key={`snapshot-${index}`} className="flex items-start">
                          <span className="text-indigo-500 mr-2 mt-1 flex-shrink-0">•</span>
                          <span className="whitespace-pre-wrap text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Smart Swaps Section */}
                {analysis.smartSwaps?.length > 0 && (
                  <div className={`p-4 rounded-xl border-l-4 border-green-500 ${
                    darkMode ? "bg-gray-700" : "bg-green-50"
                  }`}>
                    <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
                      <FaLightbulb className="text-yellow-500" /> Smart Swaps
                    </h3>
                    <ul className="space-y-2">
                      {analysis.smartSwaps.map((item, index) => (
                        <li key={`swap-${index}`} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1 flex-shrink-0">•</span>
                          <span className="whitespace-pre-wrap text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Progress Plan Section */}
                {analysis.progressPlan?.length > 0 && (
                  <div className={`p-4 rounded-xl border-l-4 border-purple-500 ${
                    darkMode ? "bg-gray-700" : "bg-purple-50"
                  }`}>
                    <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
                      <FaChartLine className="text-purple-500" /> Progress Plan
                    </h3>
                    <ul className="space-y-2">
                      {analysis.progressPlan.map((item, index) => (
                        <li key={`plan-${index}`} className="flex items-start">
                          <span className="text-purple-500 mr-2 mt-1 flex-shrink-0">•</span>
                          <span className="whitespace-pre-wrap text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reality Check Section */}
                {analysis.realityCheck?.length > 0 && (
                  <div className={`p-4 rounded-xl border-l-4 border-red-500 ${
                    darkMode ? "bg-red-900/30" : "bg-red-50"
                  }`}>
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <FaExclamationTriangle className="text-red-500" /> Reality Check
                    </h4>
                    <ul className="space-y-2">
                      {analysis.realityCheck.map((item, index) => (
                        <li key={`reality-${index}`} className="flex items-start">
                          <span className="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                          <span className="whitespace-pre-wrap text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Daily Logs Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`rounded-2xl shadow-xl overflow-hidden lg:col-span-12 ${darkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <FaHistory className="text-indigo-500" /> Expense History
                </h3>
                {dailyLogs.length > 0 && (
                  <button 
                    onClick={clearDailyLogs}
                    className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <FaTrash size={12} /> Clear All
                  </button>
                )}
              </div>
              {dailyLogs.length === 0 ? (
                <p className="text-sm italic p-4 text-center text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  No expense history yet. Save your expenses to see them here.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dailyLogs.map(item => (
                    <motion.div 
                      key={item.id} 
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl cursor-pointer transition ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"} border ${darkMode ? "border-gray-600" : "border-gray-200"}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-indigo-500" />
                          <div className="font-medium">
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          ${item.totalAmount.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 mb-3">
                        {item.expenses.length} {item.expenses.length === 1 ? 'item' : 'items'}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {item.expenses.slice(0, 4).map((expense, idx) => (
                          <div key={idx} className="truncate py-1 px-2 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                            {expense.category}: ${parseFloat(expense.amount).toFixed(2)}
                          </div>
                        ))}
                        {item.expenses.length > 4 && (
                          <div className="text-gray-500 py-1 px-2">
                            +{item.expenses.length - 4} more
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end gap-2 mt-3">
                        <button
                          onClick={() => loadFromDailyLogs(item)}
                          className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg flex items-center gap-1"
                        >
                          <FaEdit size={10} /> View
                        </button>
                        <button
                          onClick={() => deleteLogItem(item.id)}
                          className="text-xs bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg flex items-center gap-1"
                        >
                          <FaTrash size={10} /> Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};