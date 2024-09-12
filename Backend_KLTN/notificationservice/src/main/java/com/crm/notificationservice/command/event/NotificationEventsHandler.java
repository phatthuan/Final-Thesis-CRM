package com.crm.notificationservice.command.event;

import com.crm.notificationservice.command.data.Notification;
import com.crm.notificationservice.command.data.NotificationRepository;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NotificationEventsHandler {
    @Autowired
    private NotificationRepository notificationRepository;

    @EventHandler
    public void on(NotificationCreatedEvent event) {
        Notification notification = new Notification();
        BeanUtils.copyProperties(event, notification);
        notificationRepository.save(notification);
    }

    @EventHandler
    public void on(NotificationUpdatedEvent event) {
        Notification notification = notificationRepository.getById(event.getId());
        notification.setTitle(event.getTitle());
        notification.setDescription(event.getDescription());
        notification.setUserId(event.getUserId());
        notification.setTicketId(event.getTicketId());
        notification.setProductId(event.getProductId());
        notification.setQuoteId(event.getQuoteId());
        notification.setActivityId(event.getActivityId());
        notification.setLeadId(event.getLeadId());
        notificationRepository.save(notification);
    }

    @EventHandler
    public void on(NotificationDeletedEvent event) {
        notificationRepository.deleteById(event.getId());
    }

    @EventHandler
    public void on(NotificationUpdatedStatusEvent event) {
        notificationRepository.markAsRead(event.getId());
    }
}