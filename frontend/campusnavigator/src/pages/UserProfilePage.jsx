import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function UserProfilePage() {
  const [searchText, setSearchText] = useState("");
  const [searchResults] = useState([]); // Placeholder for search results
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showUpdateProfileForm, setShowUpdateProfileForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    role: "Administrator", // Set to 'Administrator' to display managerial sections
    email: "johndoe@example.com",
    profilePicture: "https://picsum.photos/200/300", // Placeholder image
  };

  useEffect(() => {
    document.title = "User Profile - CampusNavigator";
  }, []);

  const handleFeedback = () => {
    navigate("/Feedback");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Placeholder search functionality
    alert(`Search for: ${searchText}`);
  };

  const handleLogout = () => {
    // Implement logout logic here
    // For now, just navigate to login page
    navigate("/login");
  };

  const handleNavigateToProfile = () => {
    // Close the dropdown and navigate to UserProfilePage
    setDropdownOpen(false);
    navigate("/userprofile");
  };

  // Functions to handle showing forms
  const handleShowUpdateProfileForm = () => {
    setShowUpdateProfileForm(true);
    setShowChangePasswordForm(false);
  };

  const handleShowChangePasswordForm = () => {
    setShowChangePasswordForm(true);
    setShowUpdateProfileForm(false);
  };

  const handleCloseForms = () => {
    setShowUpdateProfileForm(false);
    setShowChangePasswordForm(false);
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(to right, #7757FF, #E0B3FF)", // Background gradient
      }}
    >
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
            {/* Increased logo size by 60% */}
            {/* Search Form */}
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
            </form>
          </div>
          {/* Navigation Links */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <a
              href="/detail"
              style={{
                color: '#FFFFFF',
                marginRight: '30px',
                textDecoration: 'none',
                fontSize: '16px',
              }}
            >
              Campus Building
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
            {/* Notifications */}
            <div style={{ marginRight: "20px", cursor: "pointer" }}>
              <a href="#" style={{ color: "#FFFFFF" }}>
                <FaBell size={24} />
              </a>
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
                src={user.profilePicture}
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

      {/* User Profile Content */}
      <main
        style={{
          paddingTop: "120px",
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingBottom: "40px",
          marginTop: "80px",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* User Info */}
        <section
          style={{
            marginBottom: "40px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={user.profilePicture}
            alt="User Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              marginRight: "30px",
              objectFit: "cover",
            }}
          />
          <div>
            <h1 style={{ color: "#333", marginBottom: "10px" }}>{user.name}</h1>
            <p style={{ margin: "5px 0" }}>
              <strong>Role:</strong> {user.role}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </section>

        {/* Account Settings and Notification Preferences */}
        <section
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          {/* Account Settings */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#7757FF", marginBottom: "20px" }}>
              Account Settings (Kang CLAIVE)
            </h2>
            <button
              onClick={handleShowChangePasswordForm}
              style={{
                padding: "12px 20px",
                backgroundColor: "#7757FF",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "15px",
                width: "100%",
                fontSize: "16px",
              }}
            >
              Change Password (Kang CLAIVE)
            </button>
            <button
              onClick={handleShowUpdateProfileForm}
              style={{
                padding: "12px 20px",
                backgroundColor: "#7757FF",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
                fontSize: "16px",
              }}
            >
              Update Profile Information (Kang CLAIVE)
            </button>

            {/* Update Profile Form */}
            {showUpdateProfileForm && (
              <div style={{ marginTop: "20px" }}>
                <h3 style={{ color: "#7757FF", marginBottom: "10px" }}>
                  Update Profile Information
                </h3>
                <form>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      htmlFor="name"
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={user.name}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      htmlFor="email"
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={user.email}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      htmlFor="role"
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      Role:
                    </label>
                    <select
                      id="role"
                      name="role"
                      defaultValue={user.role}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <option value="Student">Student</option>
                      <option value="Visitor">Visitor</option>
                      <option value="Staff">Staff</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  </div>
                  {/* Placeholder for submit button */}
                  <button
                    type="button"
                    onClick={handleCloseForms}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#7757FF",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Change Password Form */}
            {showChangePasswordForm && (
              <div style={{ marginTop: "20px" }}>
                <h3 style={{ color: "#7757FF", marginBottom: "10px" }}>
                  Change Password
                </h3>
                <form>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      htmlFor="currentPassword"
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      Current Password:
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      htmlFor="newPassword"
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      New Password:
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      htmlFor="confirmPassword"
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      Confirm New Password:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  {/* Placeholder for submit button */}
                  <button
                    type="button"
                    onClick={handleCloseForms}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#7757FF",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Notification Preferences */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#7757FF", marginBottom: "20px" }}>
              Notification Preferences (Kang MICHAEL)
            </h2>
            <form>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  defaultChecked
                />
                <label
                  htmlFor="emailNotifications"
                  style={{ marginLeft: "10px", fontSize: "16px" }}
                >
                  Email Notifications
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="checkbox"
                  id="pushNotifications"
                  name="pushNotifications"
                  defaultChecked
                />
                <label
                  htmlFor="pushNotifications"
                  style={{ marginLeft: "10px", fontSize: "16px" }}
                >
                  Push Notifications
                </label>
              </div>
            </form>
          </div>
        </section>

        {/* Other Contents */}
        {/* Notifications and Search History */}
        <section
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          {/* Notifications */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#7757FF", marginBottom: "20px" }}>
              Notifications (Kang MICHAEL)
            </h2>
            {/* List of notifications (placeholder data) */}
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ marginBottom: "15px" }}>
                <strong>New Announcement:</strong> Campus will be closed
                tomorrow.
                <br />
                <em style={{ color: "#777" }}>Today at 9:00 AM</em>
              </li>
              <li>
                <strong>Event Reminder:</strong> Seminar on Software Development
                starts in 2 hours.
                <br />
                <em style={{ color: "#777" }}>Today at 8:00 AM</em>
              </li>
            </ul>
          </div>

          {/* Search History */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#7757FF", marginBottom: "20px" }}>
              Search History (Kang CLAIVE)
            </h2>
            {/* List of search queries (placeholder data) */}
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ marginBottom: "15px" }}>
                "Library Location"
                <br />
                <em style={{ color: "#777" }}>Yesterday at 3:00 PM</em>
              </li>
              <li style={{ marginBottom: "15px" }}>
                "Cafeteria Menu"
                <br />
                <em style={{ color: "#777" }}>Yesterday at 12:00 PM</em>
              </li>
              <li>
                "Lecture Hall 2"
                <br />
                <em style={{ color: "#777" }}>Two days ago at 10:00 AM</em>
              </li>
            </ul>
          </div>
        </section>

        {/* Recent Locations and Feedback Submitted */}
        <section
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          {/* Recent Locations */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#7757FF", marginBottom: "20px" }}>
              Recent Locations (Kang MATHLEE)
            </h2>
            {/* Placeholder data for recent locations */}
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ marginBottom: "15px" }}>
                Latitude: 10.3157, Longitude: 123.8854
                <br />
                <em style={{ color: "#777" }}>Today at 10:00 AM</em>
              </li>
              <li style={{ marginBottom: "15px" }}>
                Latitude: 10.3167, Longitude: 123.8864
                <br />
                <em style={{ color: "#777" }}>Yesterday at 4:00 PM</em>
              </li>
              <li>
                Latitude: 10.3177, Longitude: 123.8874
                <br />
                <em style={{ color: "#777" }}>Two days ago at 2:30 PM</em>
              </li>
            </ul>
          </div>

          {/* Feedback Submitted */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#7757FF", marginBottom: "20px" }}>
              Feedback Submitted (Kang BRENT)
            </h2>
            {/* List of feedback messages (placeholder data) */}
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ marginBottom: "15px" }}>
                "Great app, very helpful!"
                <br />
                <em style={{ color: "#777" }}>Last week</em>
              </li>
              <li>
                "Feature request: Add indoor maps."
                <br />
                <em style={{ color: "#777" }}>Two weeks ago</em>
              </li>
            </ul>
          </div>
        </section>

        {/* Events */}
        <section style={{ marginTop: "40px" }}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#7757FF", marginBottom: "20px" }}>
              My Events (Kang MICHAEL)
            </h2>
            {/* Organized Events */}
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ marginBottom: "10px" }}>Organized Events</h3>
              {/* List of events (placeholder data) */}
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <strong>Study Group Meeting</strong> at Library Room 101 on
                  Oct 10th, 3:00 PM
                </li>
              </ul>
            </div>
            {/* Participating Events */}
            <div>
              <h3 style={{ marginBottom: "10px" }}>Participating Events</h3>
              {/* List of events (placeholder data) */}
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginBottom: "15px" }}>
                  <strong>Seminar on Software Development</strong> at Auditorium
                  on Oct 12th, 10:00 AM
                </li>
                <li>
                  <strong>Campus Cleanup Drive</strong> at Main Grounds on Oct
                  15th, 8:00 AM
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Managed Campus Services and Announcements Posted */}
        {user.role === "Staff" || user.role === "Administrator" ? (
          <section
            style={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
            }}
          >
            {/* Managed Campus Services */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ color: "#7757FF", marginBottom: "20px" }}>
                Managed Campus Services (Kang TERRENCE)
              </h2>
              {/* Placeholder data for managed services */}
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginBottom: "15px" }}>
                  <strong>IT Support Center</strong>
                  <br />
                  Location: Building A, Room 101
                  <br />
                  Operating Hours: 8:00 AM - 5:00 PM
                </li>
                <li>
                  <strong>Library Services</strong>
                  <br />
                  Location: Main Library
                  <br />
                  Operating Hours: 7:00 AM - 9:00 PM
                </li>
              </ul>
            </div>

            {/* Announcements Posted */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ color: "#7757FF", marginBottom: "20px" }}>
                Announcements Posted (Kang CLAIVE)
              </h2>
              {/* Placeholder data for announcements */}
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginBottom: "15px" }}>
                  <strong>System Maintenance Scheduled</strong>
                  <br />
                  Content: The campus network will undergo maintenance on Oct
                  20th.
                  <br />
                  Posted on: Oct 10th
                </li>
                <li>
                  <strong>New Library Resources Available</strong>
                  <br />
                  Content: New e-books and journals are now accessible.
                  <br />
                  Posted on: Oct 5th
                </li>
              </ul>
            </div>
          </section>
        ) : null}

        {/* Incident Reports */}
        <section style={{ marginTop: "40px" }}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#7757FF", marginBottom: "20px" }}>
              Incident Reports (Kang TERENCE)
            </h2>
            {/* List of incident reports (placeholder data) */}
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ marginBottom: "15px" }}>
                <strong>Maintenance Issue:</strong> Broken door handle in
                Lecture Hall 2.
                <br />
                <em style={{ color: "#777" }}>Status: Open</em>
              </li>
              <li>
                <strong>Lost Item:</strong> Lost wallet near Cafeteria.
                <br />
                <em style={{ color: "#777" }}>Status: Resolved</em>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserProfilePage;