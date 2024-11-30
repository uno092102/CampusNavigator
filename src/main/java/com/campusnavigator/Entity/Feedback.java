package com.campusnavigator.Entity;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int feedbackID;

    private int userID;
    private String message;
    private Timestamp timeStamp;

    public Feedback()
    {
        super();
    }

    public Feedback(int feedbackID, int userID, String message, Timestamp timestamp)
    {
        super();
        this.feedbackID = feedbackID;
        this.userID = userID;
        this.message = message;
        this.timeStamp = timestamp;
    }

    //SETTER
    public void setFeedbackID(int feedbackID) {
        this.feedbackID = feedbackID;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setTimeStamp(Timestamp timeStamp) {
        this.timeStamp = timeStamp;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    //GETTER
    public int getFeedbackID() {
        return feedbackID;
    }

    public String getMessage() {
        return message;
    }

    public Timestamp getTimeStamp() {
        return timeStamp;
    }

    public int getUserID() {
        return userID;
    }

    
}
