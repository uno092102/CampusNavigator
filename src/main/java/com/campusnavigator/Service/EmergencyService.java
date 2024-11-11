package com.campusnavigator.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameAlreadyBoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campusnavigator.Entity.EmergencyContacts;
import com.campusnavigator.Repository.EmergencyRepository;

@Service
public class EmergencyService {

    @Autowired
    EmergencyRepository erepo;

    public EmergencyService()
    {
        super();
    }

    //CREATE
    public EmergencyContacts postContacts(EmergencyContacts emergency)
    {
        return erepo.save(emergency);
    }

    //READ
    public List<EmergencyContacts> getAllContacts()
    {
        return erepo.findAll();
    }

    //UPDATE
    @SuppressWarnings("finally")
    public EmergencyContacts putContacts(int contactID, EmergencyContacts newEmergencyContacts)
    {
        EmergencyContacts contacts = new EmergencyContacts();

        try {
            contacts = erepo.findById(contactID).get();

            contacts.setName(newEmergencyContacts.getName());
            contacts.setPhoneNumber(newEmergencyContacts.getPhoneNumber());
            contacts.setEmail(newEmergencyContacts.getEmail());

        } catch (NoSuchElementException nex) {
            throw new NameAlreadyBoundException("Contact ID: " + contactID + " not found");
            // TODO: handle exception
        }finally
        {
            return erepo.save(contacts);
        }
    }

    //DELETE
    public String deleteContacts(int contactID)
    {
        String msg = "";

        if(erepo.findById(contactID) != null)
        {
            erepo.deleteById(contactID);
            msg = "Contact Successfully Deleted!";
        }
        else
        {
            msg = contactID + "NOT found.";
        }

        return msg;
    }
    
}
