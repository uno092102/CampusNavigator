package com.campusnavigator.Controller;

import com.campusnavigator.Entity.Notifications;
import com.campusnavigator.Service.NotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationsController {

    private final NotificationsService notificationsService;

    @Autowired
    public NotificationsController(NotificationsService notificationsService) {
        this.notificationsService = notificationsService;
    }

    // Get all notifications
    @GetMapping
    public ResponseEntity<List<Notifications>> getAllNotifications() {
        List<Notifications> notifications = notificationsService.getAllNotifications();
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

    // Get a specific notification by ID
    @GetMapping("/{id}")
    public ResponseEntity<Notifications> getNotificationById(@PathVariable Long id) {
        Optional<Notifications> notification = notificationsService.getNotificationById(id);
        return notification.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Create a new notification
    @PostMapping
    public ResponseEntity<Notifications> createNotification(@RequestBody Notifications notification) {
        Notifications createdNotification = notificationsService.createNotification(notification);
        return new ResponseEntity<>(createdNotification, HttpStatus.CREATED);
    }

    // Update an existing notification
    @PutMapping("/{id}")
    public ResponseEntity<Notifications> updateNotification(@PathVariable Long id, @RequestBody Notifications updatedNotification) {
        Notifications notification = notificationsService.updateNotification(id, updatedNotification);
        return notification != null ? new ResponseEntity<>(notification, HttpStatus.OK)
                                    : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Delete a notification
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        boolean deleted = notificationsService.deleteNotification(id);
        return deleted ? ResponseEntity.status(HttpStatus.NO_CONTENT).build()
                       : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
