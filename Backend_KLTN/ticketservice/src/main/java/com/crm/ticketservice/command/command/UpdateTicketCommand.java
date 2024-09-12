package com.crm.ticketservice.command.command;


import org.axonframework.modelling.command.TargetAggregateIdentifier;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTicketCommand {
    @TargetAggregateIdentifier
    private String id;
    private String subject;
    private String userId;
    private Integer status;
    private Integer priority;
    private String description;
    private String assignedToUserId;
}
