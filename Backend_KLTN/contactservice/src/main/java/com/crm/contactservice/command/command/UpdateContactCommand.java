package com.crm.contactservice.command.command;


import java.math.BigDecimal;
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
public class UpdateContactCommand {
    @TargetAggregateIdentifier
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
