// src/EditProfile.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    city: "",
    country: "",
    bio: "",
  });
  const [message, setMessage] = useState("");

  // Fetch user data
  useEffect(() => {
  fetch(`http://localhost:5000/api/users/${id}`)
    .then(res => {
      console.log("Response status:", res.status); // ✅ Add this
      if (!res.ok) throw new Error("Failed to fetch user data");
      return res.json();
    })
    .then(data => {
      console.log("Fetched user data:", data); // ✅ Add this
      setFormData({
        firstname: data.firstname || "",
        middlename: data.middlename || "",
        lastname: data.lastname || "",
        dob: data.dob || "",
        city: data.city || "",
        country: data.country || "",
        bio: data.bio || "",
      });
    })
    .catch(err => {
      console.error("Error fetching user profile:", err);
      setMessage("⚠️ Could not load profile data.");
    });
}, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});

     

      if (!res.ok) throw new Error("Update failed");
      setMessage("✅ Profile updated successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Failed to update profile.");
    }
  };

  return (
    <div className="edit-profile-container" style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input name="firstname" value={formData.firstname} onChange={handleChange} placeholder="First Name" required />
        <input name="middlename" value={formData.middlename} onChange={handleChange} placeholder="Middle Name" />
        <input name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Last Name" required />
        <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />
        <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
        <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" rows="3" />
        <button type="submit" style={{ padding: 10, backgroundColor: "#007bff", color: "white", border: "none", borderRadius: 4 }}>
          Save Changes
        </button>
      </form>

      {message && (
        <p style={{ marginTop: 15, textAlign: "center", color: message.startsWith("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default EditProfile;
