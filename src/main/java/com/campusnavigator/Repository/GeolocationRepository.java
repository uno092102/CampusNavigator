// GeolocationRepository.java
package com.campusnavigator.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.campusnavigator.Entity.GeolocationData;

public interface GeolocationRepository extends JpaRepository<GeolocationData, Integer> {

    // Find GeolocationData by userID
    GeolocationData findByUser_UserID(int userID);
}