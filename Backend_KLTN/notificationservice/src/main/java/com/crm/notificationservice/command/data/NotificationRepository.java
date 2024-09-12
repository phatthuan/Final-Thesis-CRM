package com.crm.notificationservice.command.data;

import com.crm.notificationservice.command.data.Notification;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface NotificationRepository extends JpaRepository<Notification, String> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE notificationservicedb n SET n.isRead = true WHERE n.id = :id", nativeQuery = true)
    void markAsRead(String id);

}
