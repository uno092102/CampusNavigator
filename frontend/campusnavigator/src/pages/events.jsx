import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './events.css';

const BASE_URL = 'http://localhost:8080/api/event';
const localizer = momentLocalizer(moment);

const Event = () => {
    const navigate = useNavigate();

    // State Management
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [developerMode, setDeveloperMode] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);
    const searchRef = useRef(null);

    // Event States
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({
        name: '',
        description: '',
        locationID: 0,
        locationType: 'Building',
        startTime: null,
        endTime: null,
        organizer: null,
        participants: []
    });
    const [error, setError] = useState('');

    // Create Event Button Component
    const CreateEventButton = () => {
        return (
            <button
                onClick={() => setShowCreateEventModal(true)}
                className="btn btn-primary mb-3"
                style={{
                    backgroundColor: "#7757FF",
                    border: "none",
                }}
            >
                Create Event
            </button>
        );
    };

    useEffect(() => {
        document.title = 'Calendar - Campus Navigator';
      }, []);

    // Effects
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData) {
            navigate("/login");
        } else {
            setUser(userData);
        }
    }, [navigate]);

    useEffect(() => {
        fetchEvents();
    }, []);

    // Helper Functions
    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getAllEvents`);
            const formattedEvents = response.data.map(event => ({
                ...event,
                start: new Date(event.startTime),
                end: new Date(event.endTime),
                title: event.name
            }));
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const checkEventConflicts = (newEvent) => {
        return events.some(existingEvent => {
            return (
                (newEvent.startTime >= existingEvent.start && newEvent.startTime < existingEvent.end) ||
                (newEvent.endTime > existingEvent.start && newEvent.endTime <= existingEvent.end) ||
                (newEvent.startTime <= existingEvent.start && newEvent.endTime >= existingEvent.end)
            );
        });
    };

    // Event Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentEvent(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        if (checkEventConflicts(currentEvent)) {
            setError("There is an event already scheduled during this time.");
            return;
        }
        try {
            await axios.post(`${BASE_URL}/createEvent`, currentEvent);
            fetchEvents();
            resetForm();
            setShowCreateEventModal(false);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        if (currentEvent.eventID) {
            const conflictCheckEvents = events.filter(event => event.eventID !== currentEvent.eventID);
            
            const tempEvents = [
                ...conflictCheckEvents,
                {
                    ...currentEvent,
                    start: currentEvent.startTime,
                    end: currentEvent.endTime
                }
            ];

            const hasConflicts = tempEvents.some((existingEvent, index) => 
                index < conflictCheckEvents.length && (
                    (currentEvent.startTime >= existingEvent.start && currentEvent.startTime < existingEvent.end) ||
                    (currentEvent.endTime > existingEvent.start && currentEvent.endTime <= existingEvent.end) ||
                    (currentEvent.startTime <= existingEvent.start && currentEvent.endTime >= existingEvent.end)
                )
            );

            if (hasConflicts) {
                setError("There is an event already scheduled during this time.");
                return;
            }
            try {
                await axios.put(`${BASE_URL}/updateEvent/${currentEvent.eventID}`, currentEvent);
                fetchEvents();
                resetForm();
                setShowCreateEventModal(false);
            } catch (error) {
                console.error('Error updating event:', error);
            }
        }
    };

    const handleSelectEvent = (event) => {
        setCurrentEvent(event);
        setError('');
    };

    const handleDelete = async () => {
        if (currentEvent.eventID) {
            try {
                await axios.delete(`${BASE_URL}/deleteEvent/${currentEvent.eventID}`);
                fetchEvents();
                resetForm();
                setShowCreateEventModal(false);
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const resetForm = () => {
        setCurrentEvent({
            name: '',
            description: '',
            locationID: 0,
            locationType: 'Building',
            startTime: null,
            endTime: null,
            organizer: null,
            participants: []
        });
        setError('');
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
                    {/* Navigation Links and User Profile */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* Navigation Links */}
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
                            <a href="/notifications" style={{ color: "#FFFFFF" }}>
                                <FaBell size={24} />
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
  <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Event Calendar</h2>
                        {developerMode && <CreateEventButton />}
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            onSelectEvent={handleSelectEvent}
                        />
                    </div>
                </div>
            </div>

            {/* Create Event Modal */}
            <Modal 
                show={showCreateEventModal} 
                onHide={() => {
                    setShowCreateEventModal(false);
                    resetForm();
                }} 
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{currentEvent.eventID ? 'Edit Event' : 'Create Event'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-md-12">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form onSubmit={currentEvent.eventID ? handleUpdateEvent : handleCreateEvent}>
                            <div className="form-group mb-3">
                                <label>Event Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={currentEvent.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={currentEvent.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Start Time</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="startTime"
                                    value={currentEvent.startTime ? moment(currentEvent.startTime).format('YYYY-MM-DDTHH:mm') : ''}
                                    onChange={(e) => {
                                        setCurrentEvent(prev => ({
                                            ...prev,
                                            startTime: new Date(e.target.value)
                                        }));
                                        setError('');
                                    }}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>End Time</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="endTime"
                                    value={currentEvent.endTime ? moment(currentEvent.endTime).format('YYYY-MM-DDTHH:mm') : ''}
                                    onChange={(e) => {
                                        setCurrentEvent(prev => ({
                                            ...prev,
                                            endTime: new Date(e.target.value)
                                        }));
                                        setError('');
                                    }}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Location Type</label>
                                <select
                                    className="form-control"
                                    name="locationType"
                                    value={currentEvent.locationType}
                                    onChange={handleInputChange}
                                >
                                    <option value="Building">Building</option>
                                    <option value="PointOfInterest">Point of Interest</option>
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label>Location ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="locationID"
                                    value={currentEvent.locationID}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mt-3">
                                <button type="submit" className="btn btn-primary me-2">
                                    {currentEvent.eventID ? 'Update Event' : 'Create Event'}
                                </button>
                                {currentEvent.eventID && (
                                    <button 
                                        type="button" 
                                        className="btn btn-danger me-2" 
                                        onClick={handleDelete}
                                    >
                                        Delete Event
                                    </button>
                                )}
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => {
                                        resetForm();
                                        setShowCreateEventModal(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Event;

