import React, { useState } from "react";
import { Helmet } from "react-helmet";

const AnnouncementApp = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "General",
    postedBy: "", // New input field for postedBy
  });

  const API_BASE_URL = "http://localhost:8080/api/announcement";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content || !form.postedBy) {
      alert("Please fill all required fields!");
      return;
    }
  
    try {
      const newAnnouncement = {
        title: form.title,
        content: form.content,
        category: form.category,
        postedBy: parseInt(form.postedBy, 10), // Convert to integer
      };
  
      const response = await fetch(`${API_BASE_URL}/postAnnouncement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
        body: JSON.stringify(newAnnouncement),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text(); // Get server error
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
      }
  
      alert("Announcement added successfully!");
      setForm({ title: "", content: "", category: "General", postedBy: "" });
    } catch (error) {
      console.error("Error adding announcement:", error.message);
      alert(`Failed to add announcement: ${error.message}`);
    }
  };
  
  

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Announcement - Campus Navigator</title>
      </Helmet>

      <h1 style={styles.header}>📢 Announcement Interface</h1>

      {/* Form */}
      <form onSubmit={handleAddAnnouncement} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Content:</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleInputChange}
            style={styles.textarea}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Category:</label>
          <select
            name="category"
            value={form.category}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="General">General</option>
            <option value="Event">Event</option>
            <option value="Alert">Alert</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Posted By:</label>
          <input
            type="text"
            name="postedBy"
            value={form.postedBy}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Add Announcement
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textarea: {
    display: "block",
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    height: "80px",
  },
  select: {
    display: "block",
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default AnnouncementApp;
