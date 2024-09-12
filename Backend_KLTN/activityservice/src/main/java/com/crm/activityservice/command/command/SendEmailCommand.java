package com.crm.activityservice.command.command;


import org.axonframework.modelling.command.TargetAggregateIdentifier;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SendEmailCommand {
    @TargetAggregateIdentifier    
    private String id;
    private String title;
    private String comment;
    private String sendToEmail;
}
