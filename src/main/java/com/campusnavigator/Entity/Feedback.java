package com.campusnavigator.Entity;


import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int feedbackID;

    private String comment;
    private int rating;

    // No-argument constructor
    public Feedback() {
        super();
    }

    public Feedback(int feedbackID, String comment, int rating)
    {
        super();
        this.feedbackID = feedbackID;
        this.comment = comment;
        this.rating = rating;
    }

    //SETTER
    public void setFeedbackID(int feedbackID) {
        this.feedbackID = feedbackID;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    //GETTERS
    public int getFeedbackID() {
        return feedbackID;
    }

    public String getComment() {
        return comment;
    }

    public int getRating() {
        return rating;
    }

  

   
}
