import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";

const FeedbackForm = () => {
  const [message, setMessage] = useState("");
  const [timeStamp, setTimestamp] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // Initialize user as null
  const navigate = useNavigate();

  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem("user"));
    if (!localUserData) {
      navigate("/login"); // Redirect to login if no local user data
    } else {
      // Fetch all users to get the current user's full data
      fetch("http://localhost:8080/api/user/getAllSearch")
        .then((response) => response.json())
        .then((usersData) => {
          // Find the current user in the list
          const fullUserData = usersData.find(
            (user) => user.userID === localUserData.userID
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = { message, timeStamp };
    console.log(feedback);

    fetch("http://localhost:8080/api/feedback/postFeedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setMessage(""); // Clear form fields after successful submission
        setTimestamp("");
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement your search logic here
    // For example, fetching search results from an API
    console.log("Searching for:", searchText);
    // Placeholder for fetching search results
    fetch(`/api/search?query=${searchText}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => console.error("Error fetching search results:", error));
  };

  const handleResultClick = (item) => {
    // Handle navigation or action based on the search result clicked
    console.log("Clicked on:", item);
    if (item.type === "building") {
      navigate(`/building/${item.building.id}`); // Navigate to building detail
    } else if (item.type === "poi") {
      navigate(`/poi/${item.poi.id}`); // Navigate to point of interest detail
    }
  };
  const handleNavigateToProfile = () => {
    navigate("/userprofile");
  };
  const handleFeedback = () => {
    navigate("/feedback");
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Helmet>
        <title>Feedback - Campus Navigator</title>
      </Helmet>

      {/* Header */}
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
          {/* Logo and Search */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Logo */}
            <Link to="/homepage">
              <img
                src="/logoimg/Logodark.svg"
                alt="Logo"
                style={{ width: "240px", marginRight: "20px" }}
              />
            </Link>

            {/* Search Form */}
            <form
              onSubmit={handleSearchSubmit}
              style={{ position: "relative" }}
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
              {/* Search results dropdown */}
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
                          : item.poi?.name}
                      </strong>
                      <br />
                      <span>
                        {item.type === "building"
                          ? item.building.description
                          : item.poi?.description}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </form>
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
              <Link to="/notifications" style={{ color: "#FFFFFF" }}>
                <FaBell size={24} />
              </Link>
            </div>

            {/* User Profile Dropdown */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <img
                src={user?.profilePic || "https://picsum.photos/200/300"}
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
              <span style={{ marginRight: "10px" }}>
                {user ? user.firstName || user.name || "User" : "Guest"}
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

      {/* Feedback Form */}
      <Container maxWidth="sm" style={{ marginTop: "20px" }}>
        <Paper className="feedback-form-container">
          <Typography
            variant="h4"
            align="center"
            className="form-title"
            gutterBottom
          >
            Submit Feedback
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  required
                  className="input-field"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Timestamp"
                  name="timestamp"
                  value={timeStamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  fullWidth
                  margin="normal"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  className="input-field"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="submit-button"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default FeedbackForm;