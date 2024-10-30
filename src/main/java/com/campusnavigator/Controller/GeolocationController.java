package com.campusnavigator.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
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
@RequestMapping("/api/geolocation")
public class GeolocationController {

    @Autowired
    GeolocationService gserv;

    @GetMapping("/print")
    public String print() {
        return "TEST TEST";
    }

    @PostMapping("/postGeolocation")
    public GeolocationData postGeolocationData(@RequestBody GeolocationData geolocationData) {
        return gserv.postGeolocationData(geolocationData);
    }

    @GetMapping("/getAllGeolocation")
    public List<GeolocationData> getGeolocation() {
        return gserv.getAllGeolocation();
    }

    @GetMapping("/getGeolocation/{geolocationID}")
    public GeolocationData getGeolocationById(@PathVariable int geolocationID) {
        return gserv.getGeolocationById(geolocationID);
    }

    @PutMapping("/putGeolocation/{geolocationID}")
    public GeolocationData putGeolocationData(@PathVariable int geolocationID, @RequestBody GeolocationData newGeolocation) {
        return gserv.putGeolocation(geolocationID, newGeolocation);
    }

    @DeleteMapping("/deleteGeolocationData/{geolocationID}")
    public String deleteGeolocationData(@PathVariable int geolocationID) {
        return gserv.deleteGeolocation(geolocationID);
    }
}