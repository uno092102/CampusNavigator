package com.campusnavigator.Service;


import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campusnavigator.Entity.SearchEntity;
import com.campusnavigator.Repository.SearchRepository;

@Service
public class SearchService {
    @Autowired
    SearchRepository srepo;

    public SearchService()
    {
        super();
    }

    //CREATE
    public SearchEntity postSearchEntity(SearchEntity search)
    {
        return srepo.save(search);
    }

    //READ
    public List<SearchEntity>getAllSearch()
    {
        return srepo.findAll();
    }

    //UPDATE
    @SuppressWarnings("finally")
    public SearchEntity putSearchHistory(int queryID, SearchEntity newSearchHistory)
    {
        SearchEntity search = new SearchEntity();

        try {
            search = srepo.findById(queryID).get();

            search.setSearchText(newSearchHistory.getSearchText());

        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException ("Search Query ID: " + queryID + " not found");
        }finally
        {
            return srepo.save(search);
        }
    }
    
    //DELETE
    public String deleteSearchHistory(int queryID)
    {
        String msg = "";

        if(srepo.findById(queryID)!= null)
        {
            srepo.deleteById(queryID);
            msg = "Search History Successfully deleted!";
        }
        else
        {
            msg = queryID + " NOT found!";
        }

        return msg;
    }

}
