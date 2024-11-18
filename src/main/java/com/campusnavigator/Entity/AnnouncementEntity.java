package com.campusnavigator.Entity;

import java.security.Timestamp;
import java.time.DateTimeException;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AnnouncementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int announcementID;   

    private String title;
    private String content;
    private int postedBy;
    private Timestamp postTimeStamp;
    private String category;

    public AnnouncementEntity()
    {
        super();
    }

    public AnnouncementEntity(int announcementID, String title, String content, int postedBy, Timestamp postTimestamp,
    String category)
    {
        super();
        this.announcementID = announcementID;
        this.title = title;
        this.postedBy = postedBy;
        this.postTimeStamp = postTimestamp;
        this.category = category;
    }

    //SETTER
    public void setAnnouncementID(int announcementID) {
        this.announcementID = announcementID;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPostTimeStamp(Timestamp postTimeStamp) {
        this.postTimeStamp = postTimeStamp;
    }

    public void setPostedBy(int postedBy) {
        this.postedBy = postedBy;
    }

    //GETTER
    public int getAnnouncementID() {
        return announcementID;
    }

    public String getCategory() {
        return category;
    }

    public String getContent() {
        return content;
    }

    public Timestamp getPostTimeStamp() {
        return postTimeStamp;
    }

    public int getPostedBy() {
        return postedBy;
    }

    public String getTitle() {
        return title;
    }

    
}
