package com.crm.ticketservice.command.event;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketUpdatedEvent {
    private String id;
    private String subject;
    private String userId;
    private Integer status;
    private Integer priority;
    private String description;
    private String assignedToUserId;
}
