package com.campusnavigator.Entity;

import javax.persistence.*;

@Entity
public class PointOfInterest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long poi_ID;

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    private String name;

    private String description;

    private String type;

    public Long getPoi_ID() {
        return poi_ID;
    }

    public void setPoi_ID(Long poi_ID) {
        this.poi_ID = poi_ID;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}