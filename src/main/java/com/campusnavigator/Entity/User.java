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
    private boolean admin; // Added attribute to represent admin status

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference 
    private List<GeolocationData> geolocationData;

    // Default constructor
    public User() {
        super();
    }

    // Parameterized constructor including the new 'admin' attribute
    public User(int userID, String name, String role, String email, String password, boolean admin) {
        this.userID = userID;
        this.name = name;
        this.role = role;
        this.email = email;
        this.password = password;
        this.admin = admin;
    }

    // Getters and Setters for all attributes, including 'admin'

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

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public List<GeolocationData> getGeolocationData() {
        return geolocationData;
    }

    public void setGeolocationData(List<GeolocationData> geolocationData) {
        this.geolocationData = geolocationData;
    }
}