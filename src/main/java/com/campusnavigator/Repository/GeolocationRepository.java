package com.campusnavigator.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campusnavigator.Entity.GeolocationData;

@Repository
public interface GeolocationRepository extends JpaRepository<GeolocationData, Integer>{
    
    public GeolocationData findByGeolocation(int geolocation);
}
