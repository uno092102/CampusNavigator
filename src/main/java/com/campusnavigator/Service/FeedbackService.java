package com.campusnavigator.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campusnavigator.Entity.Feedback;
import com.campusnavigator.Repository.FeedbackRepository;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository frepo;

    public FeedbackService()
    {
        super();
    }

    // Create 
    public Feedback postFeedback(Feedback feedback) {
        return frepo.save(feedback);
    }

    // Read all 
    public List<Feedback> getAllFeedback() {
        return frepo.findAll();
    }

    // Update 
    @SuppressWarnings("finally")
    public Feedback putFeedback(int feedbackID, Feedback newFeedback)
    {
        Feedback feed = new Feedback();

        try {
            feed = frepo.findById(feedbackID).get();

            feed.setComment(newFeedback.getComment());
            feed.setRating(newFeedback.getRating());
        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Feedback ID: " + feedbackID + " not found");
            // TODO: handle exception
        }finally
        {
            return frepo.save(feed);
        }
    }

    // Delete 
    public String deleteFeedback(int feedbackID) {
        frepo.deleteById(feedbackID);
        return"Feedback Deleted Successfuly";
    }
}
