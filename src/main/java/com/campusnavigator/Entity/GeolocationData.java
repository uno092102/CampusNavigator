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
    private int geolocation;

    private int userID;
    private float latitude;
    private float longitude;
    private Timestamp timeStamp;

    public GeolocationData()
    {
        super();
    }

    public GeolocationData(int geolocation, int userID, float latitude, float longitude, Timestamp timestamp)
    {
        super();
        this.geolocation = geolocation;
        this.userID = userID;
        this.latitude = latitude;
        this.longitude = longitude;
    }


    //SETTER
    public void setGeolocation(int geolocation) {
        this.geolocation = geolocation;
    }
    public void setUserID(int userID) {
        this.userID = userID;
    }
    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }
    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }
    public void setTimeStamp(Timestamp timeStamp) {
        this.timeStamp = timeStamp;
    }


    //GETTER
    public int getGeolocation() {
        return geolocation;
    }

    public int getUserID() {
        return userID;
    }

    public float getLatitude() {
        return latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public Timestamp getTimeStamp() {
        return timeStamp;
    }

}

