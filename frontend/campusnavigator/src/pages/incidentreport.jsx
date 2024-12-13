import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";

const IncidentReport = () => {
  const navigate = useNavigate();

  // State for Incident Reports
  const [incidentReports, setIncidentReports] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    incidentID: null,
    category: "",
    description: "",
    locationType: "",
    status: "",
    timestamp: "",
    userID: 0,
    locationID: 0,
  });

  // Header State
  const [searchText, setSearchText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // Initialize as null
  // Removed searchResults and related functions as per instruction
  const searchRef = useRef(null);

  const apiBaseURL = "http://localhost:8080/api/incidentreport";

  // User Authentication and Data Fetching
  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem("user"));
    if (!localUserData) {
      navigate("/login");
    } else {
      // Fetch all users to get the current user's admin status
      axios
        .get("http://localhost:8080/api/user/getAllSearch")
        .then((response) => {
          const usersData = response.data;
          // Find the current user in the list
          const fullUserData = usersData.find(
            (u) => u.userID === localUserData.userID
          );
          if (fullUserData) {
            setUser(fullUserData);
            console.log("Fetched full user data:", fullUserData);
          } else {
            console.error("User not found in getAllSearch");
            setUser(localUserData); // Use local data if not found
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUser(localUserData); // Use local data on error
        });
    }
  }, [navigate]);

  // Fetch Incident Reports
  const fetchIncidentReports = async () => {
    try {
      const response = await axios.get(`${apiBaseURL}/getAllIncidentReport`);
      setIncidentReports(response.data);
    } catch (error) {
      console.error("Error fetching incident reports:", error);
    }
  };

  useEffect(() => {
    fetchIncidentReports();
  }, []);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Create Incident Report
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBaseURL}/postIncidentReport`, {
        ...formData,
        locationid: 1, // Replace with actual logic if needed
        userid: user ? user.userID : 1, // Use user ID from state
      });
      fetchIncidentReports();
      resetForm();
    } catch (error) {
      console.error("Error creating incident report:", error);
    }
  };

  // Handle Update Incident Report
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        incidentID: formData.incidentID,
        category: formData.category,
        description: formData.description,
        locationType: formData.locationType,
        locationID: formData.locationID || 0,
        status: formData.status,
        timestamp: new Date(formData.timestamp).toISOString(),
        userID: formData.userID || (user ? user.userID : 0),
      };
      await axios.put(
        `${apiBaseURL}/putIncidentReport/${formData.incidentID}`,
        updateData
      );
      fetchIncidentReports();
      resetForm();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating incident report:", error);
    }
  };

  // Handle Delete Incident Report
  const handleDelete = async (incidentID) => {
    try {
      await axios.delete(`${apiBaseURL}/deleteIncidentReport/${incidentID}`);
      fetchIncidentReports();
    } catch (error) {
      console.error("Error deleting incident report:", error);
    }
  };

  // Handle Edit Incident Report
  const handleEdit = (incident) => {
    setFormData({
      incidentID: incident.incidentID,
      category: incident.category,
      description: incident.description,
      locationType: incident.locationType,
      status: incident.status,
      timestamp: incident.timestamp
        ? new Date(incident.timestamp).toISOString().slice(0, 16)
        : "",
      userID: incident.userID,
      locationID: incident.locationID,
    });
    setIsEditing(true);
  };

  // Reset Form Data
  const resetForm = () => {
    setFormData({
      incidentID: null,
      category: "",
      description: "",
      locationType: "",
      status: "",
      timestamp: "",
      userID: 0,
      locationID: 0,
    });
  };

  // Handle Navigation to Profile
  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  // Handle Feedback
  const handleFeedback = () => {
    navigate("/feedback");
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      // Removed justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to bottom, #7b5cf4, #b09cf6)",
      color: "#fefefe",
      paddingTop: "120px", // To prevent overlap with fixed header
    },
    headerContent: {
      fontSize: "2rem",
      marginBottom: "20px",
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
    },
    formContainer: {
      background: "#fff",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "500px",
      marginBottom: "20px",
      color: "#333",
      // Removed textAlign: "center",
    },
    form: {
      display: "grid",
      gap: "15px",
      // Removed textAlign: "center",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
      width: "100%", // Ensure inputs take full width
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#5b34b6",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    cancelButton: {
      backgroundColor: "#d9534f",
      marginLeft: "10px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      maxWidth: "1000px",
    },
    th: {
      backgroundColor: "#f2f2f2",
      padding: "10px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
      color: "#333",
    },
    td: {
      padding: "10px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
      color: "#333",
    },
    searchDropdown: {
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
    },
    searchResultItem: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      cursor: "pointer",
      whiteSpace: "normal",
      wordWrap: "break-word",
    },
    header: {
      position: "fixed",
      top: 0,
      width: "100%",
      backgroundColor: "#7757FF",
      color: "#FFFFFF",
      padding: "20px 40px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      zIndex: 1000,
    },
    headerInner: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logoSection: {
      display: "flex",
      alignItems: "center",
    },
    searchForm: {
      position: "relative",
    },
    searchInput: {
      width: "300px",
      padding: "8px 12px 8px 40px",
      borderRadius: "20px",
      border: "none",
      backgroundColor: "#FFFFFF",
      color: "#7757FF",
      fontSize: "16px",
    },
    searchIcon: {
      position: "absolute",
      top: "50%",
      left: "12px",
      transform: "translateY(-50%)",
      color: "#7757FF",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
    },
    navLink: {
      color: "#FFFFFF",
      marginRight: "30px",
      textDecoration: "none",
      fontSize: "16px",
    },
    notificationIcon: {
      marginRight: "20px",
      cursor: "pointer",
    },
    userProfile: {
      display: "flex",
      alignItems: "center",
      position: "relative",
    },
    userImage: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      marginRight: "10px",
      cursor: "pointer",
    },
    dropdownMenu: {
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
    },
    dropdownItem: {
      padding: "10px 20px",
      cursor: "pointer",
    },
  };

  return (
    <>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          {/* Logo and Search */}
          <div style={styles.logoSection}>
            {/* Logo */}
            <Link to="/homepage">
              <img
                src="/logoimg/Logodark.svg"
                alt="Logo"
                style={{ width: "240px", marginRight: "20px" }}
              />
            </Link>
            {/* Search Form */}
            <form style={styles.searchForm}>
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={styles.searchInput}
                disabled // Disabled as search functionality is removed
              />
              <FaSearch style={styles.searchIcon} />
              {/* Removed search results dropdown as per instruction */}
            </form>
          </div>
          {/* Navigation Links and User Profile */}
          <div style={styles.navLinks}>
            {/* Navigation Links */}
            <a href="/detail" style={styles.navLink}>
              Building
            </a>
            <a href="/event" style={styles.navLink}>
              Calendar
            </a>
            <a href="/campusservice" style={styles.navLink}>
              Service
            </a>
            <a href="/incidentreport" style={styles.navLink}>
              Incident Report
            </a>
            <a href="/announcement" style={styles.navLink}>
              Announcement
            </a>
            {/* Notifications */}
            <div style={styles.notificationIcon}>
              <Link to="/notifications" style={{ color: "#FFFFFF" }}>
                <FaBell size={24} />
              </Link>
            </div>
            {/* User Profile Dropdown */}
            <div style={styles.userProfile}>
              <img
                src="https://picsum.photos/200/300"
                alt="User Profile"
                style={styles.userImage}
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                }}
              />
              <span style={{ marginRight: "10px", color: "#FFFFFF" }}>
                {user ? user.name : ""}
              </span>
              {dropdownOpen && (
                <div style={styles.dropdownMenu}>
                  <div
                    onClick={handleNavigateToProfile}
                    style={styles.dropdownItem}
                  >
                    Profile
                  </div>
                  <div style={styles.dropdownItem}>Help</div>
                  <div onClick={handleFeedback} style={styles.dropdownItem}>
                    Feedback
                  </div>
                  <div onClick={handleLogout} style={styles.dropdownItem}>
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.container}>
        {/* Conditionally render the form only for admin users */}
        {user && user.admin && (
          <>
            <h1 style={styles.headerContent}>Incident Reports</h1>
            <div style={styles.formContainer}>
              <form
                style={styles.form}
                onSubmit={isEditing ? handleUpdate : handleCreate}
              >
                <div>
                  <label htmlFor="category">Category:</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="locationType">Location Type:</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="locationType"
                    id="locationType"
                    value={formData.locationType}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="status">Status:</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="timestamp">Timestamp:</label>
                  <input
                    style={styles.input}
                    type="datetime-local"
                    name="timestamp"
                    id="timestamp"
                    value={formData.timestamp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {isEditing ? (
                  <div style={{ display: "flex" }}>
                    <button style={styles.button} type="submit">
                      Update
                    </button>
                    <button
                      style={{ ...styles.button, ...styles.cancelButton }}
                      type="button"
                      onClick={() => {
                        resetForm();
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button style={styles.button} type="submit">
                    Create
                  </button>
                )}
              </form>
            </div>
          </>
        )}

        <h2
          style={{
            color: "#fefefe",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          Existing Reports
        </h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Location Type</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Timestamp</th>
              {user && user.admin && <th style={styles.th}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {incidentReports.map((incident) => (
              <tr key={incident.incidentID}>
                <td style={styles.td}>{incident.category}</td>
                <td style={styles.td}>{incident.description}</td>
                <td style={styles.td}>{incident.locationType}</td>
                <td style={styles.td}>{incident.status}</td>
                <td style={styles.td}>
                  {incident.timestamp
                    ? new Date(incident.timestamp).toLocaleString()
                    : "N/A"}
                </td>
                {user && user.admin && (
                  <td style={styles.td}>
                    <button
                      style={styles.button}
                      onClick={() => handleEdit(incident)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ ...styles.button, ...styles.cancelButton }}
                      onClick={() => handleDelete(incident.incidentID)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default IncidentReport;