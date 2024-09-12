package com.crm.quoteservice.command.data;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "quotes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Quote {
    @Id
    @Column(name = "id")
    private String id;
    @Column(name = "subject")
    private String subject;
    @Column(name = "description")
    private String description;
    @Column(name = "billing_address")
    private String billingAddress;
    @Column(name = "shipping_address")
    private String shippingAddress;
    @Column(name = "discount_percent")
    private BigDecimal discountPercent;
    @Column(name = "discount_amount")
    private BigDecimal discountAmount;
    @Column(name = "tax_amount")
    private BigDecimal taxAmount;
    @Column(name = "adjustment_amount")
    private BigDecimal adjustmentAmount;
    @Column(name = "sub_total")
    private BigDecimal subTotal;
    @Column(name = " grand_total")
    private BigDecimal grandTotal;
    @Column(name = "expired_at")
    private Date expiredAt;
    @Column(name = "person_id")
    private String personId;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "is_done")
    private Boolean isDone;

    @CreatedDate
    @Column(name = "created_at")
    private Date createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt;
}
