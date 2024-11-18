package com.campusnavigator.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.campusnavigator.Entity.AnnouncementEntity;
import com.campusnavigator.Service.AnnouncementService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping(method = RequestMethod.GET,path = "/api/announcement")
@CrossOrigin
public class AnnouncementController {
    @Autowired
    AnnouncementService aserv;

    //TEST RUN 
    @GetMapping("/print")
    public String print() {
        return "TEST TEST";
    }

    //CREATE
    @PostMapping("/postAnnouncement")
    public AnnouncementEntity postAnnouncement(@RequestBody AnnouncementEntity announcement) {
        return aserv.postAnnouncement(announcement);
    }

    //UPDATE
    @PutMapping("/putAnnouncement")
    public AnnouncementEntity putAnnouncement(@PathVariable int announcementID, @RequestBody AnnouncementEntity newAnnouncementEntity)
    {
        return aserv.putAnnouncement(announcementID, newAnnouncementEntity);
    }

    //DELETE
    @DeleteMapping("/deleteAnnouncement/{announcementID}")
    public String deleteAnnouncement(@PathVariable int announcementID)
    {
        return aserv.deleteAnnouncement(announcementID);
    }
    
    

}
