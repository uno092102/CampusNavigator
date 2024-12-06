package com.campusnavigator.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campusnavigator.Entity.CampusService;
import com.campusnavigator.Repository.CampusServiceRepository;

@Service
public class CampusServiceService {

    @Autowired
    CampusServiceRepository crepo;

    public CampusServiceService() {
        super();
    }

    // Add a new CampusService
    public CampusService postCampusService(CampusService campusService) {
        return crepo.save(campusService);
    }

    // Retrieve all CampusServices
    public List<CampusService> getAllCampusServices() {
        return crepo.findAll();
    }

    // Update an existing CampusService by serviceID
    public CampusService putCampusService(int serviceID, CampusService newCampusService) {
        // Fetch the existing CampusService
        Optional<CampusService> existingCampusService = crepo.findByServiceID(serviceID);

        if (existingCampusService.isPresent()) {
            CampusService campusService = existingCampusService.get();

            // Update fields
            campusService.setName(newCampusService.getName());
            campusService.setDescription(newCampusService.getDescription());
            campusService.setLocationID(newCampusService.getLocationID());
            campusService.setLocationID(newCampusService.getLocationID());
            campusService.setOperatingHours(newCampusService.getOperatingHours());
            campusService.setContactInfo(newCampusService.getContactInfo());
            campusService.setServiceID(newCampusService.getServiceID());
            campusService.setManagedBy(newCampusService.getManagedBy());

            return crepo.save(campusService);
        } else {
            throw new RuntimeException("Campus Service with ID " + serviceID + " not found!");
        }
    }

    // Delete a CampusService by serviceID
    public String deleteCampusService(int serviceID) {
        // Check if the CampusService exists
        Optional<CampusService> existingCampusService = crepo.findById(serviceID);

        if (existingCampusService.isPresent()) {
            crepo.deleteById(serviceID);
            return "Campus Service successfully deleted!";
        } else {
            return "Campus Service with ID " + serviceID + " not found!";
        }
    }
}
