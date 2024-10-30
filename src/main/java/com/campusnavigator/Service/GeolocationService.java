package com.campusnavigator.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.campusnavigator.Entity.GeolocationData;
import com.campusnavigator.Repository.GeolocationRepository;

@Service
public class GeolocationService {
    @Autowired
    GeolocationRepository grepo;

    public GeolocationData postGeolocationData(GeolocationData geolocation) {
        return grepo.save(geolocation);
    }

    public List<GeolocationData> getAllGeolocation() {
        return grepo.findAll();
    }

    public GeolocationData getGeolocationById(int geolocationID) {
        return grepo.findById(geolocationID).orElse(null);
    }

    public GeolocationData putGeolocation(int geolocationID, GeolocationData newGeolocation) {
        GeolocationData geolocationData = grepo.findById(geolocationID).orElse(null);
        if (geolocationData != null) {
            geolocationData.setLatitude(newGeolocation.getLatitude());
            geolocationData.setLongitude(newGeolocation.getLongitude());
            geolocationData.setTimeStamp(newGeolocation.getTimeStamp());
            geolocationData.setUserID(newGeolocation.getUserID());
            return grepo.save(geolocationData);
        } else {
            return null;
        }
    }

    public String deleteGeolocation(int geolocationID) {
        if (grepo.existsById(geolocationID)) {
            grepo.deleteById(geolocationID);
            return "Geolocation Data Successfully deleted!";
        } else {
            return geolocationID + " NOT FOUND";
        }
    }
}