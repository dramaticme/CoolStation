// src/AddFactForm.js
import { useState } from "react";
import api from "./api"; // ✅ Import Axios instance

function AddFactForm({ userId, username, onPostSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill out both title and content.");
      return;
    }

    try {
      const res = await api.post("/api/didyouknow/add", {
        title,
        content,
        username,
        userId,
      });

      if (res.status === 200) {
        alert(res.data.message);
        setTitle("");
        setContent("");
        if (onPostSuccess) onPostSuccess(); // Trigger parent refresh
      } else {
        alert(res.data.message || "Failed to add post.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>Add Post</h2>
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
          style={{ width: "1032px", height: "62px" }}
        />
        <br /><br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default AddFactForm;
