package com.campusnavigator.Service;

import java.util.List;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.campusnavigator.Entity.AnnouncementEntity;
import com.campusnavigator.Repository.AnnouncementRepository;

@Service
public class AnnouncementService {
    @Autowired
    AnnouncementRepository arepo;

    public AnnouncementService()
    {
        super();
    }

    //CREATE
    public AnnouncementEntity postAnnouncement(AnnouncementEntity announce)
    {
        return arepo.save(announce);
    }

    //READ
    public List<AnnouncementEntity>getAllAnnouncement()
    {
        return arepo.findAll();
    }

    //UPDATE
    @SuppressWarnings("finally")
    public AnnouncementEntity putAnnouncement(int announcementID, AnnouncementEntity newAnnouncementEntity)
    {
        AnnouncementEntity announcement = new AnnouncementEntity();

        try {
            announcement = arepo.findById(announcementID).get();

            announcement.setTitle(newAnnouncementEntity.getTitle());
            announcement.setContent(newAnnouncementEntity.getContent());
        } catch (Exception e) {
            throw new NameNotFoundException("Announcement ID: " + announcementID + " not found!");
        }finally{
            return arepo.save(announcement);
        }
    }

    //DELETE
    @SuppressWarnings("unused")
    public String deleteAnnouncement(int announcementID)
    {
        String msg = "";

        if(arepo.findById(announcementID) != null)
        {
            arepo.deleteById(announcementID);
            msg = "Announcement Successfully Deleted!";
        }
        else
        {
            msg = announcementID + " not found!";
        }
          
        return msg;


    }
}
