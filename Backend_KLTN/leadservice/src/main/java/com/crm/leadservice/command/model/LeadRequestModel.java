package com.crm.leadservice.command.model;


import java.math.BigDecimal;
import java.util.Date;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeadRequestModel {
    private String id;
    private String title;
    private String description;
    private BigDecimal leadValue;
    private String status;
    private String lostReason;
    private Date closedAt;
    private String userId;
    private String personId;
    private Integer leadSourceId;
    private Integer leadTypeId;
    private Integer leadPipelineStageId;
    private Date expectedCloseDate;
    private Integer score;
}
