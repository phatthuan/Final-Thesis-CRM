package com.crm.ticketservice.command.aggregate;


import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import com.crm.ticketservice.command.command.CreateTicketCommand;
import com.crm.ticketservice.command.command.DeleteTicketCommand;
import com.crm.ticketservice.command.command.SendMessageCommand;
import com.crm.ticketservice.command.command.UpdateTicketCommand;
import com.crm.ticketservice.command.event.TicketCreatedEvent;
import com.crm.ticketservice.command.event.TicketDeletedEvent;
import com.crm.ticketservice.command.event.TicketSendMessageEvent;
import com.crm.ticketservice.command.event.TicketUpdatedEvent;

import lombok.NoArgsConstructor;

@Aggregate
@NoArgsConstructor
public class TicketAggregate {
    @AggregateIdentifier
    private String id;
    private String subject;
    private String userId;
    private Integer status;
    private Integer priority;
    private String description;
    private String assignedToUserId;

    private String message;

    @CommandHandler
    public TicketAggregate(CreateTicketCommand createticketCommand) {

        TicketCreatedEvent ticketCreatedEvent = new TicketCreatedEvent();
        BeanUtils.copyProperties(createticketCommand, ticketCreatedEvent);
        AggregateLifecycle.apply(ticketCreatedEvent);
    }

    @CommandHandler
    public void handle(UpdateTicketCommand updateticketCommand) {

        TicketUpdatedEvent ticketUpdatedEvent = new TicketUpdatedEvent();
        BeanUtils.copyProperties(updateticketCommand, ticketUpdatedEvent);
        AggregateLifecycle.apply(ticketUpdatedEvent);
    }

    @CommandHandler
    public void handle(DeleteTicketCommand deleteticketCommand) {

        TicketDeletedEvent deletedEvent = new TicketDeletedEvent();
        BeanUtils.copyProperties(deleteticketCommand, deletedEvent);
        AggregateLifecycle.apply(deletedEvent);
    }

    @CommandHandler
	public void handle(SendMessageCommand command) {
		TicketSendMessageEvent event = new TicketSendMessageEvent();
		BeanUtils.copyProperties(command, event);
		AggregateLifecycle.apply(event);
	}

    @EventSourcingHandler
    public void on(TicketCreatedEvent event) {
        this.id = event.getId();
        this.subject = event.getSubject();
        this.userId = event.getUserId();
        this.status = event.getStatus();
        this.priority = event.getPriority();
        this.description = event.getDescription();
        this.assignedToUserId = event.getAssignedToUserId();
    }

    @EventSourcingHandler
    public void on(TicketUpdatedEvent event) {
        this.id = event.getId();
        this.subject = event.getSubject();
        this.userId = event.getUserId();
        this.status = event.getStatus();
        this.priority = event.getPriority();
        this.description = event.getDescription();
        this.assignedToUserId = event.getAssignedToUserId();
    }

    @EventSourcingHandler
    public void on(TicketDeletedEvent event) {
        this.id = event.getId();
    }

    @EventSourcingHandler
	public void on(TicketSendMessageEvent event) {
		this.id = event.getId();
		this.message = event.getMessage();
	}
}
