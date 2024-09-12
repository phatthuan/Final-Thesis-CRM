package com.crm.contactservice.query.model;


import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactResponseModel {
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
