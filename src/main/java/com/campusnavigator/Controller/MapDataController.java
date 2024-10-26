package com.campusnavigator.Controller;

import com.campusnavigator.Entity.Building;
import com.campusnavigator.Entity.MapData;
import com.campusnavigator.Service.BuildingService;
import com.campusnavigator.Service.MapDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/maps")
public class MapDataController {
    private final MapDataService mapDataService;
    private final BuildingService buildingService;

    public MapDataController(MapDataService mapDataService, BuildingService buildingService) {
        this.mapDataService = mapDataService;
        this.buildingService = buildingService;
    }

    @PostMapping
    public ResponseEntity<MapData> createMapData(@RequestBody Map<String, Object> request) {
        Long buildingId = Long.valueOf(request.get("buildingId").toString());
        Building building = buildingService.getBuildingById(buildingId)
                .orElseThrow(() -> new RuntimeException("Building not found with id " + buildingId));

        
        Optional<MapData> existingMapData = mapDataService.getMapDataByBuildingId(buildingId);
        if (existingMapData.isPresent()) {
            
            return ResponseEntity.status(409).body(null);
        }

        MapData mapData = new MapData();
        mapData.setMapImageURL(request.get("mapImageURL").toString());
        mapData.setBuilding(building);  

        MapData createdMapData = mapDataService.createMapData(mapData);
        return ResponseEntity.ok(createdMapData);
    }

    @GetMapping
    public List<MapData> getAllMapData() {
        return mapDataService.getAllMapData();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MapData> getMapDataById(@PathVariable Long id) {
        return mapDataService.getMapDataById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MapData> updateMapData(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        Long buildingId = Long.valueOf(request.get("buildingId").toString());
        Building building = buildingService.getBuildingById(buildingId)
                .orElseThrow(() -> new RuntimeException("Building not found with id " + buildingId));

        MapData mapDataDetails = new MapData();
        mapDataDetails.setMapImageURL(request.get("mapImageURL").toString());
        mapDataDetails.setBuilding(building);  

        MapData updatedMapData = mapDataService.updateMapData(id, mapDataDetails);
        return ResponseEntity.ok(updatedMapData);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMapData(@PathVariable Long id) {
        try {
            mapDataService.deleteMapData(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}