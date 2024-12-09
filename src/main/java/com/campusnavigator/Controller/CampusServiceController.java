package com.campusnavigator.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campusnavigator.Entity.CampusService;
import com.campusnavigator.Service.CampusServiceService;

@RestController
@RequestMapping("/api/campusservice") // Simplified mapping
@CrossOrigin
public class CampusServiceController {

    @Autowired
    private CampusServiceService campusServiceService;

    // Test API to verify the controller is working
    @GetMapping("/print")
    public String print() {
        return "Campus Service API is working!";
    }

    // Create a new CampusService
    @PostMapping
    public CampusService createCampusService(@RequestBody CampusService campusService) {
        return campusServiceService.postCampusService(campusService); // Use the correct method name
    }

    // Retrieve all CampusServices
    @GetMapping
    public List<CampusService> getAllCampusServices() {
        return campusServiceService.getAllCampusServices();
    }

    // Update an existing CampusService
    @PutMapping("/{serviceID}")
    public CampusService updateCampusService(
            @PathVariable int serviceID, 
            @RequestBody CampusService updatedCampusService) {
        return campusServiceService.putCampusService(serviceID, updatedCampusService); // Use the correct method name
    }

    // Delete a CampusService
    @DeleteMapping("/{serviceID}")
    public String deleteCampusService(@PathVariable int serviceID) {
        return campusServiceService.deleteCampusService(serviceID);
    }
}
