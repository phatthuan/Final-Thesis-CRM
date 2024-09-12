package com.crm.personservice.command.aggregate;



import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import com.crm.personservice.command.command.CreatePersonCommand;
import com.crm.personservice.command.command.DeletePersonCommand;
import com.crm.personservice.command.command.UpdatePersonCommand;
import com.crm.personservice.command.event.PersonCreatedEvent;
import com.crm.personservice.command.event.PersonDeletedEvent;
import com.crm.personservice.command.event.PersonUpdatedEvent;

import lombok.NoArgsConstructor;

@Aggregate
@NoArgsConstructor
public class PersonAggregate {
    @AggregateIdentifier
    private String id;
    private String name;
    private String emails;
    private String contactNumbers;
    private String organizationId;

    @CommandHandler
    public PersonAggregate(CreatePersonCommand createpersonCommand) {
        PersonCreatedEvent personCreatedEvent = new PersonCreatedEvent();
        BeanUtils.copyProperties(createpersonCommand, personCreatedEvent);
        AggregateLifecycle.apply(personCreatedEvent);
    }

    @CommandHandler
    public void handle(UpdatePersonCommand updatepersonCommand) {

        PersonUpdatedEvent personUpdatedEvent = new PersonUpdatedEvent();
        BeanUtils.copyProperties(updatepersonCommand, personUpdatedEvent);
        AggregateLifecycle.apply(personUpdatedEvent);
    }

    @CommandHandler
    public void handle(DeletePersonCommand deletepersonCommand) {

        PersonDeletedEvent deletedEvent = new PersonDeletedEvent();
        BeanUtils.copyProperties(deletepersonCommand, deletedEvent);
        AggregateLifecycle.apply(deletedEvent);
    }

    @EventSourcingHandler
    public void on(PersonCreatedEvent event) {
        this.id = event.getId();
        this.name = event.getName();
        this.emails = event.getEmails();
        this.contactNumbers = event.getContactNumbers();
        this.organizationId = event.getOrganizationId();
    }

    @EventSourcingHandler
    public void on(PersonUpdatedEvent event) {
        this.id = event.getId();
        this.name = event.getName();
        this.emails = event.getEmails();
        this.contactNumbers = event.getContactNumbers();
        this.organizationId = event.getOrganizationId();
    }

    @EventSourcingHandler
    public void on(PersonDeletedEvent event) {
        this.id = event.getId();
    }
}
