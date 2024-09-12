package com.crm.notificationservice.command.command;

import org.axonframework.modelling.command.TargetAggregateIdentifier;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateNotificationCommand {
    @TargetAggregateIdentifier
    private String id;
    private String title;
    private String description;
    private String userId;
    private String ticketId;
    private String activityId;
    private String quoteId;
    private String productId;
    private String leadId;
}
