package com.crm.quoteservice.command.aggregate;


import java.math.BigDecimal;
import java.util.Date;

import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import com.crm.quoteservice.command.command.CreateQuoteCommand;
import com.crm.quoteservice.command.command.DeleteQuoteCommand;
import com.crm.quoteservice.command.command.UpdateQuoteCommand;
import com.crm.quoteservice.command.event.QuoteCreatedEvent;
import com.crm.quoteservice.command.event.QuoteDeletedEvent;
import com.crm.quoteservice.command.event.QuoteUpdatedEvent;

import lombok.NoArgsConstructor;

@Aggregate
@NoArgsConstructor
public class QuoteAggregate {
    @AggregateIdentifier
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

    @CommandHandler
    public QuoteAggregate(CreateQuoteCommand createquoteCommand) {
        QuoteCreatedEvent quoteCreatedEvent = new QuoteCreatedEvent();
        BeanUtils.copyProperties(createquoteCommand, quoteCreatedEvent);
        AggregateLifecycle.apply(quoteCreatedEvent);
    }

    @CommandHandler
    public void handle(UpdateQuoteCommand updatequoteCommand) {

        QuoteUpdatedEvent quoteUpdatedEvent = new QuoteUpdatedEvent();
        BeanUtils.copyProperties(updatequoteCommand, quoteUpdatedEvent);
        AggregateLifecycle.apply(quoteUpdatedEvent);
    }

    @CommandHandler
    public void handle(DeleteQuoteCommand deletequoteCommand) {

        QuoteDeletedEvent deletedEvent = new QuoteDeletedEvent();
        BeanUtils.copyProperties(deletequoteCommand, deletedEvent);
        AggregateLifecycle.apply(deletedEvent);
    }

    @EventSourcingHandler
    public void on(QuoteCreatedEvent event) {
        this.id = event.getId();
        this.subject = event.getSubject();
        this.description = event.getDescription();
        this.billingAddress = event.getBillingAddress();
        this.shippingAddress = event.getShippingAddress();
        this.discountPercent = event.getDiscountPercent();
        this.discountAmount = event.getDiscountAmount();
        this.taxAmount = event.getTaxAmount();
        this.adjustmentAmount = event.getAdjustmentAmount();
        this.subTotal = event.getSubTotal();
        this.grandTotal = event.getGrandTotal();
        this.expiredAt = event.getExpiredAt();
        this.personId = event.getPersonId();
        this.userId = event.getUserId();
        this.isDone = event.getIsDone();
    }

    @EventSourcingHandler
    public void on(QuoteUpdatedEvent event) {
        this.id = event.getId();
        this.subject = event.getSubject();
        this.description = event.getDescription();
        this.billingAddress = event.getBillingAddress();
        this.shippingAddress = event.getShippingAddress();
        this.discountPercent = event.getDiscountPercent();
        this.discountAmount = event.getDiscountAmount();
        this.taxAmount = event.getTaxAmount();
        this.adjustmentAmount = event.getAdjustmentAmount();
        this.subTotal = event.getSubTotal();
        this.grandTotal = event.getGrandTotal();
        this.expiredAt = event.getExpiredAt();
        this.personId = event.getPersonId();
        this.userId = event.getUserId();
        this.isDone = event.getIsDone();
    }

    @EventSourcingHandler
    public void on(QuoteDeletedEvent event) {
        this.id = event.getId();
    }
}
