import { useState, useEffect } from 'react';

export const useEmotionData = () => {
  // State for user-entered activities
  const [activities, setActivities] = useState({
    morning: "",
    afternoon: "",
    evening: "",
    night: ""
  });

  // State for analysis results
  const [analysis, setAnalysis] = useState(null);

  // State for history of analyses
  const [history, setHistory] = useState([]);

  // Log initial state
  console.log("[useEmotionData] Initializing hook");
  console.log("[useEmotionData] Initial activities:", activities);
  console.log("[useEmotionData] Initial analysis:", analysis);
  console.log("[useEmotionData] Initial history:", history);

  // Load history from localStorage when component mounts
  useEffect(() => {
    console.log("[useEmotionData] useEffect: Loading from localStorage");
    try {
      const stored = JSON.parse(localStorage.getItem("emotionHistory")) || [];
      console.log("[useEmotionData] Loaded from localStorage:", stored);
      setHistory(stored);
    } catch (error) {
      console.error("[useEmotionData] Error loading from localStorage:", error);
      setHistory([]);
    }
  }, []);

  // Update localStorage whenever history changes
  useEffect(() => {
    console.log("[useEmotionData] useEffect: History changed, updating localStorage");
    console.log("[useEmotionData] Current history:", history);
    
    if (history.length > 0) {
      try {
        localStorage.setItem("emotionHistory", JSON.stringify(history));
        console.log("[useEmotionData] Successfully updated localStorage");
      } catch (error) {
        console.error("[useEmotionData] Error saving to localStorage:", error);
      }
    }
  }, [history]);

  // Log when activities change
  useEffect(() => {
    console.log("[useEmotionData] Activities updated:", activities);
  }, [activities]);

  // Log when analysis changes
  useEffect(() => {
    console.log("[useEmotionData] Analysis updated:", analysis);
  }, [analysis]);

  // Function to add new analysis to history
  const addToHistory = (newEntry) => {
     const updatedHistory = [newEntry, ...history];
     setHistory(updatedHistory);
    setAnalysis(newEntry);
  };

  // Function to clear history
  const clearHistory = () => {
     setHistory([]);
    localStorage.removeItem("emotionHistory");
  };

  // Function to delete a single history item
  const deleteHistoryItem = (id) => {
     const updatedHistory = history.filter(item => item.id !== id);
     setHistory(updatedHistory);
  };

  return {
    // State
    activities,
    analysis,
    history,
    
    // Setters
    setActivities,
    setAnalysis,
    
    // Functions
    addToHistory,
    clearHistory,
    deleteHistoryItem
  };
};