import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { 
  FaShareAlt, FaSave, FaSun, FaMoon, FaPlus, 
  FaTrash, FaExclamationTriangle, FaChartLine,
  FaFileExport, FaFilter, FaHistory, FaPiggyBank,
  FaLightbulb, FaBell, FaChartPie, FaMoneyBillWave, 
  FaTimes, FaChevronDown, FaChevronUp, FaCalendarAlt,
  FaEdit, FaSync
} from "react-icons/fa";
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpenseTracker = () => {
  // Load initial state from localStorage
  const loadInitialState = () => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedDailyLogs = localStorage.getItem('dailyExpenseLogs');
    const savedSettings = localStorage.getItem('expenseSettings');
    
    return {
      expenses: savedExpenses ? JSON.parse(savedExpenses) : [{ 
        id: Date.now(), 
        amount: "", 
        category: "Food", 
        date: new Date().toISOString().split('T')[0],
        description: ""
      }],
      dailyLogs: savedDailyLogs ? JSON.parse(savedDailyLogs) : [],
      darkMode: savedSettings ? JSON.parse(savedSettings).darkMode || false : false,
      savingsGoal: savedSettings ? JSON.parse(savedSettings).savingsGoal || 0 : 0,
      monthlyEarning: savedSettings ? JSON.parse(savedSettings).monthlyEarning || 0 : 0
    };
  };

  const initialState = loadInitialState();
  
  const [expenses, setExpenses] = useState(initialState.expenses);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(initialState.darkMode);
  const [dailyLogs, setDailyLogs] = useState(initialState.dailyLogs);
  const [showDailyLogs, setShowDailyLogs] = useState(false);
  const [savingsGoal, setSavingsGoal] = useState(initialState.savingsGoal);
  const [monthlyEarning, setMonthlyEarning] = useState(initialState.monthlyEarning);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "Food", "Transportation", "Housing", 
    "Entertainment", "Healthcare", "Education",
    "Shopping", "Utilities", "Other"
  ];

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('dailyExpenseLogs', JSON.stringify(dailyLogs));
  }, [dailyLogs]);

  useEffect(() => {
    const settings = { darkMode, savingsGoal, monthlyEarning };
    localStorage.setItem('expenseSettings', JSON.stringify(settings));
  }, [darkMode, savingsGoal, monthlyEarning]);

  const handleExpenseChange = (id, field, value) => {
    setExpenses(expenses.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addExpense = () => {
    setExpenses([...expenses, { 
      id: Date.now(), 
      amount: "", 
      category: "Food",
      date: new Date().toISOString().split('T')[0],
      description: ""
    }]);
  };

  const removeExpense = (id) => {
    if (expenses.length > 1) {
      setExpenses(expenses.filter(exp => exp.id !== id));
    }
  };

  const validateExpenses = () => {
    const invalidExpenses = expenses.some(exp => {
      const amount = parseFloat(exp.amount);
      return isNaN(amount) || amount <= 0 || !exp.category;
    });
    
    if (invalidExpenses) {
      setError("Please enter valid amounts (> 0) and select categories for all expenses");
      return false;
    }
    
    return true;
  };

  const parseTextResponse = (text) => {
    const result = {
      spendingSnapshot: [],
      smartSwaps: [],
      progressPlan: [],
      realityCheck: [],
      rawResponse: text
    };

    // Extract Spending Snapshot
    const snapshotRegex = /1\. SPENDING SNAPSHOT([\s\S]*?)(?=2\. SMART SWAPS|$)/i;
    const snapshotMatch = text.match(snapshotRegex);
    if (snapshotMatch) {
      result.spendingSnapshot = snapshotMatch[1].trim().split('\n')
        .filter(line => line.trim().match(/^[•\-*]|\d\./))
        .map(line => line.replace(/^[•\-*\d\.\s]+/, '').trim())
        .filter(line => line.length > 0);
    }

    // Extract Smart Swaps
    const swapsRegex = /2\. SMART SWAPS([\s\S]*?)(?=3\. PROGRESS PLAN|$)/i;
    const swapsMatch = text.match(swapsRegex);
    if (swapsMatch) {
      result.smartSwaps = swapsMatch[1].trim().split('\n')
        .filter(line => line.trim().match(/^[•\-*]|\d\./))
        .map(line => line.replace(/^[•\-*\d\.\s]+/, '').trim())
        .filter(line => line.length > 0);
    }

    // Extract Progress Plan
    const progressRegex = /3\. PROGRESS PLAN([\s\S]*?)(?=4\. REALITY CHECK|$)/i;
    const progressMatch = text.match(progressRegex);
    if (progressMatch) {
      result.progressPlan = progressMatch[1].trim().split('\n')
        .filter(line => line.trim().match(/^[•\-*]|\d\./))
        .map(line => line.replace(/^[•\-*\d\.\s]+/, '').trim())
        .filter(line => line.length > 0);
    }

    // Extract Reality Check
    const realityRegex = /4\. REALITY CHECK([\s\S]*?)(?=5\.|$)/i;
    const realityMatch = text.match(realityRegex);
    if (realityMatch) {
      result.realityCheck = realityMatch[1].trim().split('\n')
        .filter(line => line.trim().match(/^[•\-*]|\d\./))
        .map(line => line.replace(/^[•\-*\d\.\s]+/, '').trim())
        .filter(line => line.length > 0);
    }

    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateExpenses()) return;
    
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

    const expenseLines = expenses.map(exp => {
      let line = `- ${exp.category}: $${parseFloat(exp.amount).toFixed(2)}`;
      if (exp.description && exp.description.trim() !== "") {
        line += ` (${exp.description.trim()})`;
      }
      return line;
    }).join("\n");

    const prompt = `Analyze these daily expenses in detail and provide specific, actionable advice:\n${expenseLines}\n\nProvide a comprehensive analysis with these sections:
    
    1. SPENDING SNAPSHOT
    - Total amount and percentage of income
    - Top spending categories with percentages
    - Biggest waste areas
    
    2. SMART SWAPS
    - Specific alternatives to reduce spending
    - Quick wins with estimated savings
    
    3. PROGRESS PLAN
    - Weekly, monthly, and yearly action steps
    - Concrete savings milestones
    
    4. REALITY CHECK
    - Long-term impact of current spending
    - Harsh truths about financial habits
    
    Be brutally honest, data-driven, and hyper-specific. Focus on practical changes rather than general advice. Format with clear section headings in ALL CAPS.`;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai/expense",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 30000
        }
      );
      
      console.log("API Response:", response.data);

      // Parse the response
      let parsedResponse;
      if (typeof response.data === 'string') {
        parsedResponse = parseTextResponse(response.data);
      } else {
        parsedResponse = {
          spendingSnapshot: response.data.spendingSnapshot || [],
          smartSwaps: response.data.smartSwaps || [],
          progressPlan: response.data.progressPlan || [],
          realityCheck: response.data.realityCheck || [],
          rawResponse: response.data
        };
      }
      
      setAnalysis(parsedResponse);
      
      // Generate notifications based on analysis
      const newNotifications = [];
      if (parsedResponse.realityCheck?.length > 0) {
        newNotifications.push({
          id: Date.now(),
          type: 'warning',
          message: parsedResponse.realityCheck[0],
          read: false
        });
      }
      
      if (parsedResponse.smartSwaps?.length > 0) {
        newNotifications.push({
          id: Date.now() + 1,
          type: 'info',
          message: `Smart swap: ${parsedResponse.smartSwaps[0]}`,
          read: false
        });
      }
      
      setNotifications(prev => [...newNotifications, ...prev]);
      
      // Show success toast
      toast.success('Daily expense analysis completed!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        className: '!bg-blue-500 !text-white'
      });
    } catch (err) {
      console.error("API Error:", {
        message: err.message,
        response: err.response?.data
      });

      let errorMessage = "Failed to analyze expenses. Please try again.";
      
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "Invalid request. Please check your inputs.";
        } else if (err.response.status === 401) {
          errorMessage = "Session expired. Please log in again.";
          navigate("/login");
        }
      }
      
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        className: '!bg-red-500 !text-white'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveCurrentDay = () => {
    if (!validateExpenses()) return;
    
    const totalAmount = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    const today = new Date().toISOString().split('T')[0];
    
    const existingLogIndex = dailyLogs.findIndex(log => 
      log.date.split('T')[0] === today
    );
    
    const newLogItem = {
      id: Date.now(),
      date: new Date().toISOString(),
      expenses: [...expenses],
      analysis: analysis || null,
      totalAmount
    };
    
    let updatedLogs;
    if (existingLogIndex >= 0) {
      updatedLogs = [...dailyLogs];
      updatedLogs[existingLogIndex] = newLogItem;
      toast.info('Updated today\'s log', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        className: '!bg-blue-500 !text-white'
      });
    } else {
      updatedLogs = [newLogItem, ...dailyLogs];
      toast.success('Saved today\'s expenses', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        className: '!bg-green-500 !text-white'
      });
    }
    
    setDailyLogs(updatedLogs);
  };

  const loadFromDailyLogs = (logItem) => {
    setExpenses(logItem.expenses);
    setAnalysis(logItem.analysis);
    setShowDailyLogs(false);
    setEditingLogId(logItem.id);
    
    toast.info('Loaded from daily logs', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "light",
      className: '!bg-blue-500 !text-white'
    });
  };

  const deleteLogItem = (id) => {
    setDailyLogs(dailyLogs.filter(log => log.id !== id));
    toast.info('Deleted log entry', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "light",
      className: '!bg-blue-500 !text-white'
    });
  };

  const clearDailyLogs = () => {
    setDailyLogs([]);
    toast.info('Daily logs cleared', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "light",
      className: '!bg-blue-500 !text-white'
    });
  };

  const refreshExpenses = () => {
    setExpenses([{ 
      id: Date.now(), 
      amount: "", 
      category: "Food", 
      date: new Date().toISOString().split('T')[0],
      description: ""
    }]);
    setAnalysis(null);
    setError("");
    
    toast.info('Expenses refreshed', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "light",
      className: '!bg-blue-500 !text-white'
    });
  };

  const exportAsImage = async () => {
    const element = document.getElementById('analysis-section');
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: darkMode ? '#1F2937' : '#FFFFFF'
      });
      canvas.toBlob((blob) => {
        saveAs(blob, 'daily-expense-analysis.png');
      });
      toast.success('Image exported successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        className: '!bg-green-500 !text-white'
      });
    } catch (err) {
      console.error('Error exporting image:', err);
      setError("Failed to export analysis as image");
    }
  };

  const exportAsCSV = () => {
    if (!analysis) return;
    
    const headers = ['Category', 'Amount'];
    const rows = expenses.map(exp => [
      exp.category,
      parseFloat(exp.amount).toFixed(2)
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "daily_expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('CSV exported successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "light",
      className: '!bg-green-500 !text-white'
    });
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const removeNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const calculateSavingsProgress = () => {
    if (!analysis || savingsGoal <= 0) return 0;
    
    const totalSpent = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    return Math.min(Math.max((savingsGoal - totalSpent) / savingsGoal * 100, 0), 100);
  };

  const savingsProgress = calculateSavingsProgress();

  const calculateSavingsPercentage = () => {
    if (!analysis || monthlyEarning <= 0) return 0;
    const totalSpent = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    return Math.min(Math.max((monthlyEarning - totalSpent) / monthlyEarning * 100, 0), 100);
  };

  const savingsPercentage = calculateSavingsPercentage();

  const handleNumberInputChange = (setter, e) => {
    const value = e.target.value;
    if (value === '') {
      setter(0);
    } else {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        setter(num);
      }
    }
  };

  return (
    <div className={`flex items-center justify-center w-full min-h-screen p-4 transition-all ${
      darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
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
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full ${analysis ? "max-w-7xl" : "max-w-3xl"} p-6 rounded-xl shadow-2xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center flex items-center gap-3">
            <FaChartLine className="text-blue-500" /> 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Daily Expense Tracker
            </span>
          </h1>
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
                    className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg z-10 ${darkMode ? "bg-gray-700" : "bg-white"} border ${darkMode ? "border-gray-600" : "border-gray-200"}`}
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

        <p className="text-center mb-6 text-gray-600">
          Track and optimize your daily spending habits
        </p>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded flex items-center"
          >
            <FaExclamationTriangle className="mr-2" />
            <p>{error}</p>
          </motion.div>
        )}

        {/* Daily Logs Panel */}
        <AnimatePresence>
          {showDailyLogs && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-6 overflow-hidden rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <FaHistory /> Expense History
                  </h3>
                  {dailyLogs.length > 0 && (
                    <button 
                      onClick={clearDailyLogs}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                {dailyLogs.length === 0 ? (
                  <p className="text-sm italic p-2">No expense history yet. Save your expenses to see them here.</p>
                ) : (
                  <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {dailyLogs.map(item => (
                      <motion.li 
                        key={item.id} 
                        whileHover={{ scale: 1.01 }}
                        className={`p-3 rounded-lg cursor-pointer transition ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">
                              {new Date(item.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm">
                              Total: ${item.totalAmount.toFixed(2)}
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-xs text-gray-500">
                              {item.expenses.length} {item.expenses.length === 1 ? 'item' : 'items'}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                          {item.expenses.slice(0, 4).map((expense, idx) => (
                            <div key={idx} className="truncate">
                              {expense.category}: ${parseFloat(expense.amount).toFixed(2)}
                            </div>
                          ))}
                          {item.expenses.length > 4 && (
                            <div className="text-gray-500">
                              +{item.expenses.length - 4} more
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={() => loadFromDailyLogs(item)}
                            className="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded flex items-center gap-1"
                          >
                            <FaEdit size={10} /> View
                          </button>
                          <button
                            onClick={() => deleteLogItem(item.id)}
                            className="text-xs bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded flex items-center gap-1"
                          >
                            <FaTrash size={10} /> Delete
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

        <div className={`flex max-h-[70vh] flex-col ${analysis ? "md:flex-row gap-6" : "items-center"}`}>
          {/* Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            className={`flex flex-col w-full ${analysis ? "md:w-1/2" : "max-w-2xl"} p-6 rounded-xl shadow-lg ${
              darkMode ? "bg-gray-700" : "bg-gradient-to-br from-blue-50 to-purple-50"
            } hover:shadow-xl transition-all`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-center mb-4">
              <label className={`block font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                Today's Expenses ({new Date().toLocaleDateString()})
              </label>
              <button
                type="button"
                onClick={refreshExpenses}
                className="p-2 rounded-xl transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
                title="Refresh expenses"
              >
                <FaSync className={darkMode ? "text-white" : "text-gray-800"} />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>Expenses:</label>
                <button
                  type="button"
                  onClick={addExpense}
                  className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-xl transition"
                >
                  <FaPlus size={12} /> Add Expense
                </button>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto p-2 pr-1">
                {expenses.map((expense) => (
                  <motion.div 
                    key={expense.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-3 items-center"
                  >
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      className={`w-1/4 border rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "border-gray-300 bg-white"
                      }`}
                      placeholder="Amount"
                      value={expense.amount}
                      onChange={(e) => handleExpenseChange(expense.id, "amount", e.target.value)}
                      required
                    />
                    <select
                      className={`w-1/4 border rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "border-gray-300 bg-white"
                      }`}
                      value={expense.category}
                      onChange={(e) => handleExpenseChange(expense.id, "category", e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      className={`w-1/4 border rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "border-gray-300 bg-white"
                      }`}
                      value={expense.date}
                      onChange={(e) => handleExpenseChange(expense.id, "date", e.target.value)}
                    />
                    <input
                      type="text"
                      className={`w-1/4 border rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "border-gray-300 bg-white"
                      }`}
                      placeholder="Description"
                      value={expense.description}
                      onChange={(e) => handleExpenseChange(expense.id, "description", e.target.value)}
                    />
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
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Monthly Earning Input */}
            <div className="mb-4">
              <label className={`block mb-2 font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                <FaMoneyBillWave className="inline mr-2" />
                Monthly Earnings ($):
              </label>
              <input
                type="number"
                min="0"
                step="1"
                className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? "bg-gray-600 border-gray-500 text-white" : "border-gray-300 bg-white"
                }`}
                placeholder="Enter your monthly earnings"
                value={monthlyEarning || ''}
                onChange={(e) => handleNumberInputChange(setMonthlyEarning, e)}
              />
            </div>

            {/* Savings Goal Input */}
            <div className="mb-4">
              <label className={`block mb-2 font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                <FaPiggyBank className="inline mr-2" />
                Monthly Savings Goal ($):
              </label>
              <input
                type="number"
                min="0"
                step="1"
                className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? "bg-gray-600 border-gray-500 text-white" : "border-gray-300 bg-white"
                }`}
                placeholder="Enter your savings goal"
                value={savingsGoal || ''}
                onChange={(e) => handleNumberInputChange(setSavingsGoal, e)}
              />
            </div>

            <div className="flex gap-3 mt-auto">
              <button
                type="button"
                onClick={saveCurrentDay}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition duration-300 transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
              >
                <FaSave className="mr-2" /> Save Day
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300 transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
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
                    Analyze
                  </>
                )}
              </button>
            </div>
          </motion.form>

          {/* Analysis Section */}
          <AnimatePresence>
            {analysis && (
              <motion.div
                id="analysis-section"
                className={`flex flex-col w-full md:w-1/2 p-6 rounded-xl shadow-md ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                } border ${darkMode ? "border-gray-600" : "border-gray-200"} relative overflow-y-auto`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaChartLine className="text-blue-500" /> Daily Spending Analysis
                </h2>
                
                {/* Display raw response if parsing failed */}
                {!analysis.spendingSnapshot.length && !analysis.smartSwaps.length && analysis.rawResponse && (
                  <div className={`mb-4 p-4 rounded-lg ${
                    darkMode ? "bg-gray-600" : "bg-yellow-50"
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

                {/* Savings Progress */}
                {monthlyEarning > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Savings Rate: {savingsPercentage.toFixed(1)}%
                      </span>
                      <span className="text-sm font-medium">
                        Earnings: ${monthlyEarning.toLocaleString()}
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-2.5 ${
                      darkMode ? "bg-gray-600" : "bg-gray-200"
                    }`}>
                      <div 
                        className={`h-2.5 rounded-full ${
                          savingsPercentage > 30 ? "bg-green-500" : 
                          savingsPercentage > 15 ? "bg-yellow-500" : "bg-red-500"
                        }`} 
                        style={{ width: `${savingsPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* Savings Goal Progress */}
                {savingsGoal > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Savings Progress: {savingsProgress.toFixed(1)}%
                      </span>
                      <span className="text-sm font-medium">
                        Goal: ${savingsGoal.toLocaleString()}
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-2.5 ${
                      darkMode ? "bg-gray-600" : "bg-gray-200"
                    }`}>
                      <div 
                        className={`h-2.5 rounded-full ${
                          savingsProgress > 75 ? "bg-green-500" : 
                          savingsProgress > 50 ? "bg-yellow-500" : "bg-red-500"
                        }`} 
                        style={{ width: `${savingsProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* Spending Snapshot Section */}
                {analysis.spendingSnapshot?.length > 0 && (
                  <div className={`mb-4 p-4 rounded-lg ${
                    darkMode ? "bg-gray-600" : "bg-blue-50"
                  }`}>
                    <h3 className="font-semibold mb-2 text-lg">Spending Snapshot</h3>
                    <ul className="space-y-2">
                      {analysis.spendingSnapshot.map((item, index) => (
                        <li key={`snapshot-${index}`} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="whitespace-pre-wrap">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Smart Swaps Section */}
                {analysis.smartSwaps?.length > 0 && (
                  <div className={`mb-4 p-4 rounded-lg ${
                    darkMode ? "bg-gray-600" : "bg-green-50"
                  }`}>
                    <h3 className="font-semibold mb-2 text-lg flex items-center gap-2">
                      <FaLightbulb className="text-yellow-500" /> Smart Swaps
                    </h3>
                    <ul className="space-y-2">
                      {analysis.smartSwaps.map((item, index) => (
                        <li key={`swap-${index}`} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span className="whitespace-pre-wrap">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Progress Plan Section */}
                {analysis.progressPlan?.length > 0 && (
                  <div className={`mb-4 p-4 rounded-lg ${
                    darkMode ? "bg-gray-600" : "bg-purple-50"
                  }`}>
                    <h3 className="font-semibold mb-2 text-lg">Progress Plan</h3>
                    <ul className="space-y-2">
                      {analysis.progressPlan.map((item, index) => (
                        <li key={`plan-${index}`} className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span className="whitespace-pre-wrap">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reality Check Section */}
                {analysis.realityCheck?.length > 0 && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    darkMode ? "bg-red-900" : "bg-red-100"
                  }`}>
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <FaExclamationTriangle className="text-red-500" /> Reality Check
                    </h4>
                    <ul className="space-y-2">
                      {analysis.realityCheck.map((item, index) => (
                        <li key={`reality-${index}`} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          <span className="whitespace-pre-wrap">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Action Buttons */}
               
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ExpenseTracker;