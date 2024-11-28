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
    FeedbackRepository frepo;

    public FeedbackService()
    {
        super();
    }

    //CREATE
    public Feedback postFeedback(Feedback feedback)
    {
        return frepo.save(feedback);
    }

    //READ
    public List<Feedback>getAllFeedback()
    {
        return frepo.findAll();
    }

    //UPDATE
    @SuppressWarnings("finally")
    public Feedback putFeedback(int feedbackID, Feedback newFeedback)
    {
        Feedback feed = new Feedback();

        try {
            feed = frepo.findById(feedbackID).get();

            feed.setMessage(newFeedback.getMessage());
            
        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Feedback ID: " + feedbackID + " not found!");
        }finally
        {
            return frepo.save(feed);
        }
    }

    //DELETE
    @SuppressWarnings("unused")
    public String deleteFeedback(int feedbackID)
    {
        String msg = "";
        if(frepo.findById(feedbackID) != null)
        {
            frepo.deleteById(feedbackID);
            msg = "Feedback Successfully delete!";
        }
        else
        {
            msg = feedbackID + " not found!";
        }

        return msg;
    }
}
