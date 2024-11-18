package com.campusnavigator.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;

    private String name;
    private String role;
    private String email;
    private String password;
    
    public User()
    {
        super();
    }

public User(int userID, String name, String role, String email, String password){

    this.userID = userID;
    this.name = name;
    this.role = role;
    this.email = email;
    this.password = password;
}

   public void setEmail(String email) {
       this.email = email;
   }
   public String getEmail() {
       return email;
   }
   public void setName(String name) {
       this.name = name;
   }
   public String getName() {
       return name;
   }
   public void setPassword(String password) {
       this.password = password;
   }
   public String getPassword() {
       return password;
   }
   public void setRole(String role) {
       this.role = role;
   }
   public String getRole() {
       return role;
   }
   public void setUserID(int userID) {
       this.userID = userID;
   }
   public int getUserID() {
       return userID;
   }
} 



