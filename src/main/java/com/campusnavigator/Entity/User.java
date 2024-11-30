package com.campusnavigator.Entity;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;

    private String name;
    private String role;
    private String email;
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true) // Relationship mapping
    @JsonManagedReference
    private List<GeolocationData> geolocationData; // A user can have multiple geolocation entries

    // Default constructor
    public User() {
        super();
    }

    // Parameterized constructor
    public User(int userID, String name, String role, String email, String password) {
        this.userID = userID;
        this.name = name;
        this.role = role;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters for basic fields
    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Getter for geolocationData
    public List<GeolocationData> getGeolocationData() {
        return geolocationData;
    }

    // Setter for geolocationData
    public void setGeolocationData(List<GeolocationData> geolocationData) {
        this.geolocationData = geolocationData;
    }
}