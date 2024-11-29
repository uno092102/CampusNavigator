package com.campusnavigator.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventID;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Long locationID;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LocationType locationType;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    private String organizer;

    @ManyToOne
    @JoinColumn(name = "building_id")
    private Building building;

    // Relationship with PointOfInterest
    @ManyToOne
    @JoinColumn(name = "poi_id")
    private PointOfInterest pointOfInterest;

    // ElementCollection for participants
    @ElementCollection
    private List<String> participants;

    // Enum for location type
    public enum LocationType {
        Building,
        PointOfInterest
    }




    // Constructors
    public Event() {}

       // Add getters and setters for building and pointOfInterest
       public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public PointOfInterest getPointOfInterest() {
        return pointOfInterest;
    }

    public void setPointOfInterest(PointOfInterest pointOfInterest) {
        this.pointOfInterest = pointOfInterest;
    }

    // Getters and Setters (omitted for brevity, but should be fully implemented)
    public Long getEventID() { return eventID; }
    public void setEventID(Long eventID) { this.eventID = eventID; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getLocationID() { return locationID; }
    public void setLocationID(Long locationID) { this.locationID = locationID; }

    public LocationType getLocationType() { return locationType; }
    public void setLocationType(LocationType locationType) { this.locationType = locationType; }

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }

    public String getOrganizer() { return organizer; }
    public void setOrganizer(String organizer) { this.organizer = organizer; }

    public List<String> getParticipants() { return participants; }
    public void setParticipants(List<String> participants) { this.participants = participants; }
}
