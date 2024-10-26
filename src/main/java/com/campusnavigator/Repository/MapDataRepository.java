package com.campusnavigator.Repository;

import com.campusnavigator.Entity.MapData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MapDataRepository extends JpaRepository<MapData, Long> {
    Optional<MapData> findByBuilding_BuildingID(Long buildingId);
}