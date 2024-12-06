package com.campusnavigator.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CampusService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int serviceID;

    private String name;
    private String description;
    private int locationID;
    private String locationType;
    private String operatingHours;
    private String contactInfo;
    private String serviceType;
    private int managedBy;

    public CampusService() {
        super();
    }

    public CampusService(String name, String description, int locationID, String locationType, 
                         String operatingHours, String contactInfo, String serviceType, int managedBy) {
        super();
        this.name = name;
        this.description = description;
        this.locationID = locationID;
        this.locationType = locationType;
        this.operatingHours = operatingHours;
        this.contactInfo = contactInfo;
        this.serviceType = serviceType;
        this.managedBy = managedBy;
    }

    // Getters
    public int getServiceID() {
        return serviceID;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getLocationID() {
        return locationID;
    }

    public String getLocationType() {
        return locationType;
    }

    public String getOperatingHours() {
        return operatingHours;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public String getServiceType() {
        return serviceType;
    }

    public int getManagedBy() {
        return managedBy;
    }

    // Setters
    public void setServiceID(int serviceID) {
        this.serviceID = serviceID;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocationID(int locationID) {
        this.locationID = locationID;
    }

    public void setLocationType(String locationType) {
        this.locationType = locationType;
    }

    public void setOperatingHours(String operatingHours) {
        this.operatingHours = operatingHours;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public void setManagedBy(int managedBy) {
        this.managedBy = managedBy;
    }

    public CampusService get() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'get'");
    }
}
