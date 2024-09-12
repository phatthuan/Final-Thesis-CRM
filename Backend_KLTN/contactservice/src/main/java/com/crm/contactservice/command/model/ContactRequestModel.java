package com.crm.contactservice.command.model;


import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactRequestModel {
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
