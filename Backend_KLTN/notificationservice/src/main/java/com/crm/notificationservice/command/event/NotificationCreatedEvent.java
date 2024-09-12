package com.crm.notificationservice.command.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationCreatedEvent {
    private String id;
    private String title;
    private String description;
    private String userId;
    private String ticketId;
    private String activityId;
    private String quoteId;
    private String productId;
    private String leadId;
    private int isRead;
}