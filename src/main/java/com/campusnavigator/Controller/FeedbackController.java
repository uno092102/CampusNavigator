package com.campusnavigator.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.campusnavigator.Entity.Feedback;
import com.campusnavigator.Service.FeedbackService;

@RestController
@RequestMapping(path = "/api/feedback")
@CrossOrigin
public class FeedbackController {

    @Autowired
    FeedbackService feedbackService;

    @GetMapping("/print")
    public String print() {
        return "Feedback TEST";
    }

    @PostMapping("/postFeedback")
    public Feedback postFeedback(@RequestBody Feedback feedback) {
        return feedbackService.postFeedback(feedback);
    }

    @GetMapping("/getAllFeedback")
    public List<Feedback> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }

    @PutMapping("/putFeedback")
    public Feedback putFeedback(@RequestParam int feedbackID, @RequestBody Feedback newFeedback) {
        return feedbackService.putFeedback(feedbackID, newFeedback);
    }

    @DeleteMapping("/deleteFeedback/{feedbackID}")
    public String deleteFeedback(@PathVariable int feedbackID) {
        return feedbackService.deleteFeedback(feedbackID);
    } 
}
