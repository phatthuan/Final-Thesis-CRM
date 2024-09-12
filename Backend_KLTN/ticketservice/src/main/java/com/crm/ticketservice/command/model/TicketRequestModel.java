package com.crm.ticketservice.command.model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketRequestModel {
    private String id;
    private String subject;
    private String userId;
    private Integer status;
    private Integer priority;
    private String description;
    private String assignedToUserId;
}
