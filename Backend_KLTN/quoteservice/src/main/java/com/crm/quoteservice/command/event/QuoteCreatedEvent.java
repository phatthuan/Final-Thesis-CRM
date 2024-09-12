package com.crm.quoteservice.command.event;


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
public class QuoteCreatedEvent {
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
