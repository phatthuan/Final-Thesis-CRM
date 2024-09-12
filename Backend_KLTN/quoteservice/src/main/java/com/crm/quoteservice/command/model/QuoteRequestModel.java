package com.crm.quoteservice.command.model;


import java.math.BigDecimal;
import java.util.Date;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuoteRequestModel {
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
    private Date expiredAt;
    private String personId;
    private String userId;
    private Boolean isDone;
}
