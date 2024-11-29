// GeolocationData.java
package com.campusnavigator.Entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "GeolocationData")
public class GeolocationData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GeolocationID", nullable = false, unique = true)
    private int geolocationID;

    @ManyToOne
    @JoinColumn(name = "UserID", nullable = false)
    @JsonBackReference
    private User user;

    @Column(name = "Latitude", nullable = false)
    private double latitude;

    @Column(name = "Longitude", nullable = false)
    private double longitude;

    @Column(name = "Timestamp", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    private Timestamp timestamp;

    // Default constructor
    public GeolocationData() {
        super();
    }

    // Parameterized constructor
    public GeolocationData(int geolocationID, User user, double latitude, double longitude, Timestamp timestamp) {
        this.geolocationID = geolocationID;
        this.user = user;
        this.latitude = latitude;
        this.longitude = longitude;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public int getGeolocationID() {
        return geolocationID;
    }

    public void setGeolocationID(int geolocationID) {
        this.geolocationID = geolocationID;
    }

    @JsonProperty("userID")
    public int getUserID() {
        return user != null ? user.getUserID() : 0;
    }

    @JsonProperty("userID")
    public void setUserID(int userID) {
        if (this.user == null) {
            this.user = new User();
        }
        this.user.setUserID(userID);
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}