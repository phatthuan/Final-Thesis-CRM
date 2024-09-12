package com.crm.leadservice.query.model;


import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeadResponseModel {
    private String id;
    private String title;
    private String description;
    private BigDecimal leadValue;
    private String status;
    private String lostReason;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Ho_Chi_Minh")
    private Date closedAt;
    private String userId;
    private String personId;
    private Integer leadSourceId;
    private Integer leadTypeId;
    private Integer leadPipelineStageId;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Ho_Chi_Minh")
    private Date expectedCloseDate;
    private Integer score;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Ho_Chi_Minh")
    private Date createdAt;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Ho_Chi_Minh")
    private Date updatedAt;

    private String personName;
    private String email;
    private String contactNumbers;
}
