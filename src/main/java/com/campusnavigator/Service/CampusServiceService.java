package com.campusnavigator.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

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

    @SuppressWarnings("finally")
    public CampusService putCampusService(int serviceID, CampusService newCampusService) {
        CampusService campusService = new CampusService();

        try {
            // Find the existing service by serviceID
            campusService = crepo.findByServiceID(serviceID).get();

            // Update the fields
            campusService.setName(newCampusService.getName());
            campusService.setDescription(newCampusService.getDescription());
            campusService.setLocationID(newCampusService.getLocationID());
            campusService.setLocationType(newCampusService.getLocationType());
            campusService.setOperatingHours(newCampusService.getOperatingHours());
            campusService.setContactInfo(newCampusService.getContactInfo());
            campusService.setServiceType(newCampusService.getServiceType());
            campusService.setManagedBy(newCampusService.getManagedBy());

        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Campus Service with ID " + serviceID + " not found!");
        } finally {
            return crepo.save(campusService);
        }
    }

    // Delete a CampusService by serviceID
    public String deleteCampusService(int serviceID) {
        String msg = "";

        if (crepo.findById(serviceID).isPresent()) {
            crepo.deleteById(serviceID);
            msg = "Campus Service successfully deleted!";
        } else {
            msg = "Campus Service with ID " + serviceID + " not found!";
        }

        return msg;
    }
}
