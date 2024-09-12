package com.crm.contactservice.command.event;


import java.math.BigDecimal;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ContactCreatedEvent {
    private String id;
    private String title;
    private String description;
    private BigDecimal contactValue;
    private String status;
    private String lostReason;
    private Date closedAt;
    private String userId;
    private String personId;
    private Integer contactSourceId;
    private Integer contactTypeId;
    private Integer contactPipelineStageId;
    private Date expectedCloseDate;
    private Integer score;
}
