// useEmotionalAnalyzer.js
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEmotionData } from "../../components/data/useEmotionData";

export const useEmotionalAnalyzer = () => {
  // Load initial state from localStorage
  const loadInitialState = () => {
    const savedEmotions = localStorage.getItem('emotions');
    return savedEmotions ? JSON.parse(savedEmotions) : [];
  };

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

  // Save to localStorage whenever history changes
  useEffect(() => {
    if (history && history.length > 0) {
      localStorage.setItem('emotions', JSON.stringify(history));
    }
  }, [history]);

  // Activity suggestions data
  const activitySuggestions = {
    morning: [
      { icon: "FaRunning", text: "Morning jog in the park" },
      { icon: "FaBook", text: "Reading with coffee" },
      { icon: "FaMusic", text: "Listening to podcasts" }
    ],
    afternoon: [
      { icon: "FaUtensils", text: "Lunch with colleagues" },
      { icon: "FaBook", text: "Studying/working" },
      { icon: "FaLeaf", text: "Short walk outside" }
    ],
    evening: [
      { icon: "FaMusic", text: "Playing guitar" },
      { icon: "FaRunning", text: "Gym session" },
      { icon: "FaUtensils", text: "Cooking dinner" }
    ],
    night: [
      { icon: "FaBook", text: "Journaling" },
      { icon: "FaMusic", text: "Meditation" },
      { icon: "FaLeaf", text: "Planning next day" }
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
      navigate("/register");
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
  const getMoodChartData = () => {
    return {
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
  };

  // Mood icons based on analysis
  const getMoodIcon = (mood) => {
    if (mood?.toLowerCase().includes("positive")) return { icon: "FaRegSmile", className: "text-green-500" };
    if (mood?.toLowerCase().includes("negative")) return { icon: "FaRegFrown", className: "text-red-500" };
    return { icon: "FaRegMeh", className: "text-yellow-500" };
  };

  // Weekly trends data
  const weeklyTrendsData = {
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
  };

  // Return all state and functions needed by the UI
  return {
    // State
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
    
    // Data
    activitySuggestions,
    moodChartData: getMoodChartData(),
    weeklyTrendsData,
    
    // Functions
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
  };
};