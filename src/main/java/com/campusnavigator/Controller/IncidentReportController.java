package com.campusnavigator.Controller;

import java.util.List;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.campusnavigator.Entity.IncidentReport;
import com.campusnavigator.Service.IncidentReportService;

@RestController
@RequestMapping("/api/incidentreport")
@CrossOrigin(origins = "http://localhost:3000")
public class IncidentReportController {
    
    @Autowired
    IncidentReportService sserv;

    @GetMapping("/print")
    public String print() 
    {
        return "TEST TEST";
    }

    @PostMapping("/postIncidentReport")
    public IncidentReport postIncidentReport(@RequestBody IncidentReport incidentReport){
        return sserv.postIncidentReport(incidentReport);

    }

    @GetMapping("/getAllIncidentReport")
    public List<IncidentReport>getAllIncidentReport(){
        return sserv.getAllIncidentReport();
    }

    @PutMapping("/putIncidentReport/{incidentID}")
    public ResponseEntity<?> putIncidentReport(
            @PathVariable int incidentID,
            @RequestBody IncidentReport newIncidentReport) {
        try {
            // Ensure the service handles the update logic and existence validation
            IncidentReport updatedReport = sserv.putIncidentReport(incidentID, newIncidentReport);
            return ResponseEntity.ok(updatedReport); // Return the updated report on success
        } catch (NameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Incident Report not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }



    @DeleteMapping("/deleteIncidentReport/{incidentID}")
    public String deleteIncidentReport(@PathVariable int incidentID)
    {
        return sserv.deleteIncidentReport(incidentID);
    }
}
