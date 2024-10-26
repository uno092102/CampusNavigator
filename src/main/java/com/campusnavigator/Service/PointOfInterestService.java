package com.campusnavigator.Service;

import com.campusnavigator.Entity.PointOfInterest;
import com.campusnavigator.Repository.PointOfInterestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PointOfInterestService {
    private final PointOfInterestRepository poiRepository;

    public PointOfInterestService(PointOfInterestRepository poiRepository) {
        this.poiRepository = poiRepository;
    }

    public PointOfInterest createPointOfInterest(PointOfInterest poi) {

        if (poi.getBuilding() == null) {
            throw new RuntimeException("Point of Interest must be associated with a Building.");
        }
        return poiRepository.save(poi);
    }

    public List<PointOfInterest> getAllPointsOfInterest() {
        return poiRepository.findAll();
    }

    public Optional<PointOfInterest> getPointOfInterestById(Long id) {
        return poiRepository.findById(id);
    }

    public PointOfInterest updatePointOfInterest(Long id, PointOfInterest poiDetails) {
        PointOfInterest poi = poiRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Point of Interest not found with id " + id));

        poi.setName(poiDetails.getName());
        poi.setDescription(poiDetails.getDescription());
        poi.setType(poiDetails.getType());
        poi.setBuilding(poiDetails.getBuilding());

        return poiRepository.save(poi);
    }

    public void deletePointOfInterest(Long id) {
        poiRepository.deleteById(id);
    }
}
