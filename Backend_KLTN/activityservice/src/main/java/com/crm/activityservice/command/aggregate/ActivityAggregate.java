package com.crm.activityservice.command.aggregate;

import java.util.Date;

import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import com.crm.activityservice.command.command.CreateActivityCommand;
import com.crm.activityservice.command.command.DeleteActivityCommand;
import com.crm.activityservice.command.command.SendEmailCommand;
import com.crm.activityservice.command.command.UpdateActivityCommand;
import com.crm.activityservice.command.event.ActivityCreatedEvent;
import com.crm.activityservice.command.event.ActivityDeletedEvent;
import com.crm.activityservice.command.event.ActivityUpdatedEvent;
import com.crm.activityservice.command.event.EmailSentEvent;

import lombok.NoArgsConstructor;

@Aggregate
@NoArgsConstructor
public class ActivityAggregate {
    @AggregateIdentifier
    private String id;
    private String title;
    private String type;
    private String comment;
    private Date scheduleFrom;
    private Date scheduleTo;
    private Boolean isDone;
    private String userId;
    private String location;
    private String sendToEmail;

    @CommandHandler
    public ActivityAggregate(CreateActivityCommand createactivityCommand) {
        ActivityCreatedEvent activityCreatedEvent = new ActivityCreatedEvent();
        BeanUtils.copyProperties(createactivityCommand, activityCreatedEvent);
        AggregateLifecycle.apply(activityCreatedEvent);
    }

    @CommandHandler
    public void handle(UpdateActivityCommand updateactivityCommand) {
        ActivityUpdatedEvent activityUpdatedEvent = new ActivityUpdatedEvent();
        BeanUtils.copyProperties(updateactivityCommand, activityUpdatedEvent);
        AggregateLifecycle.apply(activityUpdatedEvent);
    }

    @CommandHandler
    public void handle(DeleteActivityCommand deleteactivityCommand) {
        ActivityDeletedEvent deletedEvent = new ActivityDeletedEvent();
        BeanUtils.copyProperties(deleteactivityCommand, deletedEvent);
        AggregateLifecycle.apply(deletedEvent);
    }

    @CommandHandler
    public ActivityAggregate(SendEmailCommand sendEmailCommand) {
        EmailSentEvent emailSentEvent = new EmailSentEvent();
        BeanUtils.copyProperties(sendEmailCommand, emailSentEvent);
        AggregateLifecycle.apply(emailSentEvent);
    }

    @EventSourcingHandler
    public void on(ActivityCreatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.type = event.getType();
        this.comment = event.getComment();
        this.scheduleFrom = event.getScheduleFrom();
        this.scheduleTo = event.getScheduleTo();
        this.isDone = event.getIsDone();
        this.userId = event.getUserId();
        this.location = event.getLocation();
        this.sendToEmail = event.getSendToEmail();

    }

    @EventSourcingHandler
    public void on(ActivityUpdatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.type = event.getType();
        this.comment = event.getComment();
        this.scheduleFrom = event.getScheduleFrom();
        this.scheduleTo = event.getScheduleTo();
        this.isDone = event.getIsDone();
        this.userId = event.getUserId();
        this.location = event.getLocation();
        this.sendToEmail = event.getSendToEmail();
    }

    @EventSourcingHandler
    public void on(ActivityDeletedEvent event) {
        this.id = event.getId();
    }

    @EventSourcingHandler
    public void on(EmailSentEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.comment = event.getComment();
        this.sendToEmail = event.getSendToEmail();
    }
}
