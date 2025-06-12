// src/App.js
import React, { useContext, useState } from "react"; // make sure useState is imported
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
// Inside Home component

function Home({ userId, username, onLogout }) {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [reloadPosts, setReloadPosts] = useState(false);
  const handlePostSuccess = () => {
    setReloadPosts(prev => !prev); // Toggle to trigger re-render
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <header className="app-header">
        <div className="logo-section">
          <h1>
            🦉 Welcome {userId ? username : "Guest"} to CoolStation!
          </h1>
          <div className="nav-links">
            {userId ? (
              <button onClick={onLogout} className="nav-btn">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="nav-btn">
                  🔐 Login
                </Link>
                <Link to="/signup" className="nav-btn">
                  📝 Signup
                </Link>
              </>
            )}
          </div>
        </div>

        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <main className="main-content">
        <section className="form-section">
          <AddFactForm userId={userId} username={username || "Anonymous"} 
          onPostSuccess={handlePostSuccess}
          />
        </section>
        <section className="facts-section">
          <AllFacts reload={reloadPosts} />
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

  // Handle logout
  const handleLogout = () => {
    setUserId(null);
    setUsername("");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            userId ? (
              <Home userId={userId} username={username} onLogout={handleLogout} />
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
