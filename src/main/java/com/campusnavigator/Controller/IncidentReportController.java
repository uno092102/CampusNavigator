package com.campusnavigator.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping(method = RequestMethod.GET,path = "/api/incidentreport")
@CrossOrigin
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

    @PutMapping("/putIncidentReport")
    public IncidentReport putIncidentReport(@RequestParam int incidentID, @RequestBody IncidentReport newIncidentReport) {
        return sserv.putIncidentReport(incidentID, newIncidentReport);
    }

    @DeleteMapping("/deleteIncidentReport/{incidentID}")
    public String deleteIncidentReport(@PathVariable int incidentID)
    {
        return sserv.deleteIncidentReport(incidentID);
    }
}
