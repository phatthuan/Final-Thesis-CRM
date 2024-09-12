package com.crm.notificationservice.command.command;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateNotificationCommand {
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
    private int isRead;
}
