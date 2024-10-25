package com.campusnavigator.Entity;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SearchEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int queryID;

    private String searchText;
    private Timestamp timeStamp;

    public SearchEntity()
    {
        super();
    }

    public SearchEntity(int queryID, String searchText, Timestamp timestamp)
    {
        super();
        this.queryID = queryID;
        this.searchText = searchText;
        this.timeStamp = timestamp;
    }

    //SETTER
    public void setQueryID(int queryID) {
        this.queryID = queryID;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    public void setTimeStamp(Timestamp timeStamp) {
        this.timeStamp = timeStamp;
    }

    //GETTER
    public int getQueryID() {
        return queryID;
    }
    
    public String getSearchText() {
        return searchText;
    }

    public Timestamp getTimeStamp() {
        return timeStamp;
    }

}
