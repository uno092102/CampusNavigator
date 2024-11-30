import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './events.css';

const BASE_URL = 'http://localhost:8080/api/event';
const localizer = momentLocalizer(moment);

const Event = () => {
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

    // Fetch events on component mount
    useEffect(() => {
        fetchEvents();
    }, []);

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

    // Function to check for event conflicts
    const checkEventConflicts = (newEvent) => {
        return events.some(existingEvent => {
            // Check if the new event overlaps with any existing event
            return (
                (newEvent.startTime >= existingEvent.start && newEvent.startTime < existingEvent.end) ||
                (newEvent.endTime > existingEvent.start && newEvent.endTime <= existingEvent.end) ||
                (newEvent.startTime <= existingEvent.start && newEvent.endTime >= existingEvent.end)
            );
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentEvent(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear any previous error when user modifies input
        setError('');
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        
        // Check for event conflicts before creating
        if (checkEventConflicts(currentEvent)) {
            setError("There is an event already scheduled during this time.");
            return;
        }

        try {
            await axios.post(`${BASE_URL}/createEvent`, currentEvent);
            fetchEvents();
            resetForm();
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        if (currentEvent.eventID) {
            // Filter out the current event from conflict check to allow updates
            const conflictCheckEvents = events.filter(event => event.eventID !== currentEvent.eventID);
            
            // Temporarily replace events array for conflict checking
            const tempEvents = [
                ...conflictCheckEvents,
                {
                    ...currentEvent,
                    start: currentEvent.startTime,
                    end: currentEvent.endTime
                }
            ];

            // Check for conflicts in a way that excludes the current event
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
            } catch (error) {
                console.error('Error updating event:', error);
            }
        }
    };

    const handleSelectEvent = (event) => {
        setCurrentEvent(event);
        // Clear any previous error when selecting an event
        setError('');
    };

    const handleDelete = async () => {
        if (currentEvent.eventID) {
            try {
                await axios.delete(`${BASE_URL}/deleteEvent/${currentEvent.eventID}`);
                fetchEvents();
                resetForm();
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
        // Clear any error message when resetting form
        setError('');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2>Event Calendar</h2>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        onSelectEvent={handleSelectEvent}
                    />
                </div>
                <div className="col-md-6">
                    <h2>{currentEvent.eventID ? 'Edit Event' : 'Create Event'}</h2>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={currentEvent.eventID ? handleUpdateEvent : handleCreateEvent}>
                        <div className="form-group">
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
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={currentEvent.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
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
                        <div className="form-group">
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
                        <div className="form-group">
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
                        <div className="form-group">
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
                        <button type="submit" className="btn btn-primary">
                            {currentEvent.eventID ? 'Update Event' : 'Create Event'}
                        </button>
                        {currentEvent.eventID && (
                            <button 
                                type="button" 
                                className="btn btn-danger ml-2" 
                                onClick={handleDelete}
                            >
                                Delete Event
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Event;