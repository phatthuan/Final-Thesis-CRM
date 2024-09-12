package com.crm.userservice.command.aggregate;


import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import com.crm.userservice.command.command.CreateUserCommand;
import com.crm.userservice.command.command.DeleteUserCommand;
import com.crm.userservice.command.command.UpdateUserCommand;
import com.crm.userservice.command.event.UserCreatedEvent;
import com.crm.userservice.command.event.UserDeletedEvent;
import com.crm.userservice.command.event.UserUpdatedEvent;

import lombok.NoArgsConstructor;

@Aggregate
@NoArgsConstructor
public class UserAggregate {
    @AggregateIdentifier
    private String id;
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Boolean isActive;
    private Integer role;
    private String imageId;

    @CommandHandler
    public UserAggregate(CreateUserCommand createUserCommand) {

        UserCreatedEvent UserCreatedEvent = new UserCreatedEvent();
        BeanUtils.copyProperties(createUserCommand, UserCreatedEvent);
        AggregateLifecycle.apply(UserCreatedEvent);
    }

    @CommandHandler
    public void handle(UpdateUserCommand updateUserCommand) {

        UserUpdatedEvent UserUpdatedEvent = new UserUpdatedEvent();
        BeanUtils.copyProperties(updateUserCommand, UserUpdatedEvent);
        AggregateLifecycle.apply(UserUpdatedEvent);
    }

    @CommandHandler
    public void handle(DeleteUserCommand deleteUserCommand) {

        UserDeletedEvent deletedEvent = new UserDeletedEvent();
        BeanUtils.copyProperties(deleteUserCommand, deletedEvent);
        AggregateLifecycle.apply(deletedEvent);
    }

    @EventSourcingHandler
    public void on(UserCreatedEvent event) {
        this.id = event.getId();
        this.username = event.getUsername();
        this.password = event.getPassword();
        this.email = event.getEmail();
        this.firstName = event.getFirstName();
        this.lastName = event.getLastName();
        this.phoneNumber = event.getPhoneNumber();
        this.isActive = event.getIsActive();
        this.role = event.getRole();
        this.imageId = event.getImageId();
    }

    @EventSourcingHandler
    public void on(UserUpdatedEvent event) {
        this.id = event.getId();
        this.username = event.getUsername();
        this.email = event.getEmail();
        this.firstName = event.getFirstName();
        this.lastName = event.getLastName();
        this.phoneNumber = event.getPhoneNumber();
        this.role = event.getRole();
        this.imageId = event.getImageId();
    }

    @EventSourcingHandler
    public void on(UserDeletedEvent event) {
        this.id = event.getId();
    }
}
