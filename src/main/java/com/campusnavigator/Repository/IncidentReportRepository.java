package com.campusnavigator.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.cdi.JpaRepositoryExtension;
import org.springframework.stereotype.Repository;

import com.campusnavigator.Entity.IncidentReport;
import java.util.List;


@Repository
public interface IncidentReportRepository extends JpaRepository<IncidentReport, Integer>{
    
    public IncidentReport findByIncidentID(int incidentID);
}
