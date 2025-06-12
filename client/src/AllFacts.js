import { useEffect, useState } from "react";
import "./AllFacts.css";

function AllFacts({ userId, reload }) {
  const [facts, setFacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/didyouknow/all");
        const data = await res.json();
        setFacts(data.reverse()); // newest first
      } catch (err) {
        console.error("Failed to fetch facts:", err);
      }
    };
    fetchFacts();
  }, [reload]);

  const filteredFacts = facts.filter((fact) =>
    fact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fact.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFavorite = async (factId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/didyouknow/${factId}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId || "", // use actual logged-in userId passed as prop
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to favorite fact");
      }

      const updatedFact = await res.json();

      // Update facts state with the updated fact data
      setFacts((prevFacts) =>
        prevFacts.map((fact) =>
          fact._id === updatedFact._id ? updatedFact : fact
        )
      );
    } catch (error) {
      console.error("Error favoriting fact:", error);
    }
  };

  return (
    <div>
      <h2>Search Post</h2>

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

      {filteredFacts.length === 0 ? (
        <p>No matching posts found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {filteredFacts.map((fact) => (
            <div
              key={fact._id}
              className="fact-card"
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "1rem",
                width: "300px",
                background: "#f9f9f9",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              <h3>{fact.title}</h3>
              <p>{fact.content}</p>

              <div
                className="fact-meta"
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.85rem",
                  color: "#555"
                }}
              >
                <span>
                  Posted by <strong>@{fact.username || "Anonymous"}</strong>
                </span>

                <div className="fact-actions">
                  <button onClick={() => handleFavorite(fact._id)}>
                    ❤️ Favorite ({fact.favorites?.length || 0})
                  </button>
                </div>

                <br />
                <span>📅 {new Date(fact.postedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllFacts;
