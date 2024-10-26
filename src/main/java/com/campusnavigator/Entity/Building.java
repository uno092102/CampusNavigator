package com.campusnavigator.Entity;

import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buildingID;

    private String name;

    private String description;

    private Double locationLatitude;

    private Double locationLongitude;

    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PointOfInterest> pointsOfInterest;

    @OneToOne(mappedBy = "building", cascade = CascadeType.ALL, orphanRemoval = true)
    private MapData mapData;

    public Long getBuildingID() {
        return buildingID;
    }

    public void setBuildingID(Long buildingID) {
        this.buildingID = buildingID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

        public String getDescription() {
                return description;
        }

        public void setDescription(String description) {
                this.description = description;
        }
        
    public Double getLocationLatitude() {
        return locationLatitude;
    }

    public void setLocationLatitude(Double locationLatitude) {
        this.locationLatitude = locationLatitude;
    }

    public Double getLocationLongitude() {
        return locationLongitude;
    }

    public void setLocationLongitude(Double locationLongitude) {
        this.locationLongitude = locationLongitude;
    }

    public Set<PointOfInterest> getPointsOfInterest() {
        return pointsOfInterest;
    }

    public void setPointsOfInterest(Set<PointOfInterest> pointsOfInterest) {
        this.pointsOfInterest = pointsOfInterest;
    }

    public MapData getMapData() {
        return mapData;
    }

    public void setMapData(MapData mapData) {
        this.mapData = mapData;
    }
}