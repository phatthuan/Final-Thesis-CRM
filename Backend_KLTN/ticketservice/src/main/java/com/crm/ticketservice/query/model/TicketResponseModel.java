package com.crm.ticketservice.query.model;


import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketResponseModel {
    private String id;
    private String subject;
    private String userId;
    private Integer status;
    private Integer priority;
    private String description;
    private String assignedToUserId;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Ho_Chi_Minh")
    private Date createdAt;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Ho_Chi_Minh")
    private Date updatedAt;

    private String requester;
    private String requesterEmail;
    private String receiver;
    private String receiverEmail;
}
