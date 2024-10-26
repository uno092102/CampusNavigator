package com.campusnavigator.Entity;

import jakarta.persistence.*;

@Entity
public class MapData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mapID;

    @OneToOne
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    private String mapImageURL;

    public Long getMapID() {
        return mapID;
    }

    public void setMapID(Long mapID) {
        this.mapID = mapID;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public String getMapImageURL() {
        return mapImageURL;
    }

    public void setMapImageURL(String mapImageURL) {
        this.mapImageURL = mapImageURL;
    }
}