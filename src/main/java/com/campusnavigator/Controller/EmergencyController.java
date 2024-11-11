package com.campusnavigator.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.campusnavigator.Entity.EmergencyContacts;
import com.campusnavigator.Service.EmergencyService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
public class EmergencyController {
    @Autowired
    EmergencyService eserv;

    //TEST RUN
    @GetMapping("/print")
    public String print() {
        return "TEST TEST SUCCESSFUL!";
    }

    ///CREATE
    @PostMapping("/postContacts")
    public EmergencyContacts postContactRecord(@RequestBody EmergencyContacts emergency) 
    {     
        return eserv.postContacts(emergency);
    }

    //READ
    @GetMapping("/getAllContacts")
    public List<EmergencyContacts> getContacts()
    {
        return eserv.getAllContacts();
    }

    //UPDATE
    @PutMapping("/putContactRecord")
    public EmergencyContacts putContacts(@RequestParam int contactID, @RequestBody EmergencyContacts newEmergencyContacts) {
        //TODO: process PUT request
        
        return eserv.putContacts(contactID, newEmergencyContacts);
    }

    @DeleteMapping("/deleteContacts/{contactID}")
    public String deleteContactRecord(@PathVariable int contactID)
    {
        return eserv.deleteContacts(contactID);
    }
    
    
    
}
