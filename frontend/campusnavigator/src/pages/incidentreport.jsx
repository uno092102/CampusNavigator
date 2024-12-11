import React, { useState, useEffect } from "react";
import axios from "axios";

const IncidentReport = () => {
  const [incidentReports, setIncidentReports] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    incidentID: null,
    category: "",
    description: "",
    locationType: "",
    status: "",
    timestamp: "",
  });

  const apiBaseURL = "http://localhost:8080/api/incidentreport";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBaseURL}/postIncidentReport`, {
        ...formData,
        locationid: 1,
        userid: 1,
      });
      fetchIncidentReports();
      resetForm();
    } catch (error) {
      console.error("Error creating incident report:", error);
    }
  };

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
        userID: formData.userID || 0
      };

      await axios.put(`${apiBaseURL}/putIncidentReport/${formData.incidentID}`, updateData);
      fetchIncidentReports();
      resetForm();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating incident report:", error);
    }
  };

  const handleDelete = async (incidentID) => {
    try {
      await axios.delete(`${apiBaseURL}/deleteIncidentReport/${incidentID}`);
      fetchIncidentReports();
    } catch (error) {
      console.error("Error deleting incident report:", error);
    }
  };

  const handleEdit = (incident) => {
    setFormData({
      incidentID: incident.incidentID,
      category: incident.category,
      description: incident.description,
      locationType: incident.locationType,
      status: incident.status,
      timestamp: incident.timestamp
        ? new Date(incident.timestamp).toISOString().slice(0, 16)
        : '',
      userID: incident.userID,
      locationID: incident.locationID
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      incidentID: null,
      category: "",
      description: "",
      locationType: "",
      status: "",
      timestamp: "",
    });
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      padding: "20px",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to bottom, #7b5cf4, #b09cf6)",
      color: "#fefefe",
    },
    header: {
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
    },
    form: {
      display: "grid",
      gap: "15px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
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
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Incident Reports</h1>
      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={isEditing ? handleUpdate : handleCreate}>
          <div>
            <label>Category:</label>
            <input
              style={styles.input}
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              style={styles.input}
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Location Type:</label>
            <input
              style={styles.input}
              type="text"
              name="locationType"
              value={formData.locationType}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              style={styles.input}
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Timestamp:</label>
            <input
              style={styles.input}
              type="datetime-local"
              name="timestamp"
              value={formData.timestamp}
              onChange={handleInputChange}
              required
            />
          </div>
          {isEditing ? (
            <div>
              <button style={styles.button} type="submit">Update</button>
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
            <button style={styles.button} type="submit">Create</button>
          )}
        </form>
      </div>
      <h2 style={{ color: "#fefefe", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}>Existing Reports</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Location Type</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Timestamp</th>
            <th style={styles.th}>Actions</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentReport;
