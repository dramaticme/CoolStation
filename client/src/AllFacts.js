import { useEffect, useState } from "react";

function AllFacts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/didyouknow/all")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // Filtered list based on search
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>🔍 Search “Did You Know?” Posts</h2>

      <input
        type="text"
        placeholder="Search facts by keyword..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #aaa"
        }}
      />

      {filteredPosts.length === 0 ? (
        <p>No matching posts found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {filteredPosts.map((post) => (
            <div key={post._id} style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem",
              width: "300px",
              background: "#f9f9f9"
            }}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <small>📅 {new Date(post.postedAt).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllFacts;
