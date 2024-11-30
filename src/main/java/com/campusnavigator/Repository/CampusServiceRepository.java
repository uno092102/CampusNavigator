package com.campusnavigator.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campusnavigator.Entity.CampusService;

@Repository
public interface CampusServiceRepository extends JpaRepository<CampusService, Integer> {

    public CampusService findByServiceID(int serviceID);
}
