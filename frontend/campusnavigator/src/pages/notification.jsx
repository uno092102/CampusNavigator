import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";
import axios from 'axios';
import './notification.css';

const Notifications = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef(null);
  
  const [notifications, setNotifications] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  const createNotification = async (message) => {
    try {
      const notification = {
        message: message,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      await axios.post('http://localhost:8080/api/notifications', notification);
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  useEffect(() => {
    const fetchBuildingsAndNotifications = async () => {
      try {
        // Fetch buildings data
        const buildingsResponse = await axios.get('http://localhost:8080/api/buildings');
        
        // Create notifications for existing buildings
        await Promise.all(
          buildingsResponse.data.map(building => 
            createNotification(`A new building named "${building.name}" has been added to the system.`)
          )
        );

        setBuildings(buildingsResponse.data);

        // Fetch notifications
        const notificationsResponse = await axios.get('http://localhost:8080/api/notifications');
        setNotifications(notificationsResponse.data.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        ));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchBuildingsAndNotifications();

    // Set up a WebSocket or polling mechanism to track building changes in real-time
    const checkBuildingChanges = async () => {
      try {
        const currentBuildings = await axios.get('http://localhost:8080/api/buildings');
        
        // Check for deleted buildings
        buildings.forEach(async (existingBuilding) => {
          const stillExists = currentBuildings.data.some(b => b.id === existingBuilding.id);
          if (!stillExists) {
            await createNotification(`Building "${existingBuilding.name}" has been deleted from the system.`);
          }
        });

        // Update buildings state
        setBuildings(currentBuildings.data);
      } catch (error) {
        console.error('Error checking building changes:', error);
      }
    };

    // Poll for changes every 5 minutes
    const intervalId = setInterval(checkBuildingChanges, 5 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`http://localhost:8080/api/notifications/${notificationId}/read`);
      const response = await axios.get('http://localhost:8080/api/notifications');
      setNotifications(response.data.sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(`http://localhost:8080/api/notifications/${notificationId}`);
      const response = await axios.get('http://localhost:8080/api/notifications');
      setNotifications(response.data.sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      ));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleNavigateToProfile = () => {
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

  if (loading) {
    return <div className="notifications-loading">Loading notifications...</div>;
  }

  return (
    <div>
      <header style={{
        position: "relative",
        backgroundColor: "#7757FF",
        color: "#FFFFFF",
        padding: "20px 40px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/homepage">
              <img
                src="/logoimg/Logodark.svg"
                alt="Logo"
                style={{ width: "240px", marginRight: "20px" }}
              />
            </Link>
            <form style={{ position: "relative" }} ref={searchRef}>
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

          <div style={{ display: "flex", alignItems: "center" }}>
            <a href="/detail" style={{ color: '#FFFFFF', marginRight: '30px', textDecoration: 'none', fontSize: '16px' }}>
              Building
            </a>
            <a href="/event" style={{ color: "#FFFFFF", marginRight: "30px", textDecoration: "none", fontSize: "16px" }}>
              Calendar
            </a>
            <a href="#" style={{ color: "#FFFFFF", marginRight: "30px", textDecoration: "none", fontSize: "16px" }}>
              Service
            </a>
            <a href="/announcement" style={{ color: "#FFFFFF", marginRight: "30px", textDecoration: "none", fontSize: "16px" }}>
              Announcement
            </a>
            
            <div style={{ marginRight: "20px", cursor: "pointer" }}>
              <a href="/notifications" style={{ color: "#FFFFFF" }}>
                <FaBell size={24} />
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
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
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              <span style={{ marginRight: "10px" }}>
                {user ? user.name : ""}
              </span>
              {dropdownOpen && (
                <div style={{
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
                }}>
                  <div onClick={handleNavigateToProfile} style={{ padding: "10px 20px", cursor: "pointer" }}>
                    Profile
                  </div>
                  <div style={{ padding: "10px 20px", cursor: "pointer" }}>
                    Help
                  </div>
                  <div onClick={handleFeedback} style={{ padding: "10px 20px", cursor: "pointer" }}>
                    Feedback
                  </div>
                  <div onClick={handleLogout} style={{ padding: "10px 20px", cursor: "pointer" }}>
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="notifications-container">
        <div className="notifications-header">
          <h2>Notifications</h2>
        </div>

        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="no-notifications">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.notificationId}
                className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
              >
                <div className="notification-content">
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-time">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="notification-actions">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.notificationId)}
                      className="mark-read-btn"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.notificationId)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;