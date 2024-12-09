import React, { useState, useEffect } from "react";
import axios from "axios";

const IncidentReportPage = () => {
  const [incidentReports, setIncidentReports] = useState([]);
  const [form, setForm] = useState({
    category: "",
    description: "",
    locationID: "",
    locationType: "",
    status: "",
    userID: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch all incident reports
  const fetchIncidentReports = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/api/incidentreport/getAllIncidentReport");
      setIncidentReports(response.data);
    } catch (error) {
      alert("Error fetching incident reports: " + error.message);
    }
  };

  useEffect(() => {
    fetchIncidentReports();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Submit incident report
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = editMode
      ? `http://127.0.0.1:8080/api/incidentreport/putIncidentReport/${editId}`
      : `http://127.0.0.1:8080/api/incidentreport/postIncidentReport`;
  
    try {
      if (editMode) {
        // Send `incidentID` explicitly in the payload if required
        const updatePayload = { ...form, incidentID: editId };
        await axios.put(endpoint, updatePayload);
        alert("Incident report updated successfully.");
      } else {
        await axios.post(endpoint, form);
        alert("Incident report added successfully.");
      }
  
      // Reset form and fetch data
      setForm({
        category: "",
        description: "",
        locationID: "",
        locationType: "",
        status: "",
        userID: "",
      });
      setEditMode(false);
      setEditId(null);
      fetchIncidentReports();
    } catch (error) {
      alert("Error submitting incident report: " + (error.response?.data?.message || error.message));
    }
  };
  

  // Handle delete incident report
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this report?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://127.0.0.1:8080/api/incidentreport/deleteIncidentReport/${id}`);
      alert("Incident report deleted successfully.");
      fetchIncidentReports();
    } catch (error) {
      alert("Error deleting incident report: " + error.message);
    }
  };

  // Populate form for editing
  const handleEdit = (report) => {
    setForm({
      category: report.category || "",
      description: report.description || "",
      locationID: report.locationID || "",
      locationType: report.locationType || "",
      status: report.status || "",
      userID: report.userID || "",
    });
    setEditMode(true);
    setEditId(report.incidentID);
  };

  return (
    <div>
      <h1>Incident Report Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="locationID"
          placeholder="Location ID"
          value={form.locationID}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="locationType"
          placeholder="Location Type"
          value={form.locationType}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="userID"
          placeholder="User ID"
          value={form.userID}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editMode ? "Update" : "Add"} Report</button>
      </form>

      <h2>Incident Reports</h2>
      {incidentReports.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Description</th>
              <th>Location ID</th>
              <th>Location Type</th>
              <th>Status</th>
              <th>User ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidentReports.map((report) => (
              <tr key={report.incidentID}>
                <td>{report.incidentID}</td>
                <td>{report.category}</td>
                <td>{report.description}</td>
                <td>{report.locationID}</td>
                <td>{report.locationType}</td>
                <td>{report.status}</td>
                <td>{report.userID}</td>
                <td>
                  <button onClick={() => handleEdit(report)}>Edit</button>
                  <button onClick={() => handleDelete(report.incidentID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No incident reports found.</p>
      )}
    </div>
  );
};

export default IncidentReportPage;
