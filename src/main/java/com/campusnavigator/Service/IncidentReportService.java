package com.campusnavigator.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campusnavigator.Entity.IncidentReport;
import com.campusnavigator.Repository.IncidentReportRepository;

@Service
public class IncidentReportService {
    @Autowired
    IncidentReportRepository srepo;


    public IncidentReportService(){
        super();
    }

    public IncidentReport postIncidentReport(IncidentReport incidentReport){
        return srepo.save(incidentReport);
    }

    public List<IncidentReport>getAllIncidentReport(){
        return srepo.findAll();
    }

    @SuppressWarnings("finally")
    public IncidentReport putIncidentReport(int incidentID, IncidentReport newIncidentReport) throws NameNotFoundException {
        IncidentReport incidentReport = srepo.findByIncidentID(incidentID)
                .orElseThrow(() -> new NameNotFoundException("Incident not found with ID: " + incidentID));

        // Update all fields
        incidentReport.setCategory(newIncidentReport.getCategory());
        incidentReport.setDescription(newIncidentReport.getDescription());
        incidentReport.setLocationType(newIncidentReport.getLocationType());
        incidentReport.setStatus(newIncidentReport.getStatus());
        incidentReport.setTimestamp(newIncidentReport.getTimestamp());

        return srepo.save(incidentReport);
    }
    

    public String deleteIncidentReport(int incidentID) {
        
        String msg = "";

        if(srepo.findById(incidentID)!= null)
        {
            srepo.deleteById(incidentID);
            msg = "Incident Report Successfully deleted!";
        }

        else
        {
            msg = incidentID + " NOT FOUND! ";
        }

        return msg;
    }
}
