package com.campusnavigator.Entity;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class IncidentReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int incidentID;

    private int userID;
    private int locationID;
    private String locationType;
    private String description;
    private String category;
    private String status;
    private Timestamp timestamp;

    public IncidentReport(){
        super();
    }

    public IncidentReport(int userID,int locationID,String locationType,String description,String category,String status,Timestamp timestamp){
        super();
        this.userID = userID;
        this.locationID = locationID;
        this.locationType = locationType;
        this.description = description;
        this.category = category;
        this.status = status;
        this.timestamp = timestamp;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public void setIncidentID(int incidentID) {
        this.incidentID = incidentID;
    }

    public void setLocationID(int locationID) {
        this.locationID = locationID;
    }

    public void setLocationType(String locationType) {
        this.locationType = locationType;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public int getIncidentID() {
        return incidentID;
    }

    public int getLocationID() {
        return locationID;
    }

    public String getLocationType() {
        return locationType;
    }

    public String getStatus() {
        return status;
    }
    
    public Timestamp getTimestamp() {
        return timestamp;
    }

    public int getUserID() {
        return userID;
    }

    public IncidentReport get() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'get'");
    }

    
}
