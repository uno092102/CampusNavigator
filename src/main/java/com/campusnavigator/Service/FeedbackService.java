package com.campusnavigator.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campusnavigator.Entity.Feedback;
import com.campusnavigator.Repository.FeedbackRepository;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Create 
    public Feedback postFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    // Read all 
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    // Update 
    public Feedback putFeedback(int feedbackID, Feedback newFeedback) {
        return feedbackRepository.findById(feedbackID).map(feedback -> {
            feedback.setComment(newFeedback.getComment());
            feedback.setRating(newFeedback.getRating());
            return feedbackRepository.save(feedback);
        }).orElseThrow(() -> new RuntimeException("Feedback not found"));
    }

    // Delete 
    public String deleteFeedback(int feedbackID) {
        feedbackRepository.deleteById(feedbackID);
        return"Feedback Deleted Successfuly";
    }
}
