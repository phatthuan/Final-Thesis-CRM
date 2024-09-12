package com.crm.notificationservice.command.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationRequestModel {
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