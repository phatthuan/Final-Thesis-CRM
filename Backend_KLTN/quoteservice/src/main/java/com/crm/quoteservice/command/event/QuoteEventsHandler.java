package com.crm.quoteservice.command.event;


import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.quoteservice.command.data.Quote;
import com.crm.quoteservice.command.data.QuoteRepository;

@Component
public class QuoteEventsHandler {
    @Autowired
    private QuoteRepository quoteRepository;


    @EventHandler
    public void on(QuoteCreatedEvent event) {
        Quote quote = new Quote();
        BeanUtils.copyProperties(event, quote);
        quoteRepository.save(quote);
    }

    @EventHandler
    public void on(QuoteUpdatedEvent event) {
        Quote quote = quoteRepository.getById(event.getId());
        quote.setSubject(event.getSubject());
        quote.setDescription(event.getDescription());
        quote.setBillingAddress(event.getBillingAddress());
        quote.setShippingAddress(event.getShippingAddress());
        quote.setDiscountPercent(event.getDiscountPercent());
        quote.setDiscountAmount(event.getDiscountAmount());
        quote.setTaxAmount(event.getTaxAmount());
        quote.setAdjustmentAmount(event.getAdjustmentAmount());
        quote.setSubTotal(event.getSubTotal());
        quote.setGrandTotal(event.getGrandTotal());
        quote.setExpiredAt(event.getExpiredAt());
        quote.setPersonId(event.getPersonId());
        quote.setUserId(event.getUserId()); 
        quote.setIsDone(event.getIsDone());       
        quoteRepository.save(quote);
    }

    @EventHandler
    public void on(QuoteDeletedEvent event) {
        quoteRepository.deleteById(event.getId());
    }
}
