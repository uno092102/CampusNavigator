import React, { useState } from "react";
import { Helmet } from "react-helmet";

const AnnouncementApp = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "General",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      alert("Please fill all required fields!");
      return;
    }

    const newAnnouncement = {
      announcementID: announcements.length + 1,
      title: form.title,
      content: form.content,
      category: form.category,
      postTimestamp: new Date().toISOString(),
    };

    setAnnouncements((prevAnnouncements) => [...prevAnnouncements, newAnnouncement]);
    setForm({ title: "", content: "", category: "General" });
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
        <button type="submit" style={styles.button}>
          Add Announcement
        </button>
      </form>

      {/* Announcements List */}
      <h2 style={styles.subHeader}>📋 Announcements</h2>
      <div style={styles.cardContainer}>
        {announcements.map((announcement) => (
          <div key={announcement.announcementID} style={styles.card}>
            <h3 style={styles.cardTitle}>{announcement.title}</h3>
            <p style={styles.cardContent}>{announcement.content}</p>
            <div style={styles.cardMeta}>
              <p>
                <strong>Category:</strong> {announcement.category}
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(announcement.postTimestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
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
  subHeader: {
    marginTop: "20px",
    color: "#444",
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
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    margin: "0 0 10px",
    fontSize: "1.2em",
    color: "#333",
  },
  cardContent: {
    color: "#666",
  },
  cardMeta: {
    marginTop: "10px",
    fontSize: "0.9em",
    color: "#555",
  },
};

export default AnnouncementApp;
