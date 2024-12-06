import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";

const CampusService = () => {
  const [searchText, setSearchText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = {
    profilePicture: "/user/profile.jpg", // Replace with actual profile picture URL
    name: "John Doe", // Replace with dynamic user name
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Text:", searchText);
  };

  const handleNavigateToProfile = () => {
    console.log("Navigating to Profile");
  };

  const handleFeedback = () => {
    console.log("Opening Feedback");
  };

  const handleLogout = () => {
    console.log("Logging Out");
  };

  return (
    <div>
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
            </form>
          </div>
          {/* Navigation Links */}
          <div style={{ display: "flex", alignItems: "center" }}>
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
              Campus Service
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
              Announcement
            </a>
            <div style={{ marginRight: "20px", cursor: "pointer" }}>
              <a href="#" style={{ color: "#FFFFFF" }}>
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
                src={user.profilePicture}
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

      {/* Campus Service Content */}
      <main style={{ padding: "40px", backgroundColor: "#F5F5F5" }}>
        {/* Topnotch Facilities Section */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          {/* Text Section */}
          <div style={{ flex: 1, marginRight: "20px" }}>
            <h2 style={{ color: "#8B2F2F", fontSize: "32px", marginBottom: "20px" }}>
              Topnotch Facilities
            </h2>
            <p style={{ fontSize: "16px", color: "#333" }}>
              Experience world-class facilities designed to support student
              excellence and innovation on campus.
            </p>
          </div>
          {/* Image Section */}
          <div style={{ flex: 1 }}>
            <img
              src="/path-to-image/wall-of-fame.jpg"
              alt="Topnotch Facilities"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </section>

        {/* Contact Section */}
        <section
          style={{
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {/* Visit Us */}
            <div style={{ textAlign: "center", flex: 1, margin: "0 20px" }}>
              <h3 style={{ color: "#8B2F2F", marginBottom: "10px" }}>Visit Us</h3>
              <p style={{ fontSize: "14px", color: "#333" }}>
                We are looking forward to welcoming you to our campus.
              </p>
              <p style={{ fontWeight: "bold" }}>N. Bacalso Ave., Cebu City</p>
              <p>Cebu, Philippines 6000</p>
            </div>
            {/* Call Us */}
            <div style={{ textAlign: "center", flex: 1, margin: "0 20px" }}>
              <h3 style={{ color: "#8B2F2F", marginBottom: "10px" }}>Call Us</h3>
              <p style={{ fontSize: "14px", color: "#333" }}>
                Our lines are always open for you.
              </p>
              <p style={{ fontWeight: "bold" }}>261-7411</p>
              <p>411-2000</p>
            </div>
            {/* Contact Us */}
            <div style={{ textAlign: "center", flex: 1, margin: "0 20px" }}>
              <h3 style={{ color: "#8B2F2F", marginBottom: "10px" }}>Contact Us</h3>
              <p style={{ fontSize: "14px", color: "#333" }}>
                Visit our 'Information Directory' page for specific inquiries.
              </p>
              <p style={{ fontWeight: "bold" }}>info@university.edu</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#FFFFFF",
          padding: "40px 20px",
          marginTop: "40px",
          borderTop: "1px solid #E0E0E0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logoimg/LogoDark.svg"
              alt="University Logo"
              style={{ width: "150px", marginRight: "20px" }}
            />
            <p style={{ color: "#333", fontSize: "14px" }}>
              © 2024 University. All rights reserved.
            </p>
          </div>
          <div>
            <Link
              to="/terms"
              style={{
                marginRight: "20px",
                color: "#7757FF",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              style={{
                color: "#7757FF",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CampusService;
