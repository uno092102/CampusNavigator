import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";

const AnnouncementApp = () => {
  // State management
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "General",
  });
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const searchRef = useRef(null);

  // Header handler functions
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleResultClick = (item) => {
  };

  const handleNavigateToProfile = () => {
    // Close the dropdown and navigate to UserProfilePage
    setDropdownOpen(false);
    navigate("/userprofile");
  };

  const handleFeedback = () => {
    navigate("/Feedback");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Form handlers
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
    setForm({
      title: "",
      content: "",
      category: "General"
    });
  };

  return (
    <div>
      <header
        style={{
          position: "relative",
          backgroundColor: "#7757FF",
          color: "#FFFFFF",
          padding: "20px 40px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/homepage">
              <img
                src="/logoimg/Logodark.svg"
                alt="Logo"
                style={{ width: "240px", marginRight: "20px" }}
              />
            </Link>
            <form
              onSubmit={handleSearchSubmit}
              style={{ position: "relative" }}
              ref={searchRef}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  width: "300px",
                  padding: "8px 12px 8px 40px",
                  borderRadius: "20px",
                  border: "none",
                  backgroundColor: "#FFFFFF",
                  color: "#7757FF",
                  fontSize: "16px",
                }}
              />
              <FaSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "12px",
                  transform: "translateY(-50%)",
                  color: "#7757FF",
                }}
              />
              {searchResults.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "40px",
                    left: "0",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    zIndex: 1001,
                    width: "300px",
                    minWidth: "350px",
                    maxWidth: "90vw",
                    maxHeight: "80vh",
                    overflowY: "auto",
                  }}
                >
                  {searchResults.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                        cursor: "pointer",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                      onClick={() => handleResultClick(item)}
                    >
                      <strong style={{ color: "#7757FF" }}>
                        {item.type === "building"
                          ? item.building.name
                          : item.poi.name}
                      </strong>
                      <br />
                      <span>
                        {item.type === "building"
                          ? item.building.description
                          : item.poi.description}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <a
              href="/detail"
              style={{
                color: "#FFFFFF",
                marginRight: "30px",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              Building
            </a>
            <a
              href="/event"
              style={{
                color: "#FFFFFF",
                marginRight: "30px",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              Calendar
            </a>
            <a
              href="#"
              style={{
                color: "#FFFFFF",
                marginRight: "30px",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              Service
            </a>
            <a
              href="/announcement"
              style={{
                color: "#FFFFFF",
                marginRight: "30px",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              Announcement
            </a>

            <div style={{ marginRight: "20px", cursor: "pointer" }}>
              <a href="/notifications" style={{ color: "#FFFFFF" }}>
                <FaBell size={24} />
              </a>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <img
                src="https://picsum.photos/200/300"
                alt="User Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                }}
              />
              <span style={{ marginRight: "10px" }}>
                {user ? user.name : ""}
              </span>
              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "60px",
                    right: "0",
                    backgroundColor: "#FFFFFF",
                    color: "#7757FF",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    overflow: "hidden",
                    zIndex: 1001,
                    minWidth: "200px",
                  }}
                >
                  <div
                    onClick={handleNavigateToProfile}
                    style={{ padding: "10px 20px", cursor: "pointer" }}
                  >
                    Profile
                  </div>
                  <div style={{ padding: "10px 20px", cursor: "pointer" }}>
                    Help
                  </div>
                  <div
                    onClick={handleFeedback}
                    style={{ padding: "10px 20px", cursor: "pointer" }}
                  >
                    Feedback
                  </div>
                  <div
                    onClick={handleLogout}
                    style={{ padding: "10px 20px", cursor: "pointer" }}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div style={styles.container}>
        <Helmet>
          <title>Announcement - Campus Navigator</title>
        </Helmet>
        <h1 style={styles.header}>📢 Announcement Interface</h1>

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