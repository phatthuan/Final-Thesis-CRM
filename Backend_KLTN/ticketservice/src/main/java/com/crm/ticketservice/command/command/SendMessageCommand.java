package com.crm.ticketservice.command.command;

import org.axonframework.modelling.command.TargetAggregateIdentifier;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SendMessageCommand {
    @TargetAggregateIdentifier
	private String id;
    private String message;
}
