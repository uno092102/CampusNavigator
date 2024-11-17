import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";

const Events = () => {
  const [events, setEvents] = useState([]); // All events
  const [selectedDate, setSelectedDate] = useState(new Date()); // Currently selected date
  const [selectedEvent, setSelectedEvent] = useState(null); // Event on selected date
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    date_time: "",
  });

  const [showForm, setShowForm] = useState(false);

  // Fetch all events when the component loads
  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchEventByDate = async (date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0]; // "yyyy-MM-dd"
      const response = await axios.get(
        `http://localhost:8080/api/events?date=${formattedDate}`
      );
      const event = response.data;

      if (event) {
        setSelectedEvent(event);
        setFormData({
          name: event.name,
          location: event.location,
          description: event.description,
          date_time: event.date_time.slice(0, 19), // Format to "yyyy-MM-ddTHH:mm:ss"
        });
        setShowForm(false);
      } else {
        setSelectedEvent(null);
        setShowForm(true);
        setFormData({
          name: "",
          location: "",
          description: "",
          date_time: formatDateForInput(date),
        });
      }
    } catch (error) {
      console.error("Error fetching event by date:", error);
    }
  };

  const formatDateForInput = (dateTime) => {
    const date = new Date(dateTime);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}T${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}`;
  };

  const isValidDateTime = (dateTime) => {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    return regex.test(dateTime);
  };

  const formatForBackend = (dateTime) => {
    const date = new Date(dateTime.replace("T", " "));
    return date.toISOString(); // Convert to ISO format for backend
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchEventByDate(date);
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    try {
      await axios.delete(`http://localhost:8080/api/events/${selectedEvent.id}`);   
      alert("Event deleted successfully!");
      setSelectedEvent(null);
      fetchAllEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();

    if (!isValidDateTime(formData.date_time)) {
      alert("Invalid date-time format! Please use 'YYYY-MM-DDTHH:mm:ss'.");
      return;
    }

    try {
      const payload = {
        ...formData,
        date_time: formatForBackend(formData.date_time),
      };

      if (selectedEvent) {
        await axios.put(
          `http://localhost:8080/api/events/${selectedEvent.id}`,
          payload
        );
        alert("Event updated successfully!");
      } else {
        const response = await axios.post("http://localhost:8080/api/events", payload);
        setEvents((prev) => [...prev, response.data]);
        alert("Event created successfully!");
      }

      fetchAllEvents();
      setSelectedEvent(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Failed to save event.");
    }
  };

  return (
    <div>
      <h1>Events Calendar</h1>

      <Calendar
        onChange={handleDateClick}
        value={selectedDate}
        tileContent={({ date }) => {
          const eventExists = events.some(
            (event) =>
              new Date(event.date_time).toDateString() === date.toDateString()
          );
          return eventExists ? <span>📅</span> : null;
        }}
      />

      <button
        onClick={() => {
          setShowForm(true);
          setSelectedEvent(null);
          setFormData({
            name: "",
            location: "",
            description: "",
            date_time: formatDateForInput(new Date()),
          });
        }}
      >
        Create Event
      </button>

      {selectedEvent && (
        <div>
          <h2>Event Details</h2>
          <p>
            <strong>Name:</strong> {selectedEvent.name}
          </p>
          <p>
            <strong>Location:</strong> {selectedEvent.location}
          </p>
          <p>
            <strong>Description:</strong> {selectedEvent.description}
          </p>
          <p>
            <strong>Date & Time:</strong>{" "}
            {new Date(selectedEvent.date_time).toLocaleString()}
          </p>
          <button onClick={() => setShowForm(true)}>Edit Event</button>
          <button onClick={handleDeleteEvent}>Delete Event</button>
        </div>
      )}

      {showForm && (
        <div>
          <h2>{selectedEvent ? "Edit Event" : "Create Event"}</h2>
          <form onSubmit={handleSaveEvent}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </label>
            <br />
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
            </label>
            <br />
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              ></textarea>
            </label>
            <br />
            <label>
              Date & Time:
              <input
                type="datetime-local"
                name="date_time"
                value={formData.date_time}
                onChange={(e) =>
                  setFormData({ ...formData, date_time: e.target.value })
                }
                required
              />
            </label>
            <br />
            <button type="submit">
              {selectedEvent ? "Update Event" : "Create Event"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Events;
