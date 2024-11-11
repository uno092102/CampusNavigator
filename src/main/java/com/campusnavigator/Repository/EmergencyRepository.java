package com.campusnavigator.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campusnavigator.Entity.EmergencyContacts;

@Repository
public interface EmergencyRepository extends JpaRepository<EmergencyContacts, Integer>
{
    public EmergencyContacts findByContactID(int contactID);    
}
