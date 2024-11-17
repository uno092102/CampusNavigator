package com.campusnavigator.Service;

import com.campusnavigator.Entity.Notifications;
import com.campusnavigator.Repository.NotificationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationsService {

    @Autowired
    private NotificationsRepository notificationsRepository;

    public List<Notifications> getAllNotifications() {
        return notificationsRepository.findAll();
    }

    public Optional<Notifications> getNotificationById(Long id) {
        return notificationsRepository.findById(id);
    }

    public Notifications createNotification(Notifications notification) {
        return notificationsRepository.save(notification);
    }

    public Notifications updateNotification(Long id, Notifications updatedNotification) {
        return notificationsRepository.findById(id)
                .map(existingNotification -> {
                    updatedNotification.setId(id);
                    return notificationsRepository.save(updatedNotification);
                })
                .orElse(null);
    }

    public boolean deleteNotification(Long id) {
        if (notificationsRepository.existsById(id)) {
            notificationsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
