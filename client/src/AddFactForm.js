import { useState } from "react";

function AddFactForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/api/didyouknow/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, userId, username })  // <-- Add userId, username here
  });


    const result = await response.json();
    alert(result.message || "Error adding post");

    setTitle("");
    setContent("");
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
        /><br /><br />
        <textarea
          placeholder="Write your interesting fact here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default AddFactForm;
