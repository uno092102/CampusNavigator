package com.campusnavigator.Entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;

    private String name;
    private String email;
    private String password; // Ensure this field exists

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CampusService> campusServices;

    // Getters and setters
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

    public List<CampusService> getCampusServices() {
        return campusServices;
    }

    public void setCampusServices(List<CampusService> campusServices) {
        this.campusServices = campusServices;
    }
}
