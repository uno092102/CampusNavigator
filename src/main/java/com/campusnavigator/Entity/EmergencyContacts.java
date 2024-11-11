package com.campusnavigator.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EmergencyContacts {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int contactID;

    private String name;
    private String phoneNumber;
    private String email;
    private String type;
    private String description;

    public EmergencyContacts()
    {
        super();
    }

    public EmergencyContacts(int contactID, String name, String phoneNumber, String email, String type,
    String description)
    {
        super();
        this.contactID = contactID;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.type = type;
        this.description = description;
    }

    //SETTER
    public void setContactID(int contactID) {
        this.contactID = contactID;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    //GETTER
    public int getContactID() {
        return contactID;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    
}
