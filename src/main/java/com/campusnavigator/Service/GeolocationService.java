// GeolocationService.java
package com.campusnavigator.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campusnavigator.Entity.GeolocationData;
import com.campusnavigator.Entity.User;
import com.campusnavigator.Repository.GeolocationRepository;
import com.campusnavigator.Repository.UserRepository;

@Service
public class GeolocationService {

    @Autowired
    private GeolocationRepository grepo;

    @Autowired
    private UserRepository userRepository;

    // Save a new GeolocationData entry
    public GeolocationData postGeolocationData(GeolocationData geolocation) {
        // Retrieve the User entity by userID
        int userID = geolocation.getUserID();
        User user = userRepository.findById(userID).orElse(null);
        if (user == null) {
            throw new IllegalArgumentException("User with ID " + userID + " does not exist.");
        }

        // Set the User entity in GeolocationData
        geolocation.setUser(user);

        // Save the GeolocationData
        return grepo.save(geolocation);
    }

    // Retrieve all GeolocationData entries
    public List<GeolocationData> getAllGeolocation() {
        return grepo.findAll();
    }

    // Retrieve a GeolocationData entry by its ID
    public GeolocationData getGeolocationById(int geolocationID) {
        return grepo.findById(geolocationID).orElse(null);
    }

    // Retrieve GeolocationData by userID
    public GeolocationData getGeolocationByUserId(int userID) {
        return grepo.findByUser_UserID(userID);
    }

    // Update an existing GeolocationData entry by ID
    public GeolocationData putGeolocation(int geolocationID, GeolocationData newGeolocation) {
        return grepo.findById(geolocationID).map(existingGeolocation -> {
            existingGeolocation.setLatitude(newGeolocation.getLatitude());
            existingGeolocation.setLongitude(newGeolocation.getLongitude());
            existingGeolocation.setTimestamp(newGeolocation.getTimestamp());

            // If the user is being updated, fetch and set the User entity
            int userID = newGeolocation.getUserID();
            User user = userRepository.findById(userID).orElse(null);
            if (user != null) {
                existingGeolocation.setUser(user);
            } else {
                throw new IllegalArgumentException("User with ID " + userID + " does not exist.");
            }

            return grepo.save(existingGeolocation);
        }).orElse(null);
    }

    // Delete a GeolocationData entry by ID
    public String deleteGeolocation(int geolocationID) {
        if (grepo.existsById(geolocationID)) {
            grepo.deleteById(geolocationID);
            return "Geolocation Data successfully deleted!";
        } else {
            return "Geolocation ID " + geolocationID + " NOT FOUND";
        }
    }
}