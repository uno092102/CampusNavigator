package com.campusnavigator.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.sql.Timestamp;

@Entity
public class GeolocationData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int geolocationID;

    private int userID;
    private double latitude;
    private double longitude;
    private Timestamp timeStamp;

    public GeolocationData() {
        super();
    }

    public GeolocationData(int geolocationID, int userID, double latitude, double longitude, Timestamp timeStamp) {
        super();
        this.geolocationID = geolocationID;
        this.userID = userID;
        this.latitude = latitude;
        this.longitude = longitude;
        this.timeStamp = timeStamp;
    }

    public void setGeolocationID(int geolocationID) {
        this.geolocationID = geolocationID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public void setTimeStamp(Timestamp timeStamp) {
        this.timeStamp = timeStamp;
    }

    public int getGeolocationID() {
        return geolocationID;
    }

    public int getUserID() {
        return userID;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public Timestamp getTimeStamp() {
        return timeStamp;
    }
}