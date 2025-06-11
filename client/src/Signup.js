import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "./api"; // ✅ for centralized config

function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    city: "",
    country: "",
    bio: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("🎉 Registered successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  return (
    <div className="signup-container" style={{ maxWidth: 480, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}> Get Started, With CoolStation ID</h2>
      <p style={{ textAlign: "center", marginBottom: 20 }}>
        Sign up for free and start exploring CS resources!
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input type="text" name="firstname" placeholder="First Name" required value={formData.firstname} onChange={handleChange} style={{ padding: 10, fontSize: 16 }} />
        <input type="text" name="middlename" placeholder="Middle Name (optional)" value={formData.middlename} onChange={handleChange} style={{ padding: 10, fontSize: 16 }} />
        <input type="text" name="lastname" placeholder="Last Name" required value={formData.lastname} onChange={handleChange} style={{ padding: 10, fontSize: 16 }} />
        <input type="date" name="dob" required value={formData.dob} onChange={handleChange} style={{ padding: 10, fontSize: 16 }} />
        <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleChange} style={{ padding: 10, fontSize: 16 }} />
        <input type="text" name="country" placeholder="Country" required value={formData.country} onChange={handleChange} style={{ padding: 10, fontSize: 16 }} />
        <textarea name="bio" placeholder="Bio (tell us about yourself)" rows="3" value={formData.bio} onChange={handleChange} style={{ padding: 10, fontSize: 16 }} />
        <input type="text" name="username" placeholder="Username" required value={formData.username} onChange={handleChange} style={{ padding: 10, fontSize: 16 }} />
        <input type="password" name="password" placeholder="Create Password" required value={formData.password} onChange={handleChange} style={{ padding: 10, fontSize: 16 }} />
        <button type="submit" style={{ padding: 14, fontSize: 18, backgroundColor: "#007bff", color: "white", border: "none", borderRadius: 4, cursor: "pointer", marginTop: 10 }}>
          Sign Up
        </button>
      </form>

      {message && (
        <p style={{ marginTop: 20, textAlign: "center", color: message.startsWith("🎉") ? "green" : "red", fontWeight: "bold" }}>
          {message}
        </p>
      )}

      <p style={{ textAlign: "center", marginTop: 25 }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#007bff", textDecoration: "underline" }}>
          Log in here
        </Link>
      </p>
    </div>
  );
}

export default Signup;
