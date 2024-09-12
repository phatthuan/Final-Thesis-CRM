package com.crm.quoteservice.query.model;


import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuoteResponseModel {
    private String id;
    private String subject;
    private String description;
    private String billingAddress;
    private String shippingAddress;
    private BigDecimal discountPercent;
    private BigDecimal discountAmount;
    private BigDecimal taxAmount;
    private BigDecimal adjustmentAmount;
    private BigDecimal subTotal;
    private BigDecimal grandTotal;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Ho_Chi_Minh")
    private Date expiredAt;
    private String personId;
    private String userId;
    private Boolean isDone;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Ho_Chi_Minh")
    private Date createdAt;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Ho_Chi_Minh")
    private Date updatedAt;
}
