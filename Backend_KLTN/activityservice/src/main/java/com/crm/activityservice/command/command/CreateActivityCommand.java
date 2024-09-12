package com.crm.activityservice.command.command;


import java.util.Date;

import org.axonframework.modelling.command.TargetAggregateIdentifier;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateActivityCommand {
    @TargetAggregateIdentifier    
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
}
