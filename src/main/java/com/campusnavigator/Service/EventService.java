package com.campusnavigator.Service;

import com.campusnavigator.Entity.Event;
import com.campusnavigator.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Transactional(readOnly = true)
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    @Transactional
    public Event createEvent(Event event) {
        // Additional validation can be added here
        return eventRepository.save(event);
    }

    @Transactional
    public Event updateEvent(Long id, Event eventDetails) {
        Event existingEvent = eventRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));

        // Update only mutable fields
        existingEvent.setName(eventDetails.getName());
        existingEvent.setDescription(eventDetails.getDescription());
        existingEvent.setLocationID(eventDetails.getLocationID());
        existingEvent.setLocationType(eventDetails.getLocationType());
        existingEvent.setStartTime(eventDetails.getStartTime());
        existingEvent.setEndTime(eventDetails.getEndTime());
        existingEvent.setOrganizer(eventDetails.getOrganizer());
        existingEvent.setParticipants(eventDetails.getParticipants());

        return eventRepository.save(existingEvent);
    }

    @Transactional
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        
        eventRepository.delete(event);
    }
}