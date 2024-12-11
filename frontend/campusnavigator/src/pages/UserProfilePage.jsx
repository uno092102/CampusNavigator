import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function UserProfilePage() {
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showUpdateProfileForm, setShowUpdateProfileForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [allUsersData, setAllUsersData] = useState([]); // Store all users' data from the API
  const [currentUserGeolocations, setCurrentUserGeolocations] = useState([]); // Store current user's geolocation data
  const [buildings, setBuildings] = useState([]); // Store buildings data
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log("User ID = ", userData.userID);
  const userID = userData.userID;

  const userProf = {
    role: "Administrator", // Set to 'Administrator' to display managerial sections
    email: userData.email,
    profilePicture: "https://picsum.photos/200/300", // Placeholder image
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
    } else {
      setUser(userData);
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:8080/api/buildings")
      .then((response) => response.json())
      .then((data) => {
        setBuildings(data);
      })
      .catch((error) => {
        console.error("Error fetching buildings data:", error);
      });
  }, []);

  // Function to calculate distance between two coordinates in meters
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371000; // Earth's radius in meters
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance; // in meters
  };

  useEffect(() => {
    // Fetch all users' data from the API
    fetch("http://127.0.0.1:8080/api/user/getAllSearch")
      .then((response) => response.json())
      .then((data) => {
        setAllUsersData(data);

        // Find the current user's data using userID
        const currentUserData = data.find((user) => user.userID === userID);

        // Check if currentUserData exists and has geolocationData
        if (currentUserData && currentUserData.geolocationData) {
          setCurrentUserGeolocations(currentUserData.geolocationData);
        } else {
          setCurrentUserGeolocations([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching geolocation data:", error);
      });
  }, [userID]);

  useEffect(() => {
    document.title = "User Profile - CampusNavigator";
  }, []);

  const handleFeedback = () => {
    navigate("/Feedback");
  };

  const handleUpdateProfile = (e) => {
    /*e.preventDefault();

    const update = {name, email, role}
    console.log(update)

    fetch(`http://localhost:8080/api/user/putUserRecord?userID=${userData.userID}`,
      {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(update)
      }
    ).then(() => 
    {
      alert("Update User Profile Successfull!");
    })*/
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

  const handleSaveChanges = (e) => {
    e.preventDefault();

    const newPassword = { password };
    console.log(newPassword);

    fetch(
      `http://localhost:8080/api/user/putUserRecord?userID=${userData.userID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      }
    ).then(() => {
      alert("Password successfully changed!");
    });
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
                src={userProf.profilePicture}
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
              <span style={{ marginRight: "10px" }}>{userProf.name}</span>
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
            src={userProf.profilePicture}
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
            <h1 style={{ color: "#333", marginBottom: "10px" }}>
              {user ? user.name : ""}
            </h1>
            <p style={{ margin: "5px 0" }}>
              <strong>Role:</strong> {userProf.role}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Email:</strong> {userProf.email}
            </p>
          </div>
        </section>

        {/* Account Settings and Notification Preferences */}
        <section
          style={{
            marginTop: "20px",
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
              Account Settings
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
              Change Password
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
              Update Profile Information
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
                      defaultValue={userData.name}
                      //onChange={(e)=> setName(e.target.value)}
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
                      defaultValue={userProf.email}
                      //onChange={(e)=>setEmail(e.target.value)}
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
                      defaultValue={userProf.role}
                      //onChange={(e)=> setRole(e.target.value)}
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
                    onClick={handleUpdateProfile}
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
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    onClick={handleSaveChanges}
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
        </section>

        {/* Other Contents */}
        {/* Notifications and Search History */}
        <section
          style={{
            marginTop: "40px",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
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
              Search History
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
              Recent Locations
            </h2>
            {/* Render geolocation data */}
            {currentUserGeolocations.length > 0 ? (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {currentUserGeolocations.map((geo) => {
                  // Find the nearest building
                  let nearestBuilding = null;
                  let minDistance = Infinity;

                  buildings.forEach((building) => {
                    const distance = calculateDistance(
                      geo.latitude,
                      geo.longitude,
                      building.locationLatitude,
                      building.locationLongitude
                    );
                    if (distance < minDistance) {
                      minDistance = distance;
                      nearestBuilding = building;
                    }
                  });

                  // Format the date
                  const formattedDate = new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                  }).format(new Date(geo.timestamp));

                  return (
                    <li
                      key={geo.geolocationID}
                      style={{ marginBottom: "15px" }}
                    >
                      {nearestBuilding ? (
                        <>
                          <span>
                            Located <strong>{minDistance.toFixed(2)}m</strong>{" "}
                            from <strong>{nearestBuilding.name}</strong>
                          </span>
                          <br />
                          <span>
                            Coordinates: {geo.latitude}° N, {geo.longitude}° W
                          </span>
                          <br />
                          <em style={{ color: "#777" }}>{formattedDate}</em>
                        </>
                      ) : (
                        <>
                          <span>
                            Coordinates: {geo.latitude}° N, {geo.longitude}° W
                          </span>
                          <br />
                          <em style={{ color: "#777" }}>{formattedDate}</em>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No recent locations found.</p>
            )}
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
              Feedback Submitted
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
              My Events
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
        {userProf.role === "Staff" || userProf.role === "Administrator" ? (
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
                Managed Campus Services
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
                Announcements Posted
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
              Incident Reports
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