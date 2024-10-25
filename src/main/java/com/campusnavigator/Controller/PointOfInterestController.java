package com.campusnavigator.Controller;

import com.campusnavigator.Entity.PointOfInterest;
import com.campusnavigator.Service.PointOfInterestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pois")
public class PointOfInterestController {
    private final PointOfInterestService poiService;

    public PointOfInterestController(PointOfInterestService poiService) {
        this.poiService = poiService;
    }

    @PostMapping
    public PointOfInterest createPointOfInterest(@RequestBody PointOfInterest poi) {
        return poiService.createPointOfInterest(poi);
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
    public ResponseEntity<PointOfInterest> updatePointOfInterest(@PathVariable Long id, @RequestBody PointOfInterest poiDetails) {
        try {
            PointOfInterest updated = poiService.updatePointOfInterest(id, poiDetails);
            return ResponseEntity.ok(updated);
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