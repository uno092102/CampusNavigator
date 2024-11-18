package com.campusnavigator.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campusnavigator.Entity.AnnouncementEntity;

public interface AnnouncementRepository extends JpaRepository<AnnouncementEntity, Integer>{
    
    public AnnouncementEntity findByAnnouncementID(int announcementID);
    
}
