import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";
import axios from 'axios';
import moment from 'moment';
import './notification.css';

const BASE_URL = 'http://localhost:8080/api/notifications';


const Notification = () => {
    const navigate = useNavigate();
    
    // States
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [developerMode, setDeveloperMode] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const searchRef = useRef(null);

    // Notification Handlers
    const fetchNotifications = async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/${userId}`);
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const fetchUnreadCount = async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/${userId}/unread/count`);
            setUnreadCount(response.data);
        } catch (error) {
            console.error('Error fetching unread count:', error);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await axios.put(`${BASE_URL}/read/${notificationId}`);
            fetchNotifications(user.id);
            fetchUnreadCount(user.id);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.put(`${BASE_URL}/read/all/${user.id}`);
            fetchNotifications(user.id);
            fetchUnreadCount(user.id);
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await axios.delete(`${BASE_URL}/${notificationId}`);
            fetchNotifications(user.id);
            fetchUnreadCount(user.id);
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    // Profile Handlers
    const handleNavigateToProfile = () => {
        setDropdownOpen(false);
        navigate("/userprofile");
    };

    const handleToggleDevelopersMode = () => {
        setDeveloperMode((prevDeveloperMode) => !prevDeveloperMode);
    };

    const handleFeedback = () => {
        navigate("/Feedback");
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    // Effects
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData) {
            navigate("/login");
        } else {
            setUser(userData);
            fetchNotifications(userData.id);
            fetchUnreadCount(userData.id);
        }
    }, [navigate]);

    return (
        <div>
            {/* Header Component */}
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
                    {/* Logo and Search */}
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

                    {/* Navigation Links and User Profile */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <a href="/event" style={{
                            color: "#FFFFFF",
                            marginRight: "30px",
                            textDecoration: "none",
                            fontSize: "16px",
                        }}>
                            Calendar
                        </a>
                        <a href="#" style={{
                            color: "#FFFFFF",
                            marginRight: "30px",
                            textDecoration: "none",
                            fontSize: "16px",
                        }}>
                            Campus Service
                        </a>
                        <a href="#" style={{
                            color: "#FFFFFF",
                            marginRight: "30px",
                            textDecoration: "none",
                            fontSize: "16px",
                        }}>
                            Announcement
                        </a>

                        {/* Notifications */}
                        <div style={{ marginRight: "20px", cursor: "pointer" }}>
                            <a href="/notifications" style={{ color: "#FFFFFF" }}>
                                <FaBell size={24} />
                                {unreadCount > 0 && (
                                    <span className="notification-badge">{unreadCount}</span>
                                )}
                            </a>
                        </div>

                        {/* User Profile Dropdown */}
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
                                onClick={() => {
                                    setDropdownOpen(!dropdownOpen);
                                }}
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
                                    <div
                                        onClick={handleToggleDevelopersMode}
                                        style={{ padding: "10px 20px", cursor: "pointer" }}
                                    >
                                        {developerMode ? "Disable Developer Mode" : "Enable Developer Mode"}
                                    </div>
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

            {/* Main Content */}
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Notifications ({unreadCount} unread)</h2>
                    <button 
                        className="btn btn-primary"
                        onClick={markAllAsRead}
                        style={{ backgroundColor: "#7757FF", border: "none" }}
                    >
                        Mark All as Read
                    </button>
                </div>
                
                <div className="notification-list">
                    {notifications.map((notification) => (
                        <div 
                            key={notification.notificationID}
                            className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                        >
                            <div className="notification-content">
                                <p>{notification.message}</p>
                                <small>{moment(notification.timestamp).fromNow()}</small>
                            </div>
                            <div className="notification-actions">
                                {!notification.isRead && (
                                    <button 
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => markAsRead(notification.notificationID)}
                                    >
                                        Mark as Read
                                    </button>
                                )}
                                <button 
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => deleteNotification(notification.notificationID)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {notifications.length === 0 && (
                        <p className="text-center text-muted">No notifications</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notification;