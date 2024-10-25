package com.campusnavigator.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campusnavigator.Entity.SearchEntity;

@Repository
public interface SearchRepository extends JpaRepository<SearchEntity, Integer>{

    public SearchEntity findByQueryID(int queryID);
}