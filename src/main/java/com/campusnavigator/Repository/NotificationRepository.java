package com.campusnavigator.Repository;

import com.campusnavigator.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Find notifications by user ID
    List<Notification> findByUser_UserID(int userID);

    // Find unread notifications by user ID
    List<Notification> findByUser_UserIDAndIsReadFalse(int userID);

    // Count unread notifications by user ID
    long countByUser_UserIDAndIsReadFalse(int userID);
}