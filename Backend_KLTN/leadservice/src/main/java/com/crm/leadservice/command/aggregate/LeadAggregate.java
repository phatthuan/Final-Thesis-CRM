package com.crm.leadservice.command.aggregate;


import java.math.BigDecimal;
import java.util.Date;

import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import com.crm.commonservice.command.DeleteLeadCommonCommand;
import com.crm.leadservice.command.command.CreateLeadCommand;
import com.crm.leadservice.command.command.DeleteLeadCommand;
import com.crm.leadservice.command.command.UpdateLeadCommand;
import com.crm.leadservice.command.event.LeadCommonDeletedEvent;
import com.crm.leadservice.command.event.LeadCreatedEvent;
import com.crm.leadservice.command.event.LeadDeletedEvent;
import com.crm.leadservice.command.event.LeadUpdatedEvent;

import lombok.NoArgsConstructor;

@Aggregate
@NoArgsConstructor
public class LeadAggregate {
    @AggregateIdentifier
    private String id;
    private String title;
    private String description;
    private BigDecimal leadValue;
    private String status;
    private String lostReason;
    private Date closedAt;
    private String userId;
    private String personId;
    private Integer leadSourceId;
    private Integer leadTypeId;
    private Integer leadPipelineStageId;
    private Date expectedCloseDate;
    private Integer score;


    @CommandHandler
    public LeadAggregate(CreateLeadCommand createleadCommand) {
        LeadCreatedEvent leadCreatedEvent = new LeadCreatedEvent();
        BeanUtils.copyProperties(createleadCommand, leadCreatedEvent);
        AggregateLifecycle.apply(leadCreatedEvent);
    }

    @CommandHandler
    public void handle(UpdateLeadCommand updateleadCommand) {

        LeadUpdatedEvent leadUpdatedEvent = new LeadUpdatedEvent();
        BeanUtils.copyProperties(updateleadCommand, leadUpdatedEvent);
        AggregateLifecycle.apply(leadUpdatedEvent);
    }

    @CommandHandler
    public void handle(DeleteLeadCommand deleteleadCommand) {

        LeadDeletedEvent deletedEvent = new LeadDeletedEvent();
        BeanUtils.copyProperties(deleteleadCommand, deletedEvent);
        AggregateLifecycle.apply(deletedEvent);
    }

    @CommandHandler
    public void handle(DeleteLeadCommonCommand deleteLeadCommonCommand) {
        LeadCommonDeletedEvent leadCommonDeletedEvent = new LeadCommonDeletedEvent();
        BeanUtils.copyProperties(deleteLeadCommonCommand, leadCommonDeletedEvent);
        AggregateLifecycle.apply(leadCommonDeletedEvent);
    }

    @EventSourcingHandler
    public void on(LeadCreatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.description = event.getDescription();
        this.leadValue = event.getLeadValue();
        this.status = event.getStatus();
        this.lostReason = event.getLostReason();
        this.closedAt = event.getClosedAt();
        this.userId = event.getUserId();
        this.personId = event.getPersonId();
        this.leadSourceId = event.getLeadSourceId();
        this.leadTypeId = event.getLeadTypeId();
        this.leadPipelineStageId = event.getLeadPipelineStageId();
        this.expectedCloseDate = event.getExpectedCloseDate();
        this.score = event.getScore();
    }

    @EventSourcingHandler
    public void on(LeadUpdatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.description = event.getDescription();
        this.leadValue = event.getLeadValue();
        this.status = event.getStatus();
        this.lostReason = event.getLostReason();
        this.closedAt = event.getClosedAt();
        this.userId = event.getUserId();
        this.personId = event.getPersonId();
        this.leadSourceId = event.getLeadSourceId();
        this.leadTypeId = event.getLeadTypeId();
        this.leadPipelineStageId = event.getLeadPipelineStageId();
        this.expectedCloseDate = event.getExpectedCloseDate();
        this.score = event.getScore();
    }

    @EventSourcingHandler
    public void on(LeadDeletedEvent event) {
        this.id = event.getId();
    }

    @EventSourcingHandler
    public void on(LeadCommonDeletedEvent event) {
        this.id = event.getId();
    }
}
