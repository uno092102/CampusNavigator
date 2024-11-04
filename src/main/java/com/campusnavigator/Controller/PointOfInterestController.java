package com.campusnavigator.Controller;

import com.campusnavigator.Entity.Building;
import com.campusnavigator.Entity.PointOfInterest;
import com.campusnavigator.Service.BuildingService;
import com.campusnavigator.Service.PointOfInterestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pois")
@CrossOrigin
public class PointOfInterestController {
    private final PointOfInterestService poiService;
    private final BuildingService buildingService;

    public PointOfInterestController(PointOfInterestService poiService, BuildingService buildingService) {
        this.poiService = poiService;
        this.buildingService = buildingService;
    }

    @PostMapping
    public ResponseEntity<PointOfInterest> createPointOfInterest(@RequestBody Map<String, Object> request) {
        Long buildingId = Long.valueOf(request.get("buildingId").toString());
        Building building = buildingService.getBuildingById(buildingId)
                .orElseThrow(() -> new RuntimeException("Building not found with id " + buildingId));

        PointOfInterest poi = new PointOfInterest();
        poi.setName(request.get("name").toString());
        poi.setDescription(request.get("description").toString());
        poi.setType(request.get("type").toString());
        poi.setBuilding(building);

        PointOfInterest createdPOI = poiService.createPointOfInterest(poi);
        return ResponseEntity.ok(createdPOI);
    }

    @GetMapping
    public List<PointOfInterest> getAllPointsOfInterest() {
        return poiService.getAllPointsOfInterest();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PointOfInterest> getPointOfInterestById(@PathVariable Long id) {
        return poiService.getPointOfInterestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PointOfInterest> updatePointOfInterest(@PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        try {
            Long buildingId = Long.valueOf(request.get("buildingId").toString());
            Building building = buildingService.getBuildingById(buildingId)
                    .orElseThrow(() -> new RuntimeException("Building not found with id " + buildingId));

            PointOfInterest poiDetails = new PointOfInterest();
            poiDetails.setName(request.get("name").toString());
            poiDetails.setDescription(request.get("description").toString());
            poiDetails.setType(request.get("type").toString());
            poiDetails.setBuilding(building);

            PointOfInterest updatedPOI = poiService.updatePointOfInterest(id, poiDetails);
            return ResponseEntity.ok(updatedPOI);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePointOfInterest(@PathVariable Long id) {
        try {
            poiService.deletePointOfInterest(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}