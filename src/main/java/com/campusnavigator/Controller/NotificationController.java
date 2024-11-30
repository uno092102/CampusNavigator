package com.campusnavigator.Controller;

import com.campusnavigator.Entity.Notification;
import com.campusnavigator.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // Create a new notification for a user
    @PostMapping("/create/{userID}")
    public ResponseEntity<Notification> createNotification(
            @PathVariable int userID, 
            @RequestBody String message) {
        try {
            Notification createdNotification = notificationService.createNotification(userID, message);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdNotification);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Get all notifications for a user
    @GetMapping("/user/{userID}")
    public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable int userID) {
        List<Notification> notifications = notificationService.getUserNotifications(userID);
        return ResponseEntity.ok(notifications);
    }

    // Get unread notifications for a user
    @GetMapping("/user/{userID}/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@PathVariable int userID) {
        List<Notification> unreadNotifications = notificationService.getUnreadNotifications(userID);
        return ResponseEntity.ok(unreadNotifications);
    }

    // Count unread notifications for a user
    @GetMapping("/user/{userID}/unread/count")
    public ResponseEntity<Long> countUnreadNotifications(@PathVariable int userID) {
        long unreadCount = notificationService.countUnreadNotifications(userID);
        return ResponseEntity.ok(unreadCount);
    }

    // Mark a specific notification as read
    @PutMapping("/read/{notificationID}")
    public ResponseEntity<Notification> markNotificationAsRead(@PathVariable Long notificationID) {
        try {
            Notification updatedNotification = notificationService.markNotificationAsRead(notificationID);
            return ResponseEntity.ok(updatedNotification);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Mark all notifications for a user as read
    @PutMapping("/read/all/{userID}")
    public ResponseEntity<Void> markAllNotificationsAsRead(@PathVariable int userID) {
        try {
            notificationService.markAllNotificationsAsRead(userID);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a specific notification
    @DeleteMapping("/{notificationID}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long notificationID) {
        try {
            notificationService.deleteNotification(notificationID);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}