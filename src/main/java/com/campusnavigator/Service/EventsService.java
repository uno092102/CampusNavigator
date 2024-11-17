package com.campusnavigator.Service;

import com.campusnavigator.Entity.Events;
import com.campusnavigator.Repository.EventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventsService {

    @Autowired
    private EventsRepository eventsRepository;

    public List<Events> getAllEvents() {
        return eventsRepository.findAll();
    }

    public Optional<Events> getEventById(Long id) {
        return eventsRepository.findById(id);
    }

    public Events createEvent(Events event) {
        return eventsRepository.save(event);
    }

    public Events updateEvent(Long id, Events updatedEvent) {
        return eventsRepository.findById(id)
                .map(existingEvent -> {
                    updatedEvent.setId(id); // Ensure the correct ID is used for updating
                    return eventsRepository.save(updatedEvent);
                })
                .orElse(null);
    }

    public boolean deleteEvent(Long id) {
        if (eventsRepository.existsById(id)) {
            eventsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
