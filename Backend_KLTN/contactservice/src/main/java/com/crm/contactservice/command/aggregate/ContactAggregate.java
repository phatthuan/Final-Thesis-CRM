package com.crm.contactservice.command.aggregate;


import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import com.crm.commonservice.command.ConvertLeadToContactCommand;
import com.crm.contactservice.command.command.CreateContactCommand;
import com.crm.contactservice.command.command.DeleteContactCommand;
import com.crm.contactservice.command.command.UpdateContactCommand;
import com.crm.contactservice.command.event.ContactCreatedEvent;
import com.crm.contactservice.command.event.ContactDeletedEvent;
import com.crm.contactservice.command.event.ContactUpdatedEvent;
import com.crm.contactservice.command.event.LeadToContactConvertedEvent;

import lombok.NoArgsConstructor;

@Aggregate
@NoArgsConstructor
public class ContactAggregate {
    @AggregateIdentifier
    private String id;
    private String title;
    private String description;
    private BigDecimal contactValue;
    private String status;
    private String lostReason;
    private Date closedAt;
    private String userId;
    private String personId;
    private Integer contactSourceId;
    private Integer contactTypeId;
    private Integer contactPipelineStageId;
    private Date expectedCloseDate;
    private Integer score;

    @CommandHandler
    public ContactAggregate(CreateContactCommand createContactCommand) {

        ContactCreatedEvent ContactCreatedEvent = new ContactCreatedEvent();
        BeanUtils.copyProperties(createContactCommand, ContactCreatedEvent);
        AggregateLifecycle.apply(ContactCreatedEvent);
    }

    @CommandHandler
    public void handle(UpdateContactCommand updateContactCommand) {

        ContactUpdatedEvent ContactUpdatedEvent = new ContactUpdatedEvent();
        BeanUtils.copyProperties(updateContactCommand, ContactUpdatedEvent);
        AggregateLifecycle.apply(ContactUpdatedEvent);
    }

    @CommandHandler
    public void handle(DeleteContactCommand deleteContactCommand) {

        ContactDeletedEvent deletedEvent = new ContactDeletedEvent();
        BeanUtils.copyProperties(deleteContactCommand, deletedEvent);
        AggregateLifecycle.apply(deletedEvent);
    }

    @CommandHandler
    public ContactAggregate(ConvertLeadToContactCommand convertLeadToContactCommand) {

        LeadToContactConvertedEvent leadToContactConvertedEvent = new LeadToContactConvertedEvent();
        leadToContactConvertedEvent.setId(convertLeadToContactCommand.getId());
        leadToContactConvertedEvent.setTitle(convertLeadToContactCommand.getTitle());
        leadToContactConvertedEvent.setDescription(convertLeadToContactCommand.getDescription());
        leadToContactConvertedEvent.setContactValue(convertLeadToContactCommand.getLeadValue());
        leadToContactConvertedEvent.setStatus(convertLeadToContactCommand.getStatus());
        leadToContactConvertedEvent.setLostReason(convertLeadToContactCommand.getLostReason());
        leadToContactConvertedEvent.setClosedAt(convertLeadToContactCommand.getClosedAt());
        leadToContactConvertedEvent.setUserId(convertLeadToContactCommand.getUserId());
        leadToContactConvertedEvent.setPersonId(convertLeadToContactCommand.getPersonId());
        leadToContactConvertedEvent.setContactSourceId(convertLeadToContactCommand.getLeadSourceId());
        leadToContactConvertedEvent.setContactTypeId(convertLeadToContactCommand.getLeadTypeId());
        leadToContactConvertedEvent.setContactPipelineStageId(convertLeadToContactCommand.getLeadPipelineStageId());
        leadToContactConvertedEvent.setExpectedCloseDate(convertLeadToContactCommand.getExpectedCloseDate());
        leadToContactConvertedEvent.setScore(convertLeadToContactCommand.getScore());
        leadToContactConvertedEvent.setLeadId(convertLeadToContactCommand.getLeadId());
        AggregateLifecycle.apply(leadToContactConvertedEvent);
    }

    @EventSourcingHandler
    public void on(ContactCreatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.description = event.getDescription();
        this.contactValue = event.getContactValue();
        this.status = event.getStatus();
        this.lostReason = event.getLostReason();
        this.closedAt = event.getClosedAt();
        this.userId = event.getUserId();
        this.personId = event.getPersonId();
        this.contactSourceId = event.getContactSourceId();
        this.contactTypeId = event.getContactTypeId();
        this.contactPipelineStageId = event.getContactPipelineStageId();
        this.expectedCloseDate = event.getExpectedCloseDate();
        this.score = event.getScore();
    }

    @EventSourcingHandler
    public void on(ContactUpdatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.description = event.getDescription();
        this.contactValue = event.getContactValue();
        this.status = event.getStatus();
        this.lostReason = event.getLostReason();
        this.closedAt = event.getClosedAt();
        this.userId = event.getUserId();
        this.personId = event.getPersonId();
        this.contactSourceId = event.getContactSourceId();
        this.contactTypeId = event.getContactTypeId();
        this.contactPipelineStageId = event.getContactPipelineStageId();
        this.expectedCloseDate = event.getExpectedCloseDate();
        this.score = event.getScore();
    }

    @EventSourcingHandler
    public void on(ContactDeletedEvent event) {
        this.id = event.getId();
    }

    @EventSourcingHandler
    public void on(LeadToContactConvertedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.description = event.getDescription();
        this.contactValue = event.getContactValue();
        this.status = event.getStatus();
        this.lostReason = event.getLostReason();
        this.closedAt = event.getClosedAt();
        this.userId = event.getUserId();
        this.personId = event.getPersonId();
        this.contactSourceId = event.getContactSourceId();
        this.contactTypeId = event.getContactTypeId();
        this.contactPipelineStageId = event.getContactPipelineStageId();
        this.expectedCloseDate = event.getExpectedCloseDate();
        this.score = event.getScore();
    }
}
