package com.campusnavigator.Service;

import java.util.List;
import javax.naming.NameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;
import com.campusnavigator.Entity.GeolocationData;
import com.campusnavigator.Repository.GeolocationRepository;

@Service
public class GeolocationService {
    @Autowired
    GeolocationRepository grepo;

    public GeolocationService()
    {
        super();
    }

    //CREATE
    public GeolocationData postGeolocationData(GeolocationData geolocation)
    {
        return grepo.save(geolocation);
    }

    //READ 
    public List<GeolocationData>getAllGeolocation()
    {
        return grepo.findAll();
    }

    //UPDATE
    @SuppressWarnings("finally")
    public GeolocationData putGeolocation(int geolocation, GeolocationData newGeolocation)
    {
        GeolocationData geolocationData = new GeolocationData();

        try {
            geolocationData = grepo.findById(geolocation).get();

            geolocationData.setLatitude(newGeolocation.getLatitude());
            geolocationData.setLongitude(newGeolocation.getLongitude());
        } catch (NoSuchElementException nex) {

            throw new NameNotFoundException ("Geolocation Data : " + geolocation + " not found");
            
        }finally
        {
            return grepo.save(geolocationData);
        }
    }

    //DELETE
    public String deleteGeolocation(int geolocation)
    {
        String msg = "";

        if(grepo.findById(geolocation)!= null)
        {
            grepo.deleteById(geolocation);
            msg = "Geolocation Data Successfully deleted!";
        }
        else
        {
            msg = geolocation + " NOT FOUND";
        }

        return msg;
    }
}
