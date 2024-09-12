package com.crm.notificationservice.command.aggregate;

import com.crm.notificationservice.command.command.CreateNotificationCommand;
import com.crm.notificationservice.command.command.DeleteNotificationCommand;
import com.crm.notificationservice.command.command.UpdateNotificationCommand;
import com.crm.notificationservice.command.event.NotificationCreatedEvent;
import com.crm.notificationservice.command.event.NotificationDeletedEvent;
import com.crm.notificationservice.command.event.NotificationUpdatedEvent;
import lombok.NoArgsConstructor;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;



@Aggregate
@NoArgsConstructor
public class NotificationAggregate {
    @AggregateIdentifier
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


    @CommandHandler
    public NotificationAggregate(CreateNotificationCommand createNotificationCommand) {
        NotificationCreatedEvent notificationCreatedEvent = new NotificationCreatedEvent();
        BeanUtils.copyProperties(createNotificationCommand, notificationCreatedEvent);
        AggregateLifecycle.apply(notificationCreatedEvent);
    }

    @CommandHandler
    public void handle(UpdateNotificationCommand updateNotificationCommand) {

        NotificationUpdatedEvent notificationUpdatedEvent = new NotificationUpdatedEvent();
        BeanUtils.copyProperties(updateNotificationCommand, notificationUpdatedEvent);
        AggregateLifecycle.apply(notificationUpdatedEvent);
    }

    @CommandHandler
    public void handle(DeleteNotificationCommand deleteNotificationCommand) {

        NotificationDeletedEvent deletedEvent = new NotificationDeletedEvent();
        BeanUtils.copyProperties(deleteNotificationCommand, deletedEvent);
        AggregateLifecycle.apply(deletedEvent);
    }

    @EventSourcingHandler
    public void on(NotificationCreatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.description = event.getDescription();
        this.userId = event.getUserId();
        this.ticketId = event.getTicketId();
        this.quoteId = event.getQuoteId();
        this.activityId = event.getActivityId();
        this.productId = event.getProductId();
        this.leadId = event.getLeadId();
    }

    @EventSourcingHandler
    public void on(NotificationUpdatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.description = event.getDescription();
        this.userId = event.getUserId();
        this.ticketId = event.getTicketId();
        this.quoteId = event.getQuoteId();
        this.activityId = event.getActivityId();
        this.productId = event.getProductId();
        this.leadId = event.getLeadId();
    }

    @EventSourcingHandler
    public void on(NotificationDeletedEvent event) {
        this.id = event.getId();
    }

}
