package com.campusnavigator.Service;

import com.campusnavigator.Entity.Notification;
import com.campusnavigator.Entity.User;
import com.campusnavigator.Repository.NotificationRepository;
import com.campusnavigator.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new notification for a user
    public Notification createNotification(int userID, String message) {
        Optional<User> userOptional = userRepository.findById(userID);
        
        if (userOptional.isPresent()) {
            Notification notification = new Notification();
            notification.setUser(userOptional.get());
            notification.setMessage(message);
            notification.setTimestamp(LocalDateTime.now());
            notification.setIsRead(false);
            
            return notificationRepository.save(notification);
        }
        
        throw new RuntimeException("User not found with ID: " + userID);
    }

    // Get all notifications for a specific user
    public List<Notification> getUserNotifications(int userID) {
        return notificationRepository.findByUser_UserID(userID);
    }

    // Get unread notifications for a specific user
    public List<Notification> getUnreadNotifications(int userID) {
        return notificationRepository.findByUser_UserIDAndIsReadFalse(userID);
    }

    // Count unread notifications for a user
    public long countUnreadNotifications(int userID) {
        return notificationRepository.countByUser_UserIDAndIsReadFalse(userID);
    }

    // Mark a specific notification as read
    public Notification markNotificationAsRead(Long notificationID) {
        Optional<Notification> notificationOptional = notificationRepository.findById(notificationID);
        
        if (notificationOptional.isPresent()) {
            Notification notification = notificationOptional.get();
            notification.setIsRead(true);
            return notificationRepository.save(notification);
        }
        
        throw new RuntimeException("Notification not found with ID: " + notificationID);
    }

    // Mark all notifications for a user as read
    public void markAllNotificationsAsRead(int userID) {
        List<Notification> unreadNotifications = notificationRepository.findByUser_UserIDAndIsReadFalse(userID);
        
        for (Notification notification : unreadNotifications) {
            notification.setIsRead(true);
        }
        
        notificationRepository.saveAll(unreadNotifications);
    }

    // Delete a specific notification
    public void deleteNotification(Long notificationID) {
        if (notificationRepository.existsById(notificationID)) {
            notificationRepository.deleteById(notificationID);
        } else {
            throw new RuntimeException("Notification not found with ID: " + notificationID);
        }
    }
}