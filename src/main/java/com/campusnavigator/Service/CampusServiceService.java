package com.campusnavigator.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campusnavigator.Entity.CampusService;
import com.campusnavigator.Repository.CampusServiceRepository;

@Service
public class CampusServiceService {

    @Autowired
    private CampusServiceRepository crepo;

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

    // Update an existing CampusService
    public CampusService putCampusService(int serviceID, CampusService newCampusService) {
        CampusService existingService = crepo.findById(serviceID)
                .orElseThrow(() -> new NoSuchElementException("Campus Service with ID " + serviceID + " not found!"));

        // Update the fields
        existingService.setName(newCampusService.getName());
        existingService.setDescription(newCampusService.getDescription());
        existingService.setLocationID(newCampusService.getLocationID());
        existingService.setLocationType(newCampusService.getLocationType());
        existingService.setOperatingHours(newCampusService.getOperatingHours());
        existingService.setContactInfo(newCampusService.getContactInfo());
        existingService.setServiceType(newCampusService.getServiceType());
        existingService.setManagedBy(newCampusService.getManagedBy());

        // Save the updated service
        return crepo.save(existingService);
    }

    // Delete a CampusService by serviceID
    public String deleteCampusService(int serviceID) {
        if (crepo.existsById(serviceID)) {
            crepo.deleteById(serviceID);
            return "Campus Service successfully deleted!";
        } else {
            throw new NoSuchElementException("Campus Service with ID " + serviceID + " not found!");
        }
    }
}
