package com.campusnavigator.Controller;

import com.campusnavigator.Entity.MapData;
import com.campusnavigator.Service.MapDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maps")
public class MapDataController {
    private final MapDataService mapDataService;

    public MapDataController(MapDataService mapDataService) {
        this.mapDataService = mapDataService;
    }

    @PostMapping
    public MapData createMapData(@RequestBody MapData mapData) {
        return mapDataService.createMapData(mapData);
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
    public ResponseEntity<MapData> updateMapData(@PathVariable Long id, @RequestBody MapData mapDataDetails) {
        try {
            MapData updated = mapDataService.updateMapData(id, mapDataDetails);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
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