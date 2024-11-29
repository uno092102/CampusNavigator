package com.campusnavigator.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.campusnavigator.Entity.Feedback;
import com.campusnavigator.Service.FeedbackService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/feedback")
@CrossOrigin
public class FeedbackController {
    @Autowired
    FeedbackService fserv;

    //TEST TEST
    @GetMapping("/print")
    public String print() {
        return "TEST TEST";
    }

    //CREATE
    @PostMapping("/postFeedback")
    public Feedback postFeedback(@RequestBody Feedback feedback) 
    {
        return fserv.postFeedback(feedback);
    }

    //READ
    @GetMapping("/getAllFeedback")
    public List<Feedback> getAllFeedback() 
    {
        return fserv.getAllFeedback();
    }

    //UPDATE
    @PutMapping("/putFeedback")
    public Feedback putFeedback(@PathVariable int feedbackID, @RequestBody Feedback newFeedback) 
    {
        return fserv.putFeedback(feedbackID, newFeedback);
    }

    //DELETE
    @DeleteMapping("/deleteFeedback/{feedbackID}")
    public String deleteFeedback(@PathVariable int feedbackID)
    {
        return fserv.deleteFeedback(feedbackID);
    }
    
    
    
    
}
