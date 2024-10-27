package com.campusnavigator.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.campusnavigator.Entity.GeolocationData;
import com.campusnavigator.Service.GeolocationService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/geolocation")
public class GeolocationController {

    @Autowired
    GeolocationService gserv;

    //TEST RUN 
    @GetMapping("/print")
    public String print() {
        return "TEST TEST";
    }
    
    //CREATE
    @PostMapping("/postSearchEntity")
    public GeolocationData postGeolocationData(@RequestBody GeolocationData geolocationData) {
        //TODO: process POST request
        
        return gserv.postGeolocationData(geolocationData);
    }
    
    //READ
    @GetMapping("/getAllGeolocation")
    public List<GeolocationData> getGeolocation() {
        return gserv.getAllGeolocation();
    }
    
    //UPDATE
    @PutMapping("/putGeolocation")
    public GeolocationData puGeolocationData(@RequestParam int geolocation, @RequestBody GeolocationData newGeolocation) {
        //TODO: process PUT request
        
        return gserv.putGeolocation(geolocation, newGeolocation);
    }

    //DELETE
    @DeleteMapping("/deleteGeolocationData/{geolocation}")
    public String deleteGeolocationData(@PathVariable int geolocation)
    {
        return gserv.deleteGeolocation(geolocation);
    }
}
