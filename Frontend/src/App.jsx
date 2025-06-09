import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ExpenseTracker from "./pages/EmotionalAnalyzer";
import EmotionalAnalyzer from "./pages/ExpenseTracker";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/expense" element={<ExpenseTracker />} />
        <Route path="/emotion" element={<EmotionalAnalyzer />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  );
};

export default App;
