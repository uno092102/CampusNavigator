import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Ensure react-router-dom is installed
import { FaBell } from "react-icons/fa"; // Ensure react-icons is installed

const CampusServicePage = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    contactInfo: "",
    description: "",
    locationID: "",
    locationType: "",
    name: "",
    operatingHours: "",
    serviceType: "",
  });
  const [editService, setEditService] = useState(null);

  const [user, setUser] = useState(null); // Initialize as null
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  // Fetch Campus Services on Component Mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/campusservice")
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  // Fetch and Set User Data
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
            (usr) => usr.userID === localUserData.userID
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

  // Handle changes for both newService and editService
  const handleChange = (e, field) => {
    const value = e.target.value;
    if (editService) {
      setEditService((prev) => ({ ...prev, [field]: value }));
    } else {
      setNewService((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Add a new service
  const handleAddService = () => {
    axios
      .post("http://localhost:8080/api/campusservice", newService)
      .then((response) => {
        setServices((prev) => [...prev, response.data]);
        setNewService({
          contactInfo: "",
          description: "",
          locationID: "",
          locationType: "",
          name: "",
          operatingHours: "",
          serviceType: "",
        });
      })
      .catch((error) => console.error("Error adding service:", error));
  };

  // Delete a service
  const handleDeleteService = (serviceID) => {
    if (!serviceID || typeof serviceID !== "number") {
      console.error("Invalid service ID:", serviceID);
      return;
    }
    axios
      .delete(`http://localhost:8080/api/campusservice/${serviceID}`)
      .then(() => {
        setServices((prev) =>
          prev.filter((service) => service.serviceID !== serviceID)
        );
      })
      .catch((error) => console.error("Error deleting service:", error));
  };

  // Update a service
  const handleUpdateService = () => {
    if (!editService || !editService.serviceID) {
      console.error("Invalid service to update:", editService);
      return;
    }
    axios
      .put(
        `http://localhost:8080/api/campusservice/${editService.serviceID}`,
        editService
      )
      .then((response) => {
        setServices((prev) =>
          prev.map((service) =>
            service.serviceID === editService.serviceID ? response.data : service
          )
        );
        setEditService(null);
      })
      .catch((error) => console.error("Error updating service:", error));
  };

  // Header-related handler functions

  // Handle navigation to the user profile
  const handleNavigateToProfile = () => {
    // Close the dropdown and navigate to UserProfilePage
    setDropdownOpen(false);
    navigate("/userprofile");
  };

  // Handle feedback action
  const handleFeedback = () => {
    navigate("/Feedback");
  };

  // Handle user logout
  const handleLogout = () => {
    // Clear user data from localStorage and navigate to login
    localStorage.removeItem("user");
    navigate("/login");
  };

  // If user data is still loading, show a loading indicator
  if (user === null) {
    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          background: "linear-gradient(135deg, #7463FF, #D7AFFF)",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#FFFFFF",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "0",
        background: "linear-gradient(135deg, #7463FF, #D7AFFF)",
        minHeight: "100vh",
      }}
    >
      {/* Custom Header */}
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
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/homepage">
              <img
                src="/logoimg/Logodark.svg"
                alt="Logo"
                style={{ width: "240px", marginRight: "20px" }}
              />
            </Link>
          </div>

          {/* Navigation Links and User Profile */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Navigation Links */}
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
              href="/campusservice"
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
              href="/incidentreport"
              style={{
                color: "#FFFFFF",
                marginRight: "30px",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              Incident Report
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

            {/* Notifications */}
            <div style={{ marginRight: "20px", cursor: "pointer" }}>
              <a href="/notifications" style={{ color: "#FFFFFF" }}>
                <FaBell size={24} />
              </a>
            </div>

            {/* User Profile Dropdown */}
            <div
              style={{ display: "flex", alignItems: "center", position: "relative" }}
            >
              <img
                src={user.profileImage || "https://picsum.photos/200/300"} // Use user's profile image or a placeholder
                alt="User Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              <span style={{ marginRight: "10px" }}>{user.name}</span>
              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "60px",
                    right: 0,
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
                  <div
                    onClick={handleFeedback}
                    style={{ padding: "10px 20px", cursor: "pointer" }}
                  >
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

      {/* Main Content */}
      <main style={{ marginTop: "30px", padding: "20px" }}>
        <div>
          {services.length === 0 ? (
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                color: "#555",
              }}
            >
              <h3>No Campus Services Available</h3>
              <p>There are currently no campus services to display. Please check back later.</p>
            </div>
          ) : (
            services.map((service) => (
              <div
                key={service.serviceID} // Correctly using serviceID as the key
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "20px",
                  marginBottom: "15px",
                  borderRadius: "12px",
                  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <h3 style={{ margin: 0, color: "#4C52FF" }}>{service.name}</h3>
                <p style={{ margin: "10px 0", color: "#555" }}>{service.description}</p>
                <p style={{ margin: "5px 0", color: "#777" }}>
                  <strong>Location Type:</strong> {service.locationType}
                </p>
                <p style={{ margin: "5px 0", color: "#777" }}>
                  <strong>Contact Info:</strong> {service.contactInfo}
                </p>
                <p style={{ margin: "5px 0", color: "#777" }}>
                  <strong>Operating Hours:</strong> {service.operatingHours}
                </p>
                <p style={{ margin: "5px 0", color: "#777" }}>
                  <strong>Service Type:</strong> {service.serviceType}
                </p>
                {/* Edit and Delete Buttons (Only for Admins) */}
                {user.admin && (
                  <div style={{ marginTop: "10px" }}>
                    <button
                      style={{
                        backgroundColor: "#FF4C4C",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 15px",
                        marginRight: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "background-color 0.3s",
                      }}
                      onClick={() => handleDeleteService(service.serviceID)}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF7373")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF4C4C")}
                    >
                      Delete
                    </button>
                    <button
                      style={{
                        backgroundColor: "#4C9AFF",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 15px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "background-color 0.3s",
                      }}
                      onClick={() => setEditService(service)}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#73B1FF")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#4C9AFF")}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Add/Edit Service Form (Only for Admins) */}
        {user.admin && (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              marginTop: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>{editService ? "Edit Service" : "Add New Service"}</h3>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={editService ? editService.name : newService.name}
                onChange={(e) => handleChange(e, "name")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #CCC",
                }}
              />
              <textarea
                placeholder="Description"
                value={editService ? editService.description : newService.description}
                onChange={(e) => handleChange(e, "description")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #CCC",
                }}
              />
              <input
                type="text"
                placeholder="Contact Info"
                value={editService ? editService.contactInfo : newService.contactInfo}
                onChange={(e) => handleChange(e, "contactInfo")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #CCC",
                }}
              />
              <input
                type="text"
                placeholder="Location Type"
                value={editService ? editService.locationType : newService.locationType}
                onChange={(e) => handleChange(e, "locationType")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #CCC",
                }}
              />
              <input
                type="text"
                placeholder="Operating Hours"
                value={editService ? editService.operatingHours : newService.operatingHours}
                onChange={(e) => handleChange(e, "operatingHours")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #CCC",
                }}
              />
              <input
                type="text"
                placeholder="Service Type"
                value={editService ? editService.serviceType : newService.serviceType}
                onChange={(e) => handleChange(e, "serviceType")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #CCC",
                }}
              />
              <button
                style={{
                  backgroundColor: "#4C9AFF",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  marginTop: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                }}
                onClick={editService ? handleUpdateService : handleAddService}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#74B3FF")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#4C9AFF")}
              >
                {editService ? "Update Service" : "Add Service"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CampusServicePage;