package com.campusnavigator.Service;

import com.campusnavigator.Entity.Building;
import com.campusnavigator.Entity.MapData;
import com.campusnavigator.Entity.PointOfInterest;
import com.campusnavigator.Repository.BuildingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BuildingService {
    private final BuildingRepository buildingRepository;

    public BuildingService(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    public Building createBuilding(Building building) {

        if (building.getMapData() != null) {
            building.getMapData().setBuilding(building);
        }

        if (building.getPointsOfInterest() != null) {
            for (PointOfInterest poi : building.getPointsOfInterest()) {
                poi.setBuilding(building);
            }
        }
        return buildingRepository.save(building);
    }

    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }

    public Optional<Building> getBuildingById(Long id) {
        return buildingRepository.findById(id);
    }

    public Building updateBuilding(Long id, Building buildingDetails) {
        Building building = buildingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Building not found with id " + id));

        building.setName(buildingDetails.getName());
        building.setDescription(buildingDetails.getDescription());
        building.setLocationLatitude(buildingDetails.getLocationLatitude());
        building.setLocationLongitude(buildingDetails.getLocationLongitude());

        if (buildingDetails.getMapData() != null) {
            MapData mapData = building.getMapData();
            if (mapData != null) {
                mapData.setMapImageURL(buildingDetails.getMapData().getMapImageURL());
            } else {
                buildingDetails.getMapData().setBuilding(building);
                building.setMapData(buildingDetails.getMapData());
            }
        }

        if (buildingDetails.getPointsOfInterest() != null) {
            building.getPointsOfInterest().clear();
            for (PointOfInterest poi : buildingDetails.getPointsOfInterest()) {
                poi.setBuilding(building);
                building.getPointsOfInterest().add(poi);
            }
        }

        return buildingRepository.save(building);
    }

    public void deleteBuilding(Long id) {
        buildingRepository.deleteById(id);
    }
}