// src/App.js
import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import AddFactForm from "./AddFactForm";
import AllFacts from "./AllFacts";
import Signup from "./Signup";
import Login from "./Login";
import { ThemeContext } from "./ThemeContext";
import "./App.css";

// Home Page Component
function Home({ userId, username }) {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <header className="app-header">
        <div className="logo-section">
          <h1>👩‍💻 Welcome to CoolStation!</h1>
          <div className="nav-links">
            <Link to="/login" className="nav-btn">🔐 Login</Link>
            <Link to="/signup" className="nav-btn">📝 Signup</Link>
          </div>
        </div>
        <p className="tagline">Your ultimate CS resource hub ✨</p>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <main className="main-content">
        <section className="form-section">
          <AddFactForm userId={userId} username={username || "Anonymous"} />
        </section>
        <section className="facts-section">
          <AllFacts userId={userId} />
        </section>
      </main>

      <footer className="footer">
        Made with ❤️ by Sakshi | MongoDB Cert Project
      </footer>
    </div>
  );
}

// Main App Component
function App() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  // Handle login success
  const handleLogin = (id, name) => {
    setUserId(id);
    setUsername(name);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            userId ? (
              <Home userId={userId} username={username} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
