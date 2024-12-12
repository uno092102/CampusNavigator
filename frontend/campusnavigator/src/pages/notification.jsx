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
  const [showUnreadOnly, setShowUnreadOnly] = useState(true);
  
  const [deletedNotificationIds, setDeletedNotificationIds] = useState(() => {
  const stored = localStorage.getItem('deletedNotificationIds');

  
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    const fetchBuildingsAndNotifications = async () => {
      try {
        const buildingsResponse = await axios.get('http://localhost:8080/api/buildings');
        setBuildings(buildingsResponse.data);
        const eventsResponse = await axios.get('http://127.0.0.1:8080/api/event/getAllEvents');
    setBuildings(buildingsResponse.data);
    
        

        const existingNotifications = await axios.get('http://localhost:8080/api/notifications');
        const existingMessages = existingNotifications.data.map(n => n.message);
  
        for (const building of buildingsResponse.data) {
          const message = `Building "${building.name}" has been added.`;
          if (!existingMessages.includes(message)) {
            await axios.post('http://localhost:8080/api/notifications', message, {
              headers: {
                'Content-Type': 'text/plain'
              }
            });
          }
        }

          // Handle event notifications
    for (const event of eventsResponse.data) {
        const eventMessage = `New event "${event.name}" has been created.`;
        if (!existingMessages.includes(eventMessage)) {
          await axios.post('http://localhost:8080/api/notifications', eventMessage, {
            headers: {
              'Content-Type': 'text/plain'
            }
          });
        }
      }

     
  

        const filteredNotifications = existingNotifications.data
          .filter(notification => 
            !deletedNotificationIds.includes(notification.notificationId) &&
            !notification.isRead
          )
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        setNotifications(filteredNotifications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    
    
    const handleBuildingDelete = async (buildingId, buildingName) => {
        try {
          // Delete the building
          await axios.delete(`http://localhost:8080/api/buildings/${buildingId}`);
          
          // Create notification for building deletion
          const deletionMessage = `Building "${buildingName}" has been deleted.`;
          await axios.post('http://localhost:8080/api/notifications', deletionMessage, {
            headers: {
              'Content-Type': 'text/plain'
            }
          });
      
          // Refresh notifications list
          const response = await axios.get('http://localhost:8080/api/notifications');
          const filteredNotifications = response.data
            .filter(notification => !deletedNotificationIds.includes(notification.notificationId) && !notification.isRead)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          
          setNotifications(filteredNotifications);
          
        } catch (error) {
          console.error('Error handling building deletion:', error);
        }
      };

      

    fetchBuildingsAndNotifications();
  }, [deletedNotificationIds]);

  const deleteAllNotifications = async () => {
    try {
      const deletionPromises = notifications.map(notification => 
        axios.delete(`http://localhost:8080/api/notifications/${notification.notificationId}`)
      );
      
      const results = await Promise.allSettled(deletionPromises);
      const successfulDeletions = results
        .filter(result => result.status === 'fulfilled')
        .map((result, index) => notifications[index].notificationId);
      
      const updatedDeletedIds = [...deletedNotificationIds, ...successfulDeletions];
      setDeletedNotificationIds(updatedDeletedIds);
      localStorage.setItem('deletedNotificationIds', JSON.stringify(updatedDeletedIds));
      
      setNotifications([]);
    } catch (error) {
      console.error('Error deleting all notifications:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(`http://localhost:8080/api/notifications/${notificationId}`);
      
      const updatedDeletedIds = [...deletedNotificationIds, notificationId];
      setDeletedNotificationIds(updatedDeletedIds);
      localStorage.setItem('deletedNotificationIds', JSON.stringify(updatedDeletedIds));
      
      setNotifications(notifications.filter(n => n.notificationId !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  

  // Modify the markAsRead function
const markAsRead = async (notificationId) => {
    try {
      await axios.put(`http://localhost:8080/api/notifications/${notificationId}/read`);
      // Update the notification in the current state
      setNotifications(notifications.filter(n => n.notificationId !== notificationId));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleBuildingDelete = async (buildingId, buildingName) => {
    try {
      // Delete the building
      await axios.delete(`http://localhost:8080/api/buildings/${buildingId}`);
      
      // Create notification for building deletion
      const deletionMessage = `Building "${buildingName}" has been deleted.`;
      await axios.post('http://localhost:8080/api/notifications', deletionMessage, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
  
      // Refresh notifications list
      const response = await axios.get('http://localhost:8080/api/notifications');
      const filteredNotifications = response.data
        .filter(notification => !deletedNotificationIds.includes(notification.notificationId) && !notification.isRead)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      setNotifications(filteredNotifications);
      
    } catch (error) {
      console.error('Error handling building deletion:', error);
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
    {/* Header Component */}
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

      <div className="notifications-container">
        <div className="notifications-header">
          <h2>Notifications</h2>
          {notifications.length > 0 && (
            <button 
              onClick={deleteAllNotifications}
              className="delete-all-btn"
              style={{
                backgroundColor: "#ff4444",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                marginLeft: "20px"
              }}
            >
              Delete All
            </button>
          )}
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
