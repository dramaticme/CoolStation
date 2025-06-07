import React, { useContext } from "react";
import AddFactForm from "./AddFactForm";
import AllFacts from "./AllFacts";
import { ThemeContext } from "./ThemeContext";
import "./App.css"; // 👈 Be sure to style using this

function App() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-section">          
          <h1>👩‍💻 Welcome to CoolStation!</h1>
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
          <AddFactForm />
        </section>
        <section className="facts-section">
          <AllFacts />
        </section>
      </main>

      <footer className="footer">
        Made with by Sakshi | MongoDB Cert Project
      </footer>
    </div>
  );
}

export default App;



 
 
 
  
