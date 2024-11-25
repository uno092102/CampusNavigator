package com.campusnavigator.Service;

import java.util.List;
import java.util.NoSuchElementException;

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
    public IncidentReport putIncidentReport(int incidentID, IncidentReport newIncidentReport)
    {
        IncidentReport incidentReport = new IncidentReport();

        try {
            incidentReport = srepo.findByIncidentID(incidentID).get();

            incidentReport.setCategory(newIncidentReport.getCategory());

            incidentReport.setDescription(newIncidentReport.getDescription());


        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException(" " + incidentID + "");
        } finally {
            return srepo.save(incidentReport);
        }
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
