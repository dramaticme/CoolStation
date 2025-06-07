import { useState } from "react";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Login successful!");
      onLogin(data.userId, formData.username);
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  return (
    <div>
      <h2>🔐 Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          required
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        /><br/><br/>
        <input
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        /><br/><br/>
        <button type="submit">Log In</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
