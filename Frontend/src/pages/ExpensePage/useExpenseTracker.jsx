import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const useExpenseTracker = () => {
  const navigate = useNavigate();
  
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
  const [showHistory, setShowHistory] = useState(false);

  const viewHistory = () => {
    setShowDailyLogs(true);
    setShowHistory(true);
  };

  const categories = [
    "Food", "Transportation", "Housing", 
    "Entertainment", "Healthcare", "Education",
    "Shopping", "Utilities", "Other"
  ];

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('dailyExpenseLogs', JSON.stringify(dailyLogs));
    localStorage.setItem('expenseSettings', JSON.stringify({
      darkMode,
      savingsGoal,
      monthlyEarning
    }));
  }, [expenses, dailyLogs, darkMode, savingsGoal, monthlyEarning]);
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
      navigate("/register");
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
        `${import.meta.env.VITE_API_URL}/api/ai/expense`,
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

  // Return all state and functions needed by the UI
  return {
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
    setExpenses,
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
  };
};