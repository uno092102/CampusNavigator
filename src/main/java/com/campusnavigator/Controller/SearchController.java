package com.campusnavigator.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.campusnavigator.Entity.SearchEntity;
import com.campusnavigator.Service.SearchService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping(method = RequestMethod.GET,path = "/api/search")
public class SearchController {
    
    @Autowired
    SearchService sserv;


    //TEST RUN
    @GetMapping("/print")
    public String print() 
    {
        return "TEST TEST";
    }

    //CREATE
    @PostMapping("/postSearchEntity")
    public SearchEntity postSearchEntity(@RequestBody SearchEntity search) 
    {
        return sserv.postSearchEntity(search);
    }

    //READ
    @GetMapping("/getAllSearch")
    public List<SearchEntity>getAllSearch() {
        return sserv.getAllSearch();
    }
    
    //UPDATE
    @PutMapping("/putSearchHistory")
    public SearchEntity putSearchHistory(@RequestParam int queryID, @RequestBody SearchEntity newSearchHistory) 
    {
        
        return sserv.putSearchHistory(queryID, newSearchHistory);
    }

    //DELETE
    @DeleteMapping("/deleteSearchHistory/{queryID}")
    public String deleteSearchHistory(@PathVariable int queryID)
    {
        return sserv.deleteSearchHistory(queryID);
    }
    
}
