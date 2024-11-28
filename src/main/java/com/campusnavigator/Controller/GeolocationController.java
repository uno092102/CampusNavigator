// GeolocationController.java
package com.campusnavigator.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.campusnavigator.Entity.GeolocationData;
import com.campusnavigator.Service.GeolocationService;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/geolocation")
@CrossOrigin
public class GeolocationController {

    @Autowired
    private GeolocationService gserv;

    // Test endpoint to check if the controller is working
    @GetMapping("/print")
    public ResponseEntity<String> print() {
        return ResponseEntity.ok("TEST TEST");
    }

    // Create a new Geolocation entry
    @PostMapping("/postGeolocation")
    public ResponseEntity<GeolocationData> postGeolocationData(@RequestBody GeolocationData geolocationData) {
        try {
            GeolocationData savedData = gserv.postGeolocationData(geolocationData);
            return ResponseEntity.ok(savedData);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Retrieve all Geolocation entries
    @GetMapping("/getAllGeolocation")
    public ResponseEntity<List<GeolocationData>> getGeolocation() {
        List<GeolocationData> geolocationDataList = gserv.getAllGeolocation();
        return ResponseEntity.ok(geolocationDataList);
    }

    // Retrieve a Geolocation entry by ID
    @GetMapping("/getGeolocation/{geolocationID}")
    public ResponseEntity<GeolocationData> getGeolocationById(@PathVariable int geolocationID) {
        GeolocationData geolocationData = gserv.getGeolocationById(geolocationID);
        if (geolocationData == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(geolocationData);
    }

    // Retrieve Geolocation entry by User ID
    @GetMapping("/getGeolocationByUser/{userID}")
    public ResponseEntity<GeolocationData> getGeolocationByUserId(@PathVariable int userID) {
        GeolocationData geolocationData = gserv.getGeolocationByUserId(userID);
        if (geolocationData == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(geolocationData);
    }

    // Update an existing Geolocation entry by ID
    @PutMapping("/putGeolocation/{geolocationID}")
    public ResponseEntity<GeolocationData> putGeolocationData(
            @PathVariable int geolocationID,
            @RequestBody GeolocationData newGeolocation) {
        GeolocationData updatedGeolocation = gserv.putGeolocation(geolocationID, newGeolocation);
        if (updatedGeolocation == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedGeolocation);
    }

    // Delete a Geolocation entry by ID
    @DeleteMapping("/deleteGeolocationData/{geolocationID}")
    public ResponseEntity<String> deleteGeolocationData(@PathVariable int geolocationID) {
        if (gserv.getGeolocationById(geolocationID) == null) {
            return ResponseEntity.notFound().build();
        }
        String message = gserv.deleteGeolocation(geolocationID);
        return ResponseEntity.ok(message);
    }
}