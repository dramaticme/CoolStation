import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "./api"; // ✅ optional but good for consistency

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setMessage("");

    try {
      const res = await api.post("/api/users/login", formData);

      if (res.data?.userId) {
        onLogin(res.data.userId, formData.username);
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage("❌ Invalid login credentials.");
      }
    } catch (error) {
      const errMsg = error.response?.data?.error || "Login failed.";
      setMessage(`❌ ${errMsg}`);
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Login to CoolStation</h2>
      <p style={{ textAlign: "center", marginBottom: 20 }}>
        Welcome back! Please enter your credentials.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Username"
          required
          autoFocus
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          style={{ padding: 10, marginBottom: 15, fontSize: 16 }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          style={{ padding: 10, marginBottom: 20, fontSize: 16 }}
        />
        <button
          type="submit"
          style={{
            padding: 12,
            fontSize: 18,
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Log In
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: 15,
            textAlign: "center",
            color: message.startsWith("✅") ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      <p style={{ textAlign: "center", marginTop: 25 }}>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "#007bff", textDecoration: "underline" }}>
          Sign up for free
        </Link>
      </p>
    </div>
  );
}

export default Login;
