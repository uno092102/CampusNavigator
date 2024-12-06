package com.campusnavigator.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campusnavigator.Entity.CampusService;

import java.util.Optional;

@Repository
public interface CampusServiceRepository extends JpaRepository<CampusService, Integer> {

    // Use Optional for better null safety
    Optional<CampusService> findByServiceID(int serviceID);
}
