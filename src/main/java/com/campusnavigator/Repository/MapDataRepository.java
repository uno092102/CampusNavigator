package com.campusnavigator.Repository;

import com.campusnavigator.Entity.MapData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapDataRepository extends JpaRepository<MapData, Long> {
}