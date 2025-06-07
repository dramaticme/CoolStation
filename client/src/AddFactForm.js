// src/AddFactForm.js
import { useState } from "react";

function AddFactForm({ userId, username }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill out both title and content.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/didyouknow/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          username,
          userId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setTitle("");
        setContent("");
      } else {
        alert(data.message || "Failed to add post.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>➕ Add a “Did You Know?” Fact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title (e.g. Did you know about AI?)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />
        <textarea
          placeholder="Write your interesting fact here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default AddFactForm;
