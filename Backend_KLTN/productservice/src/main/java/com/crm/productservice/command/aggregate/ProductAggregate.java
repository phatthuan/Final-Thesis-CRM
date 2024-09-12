package com.crm.productservice.command.aggregate;


import java.math.BigDecimal;

import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import com.crm.productservice.command.command.CreateProductCommand;
import com.crm.productservice.command.command.DeleteProductCommand;
import com.crm.productservice.command.command.UpdateProductCommand;
import com.crm.productservice.command.event.ProductCreatedEvent;
import com.crm.productservice.command.event.ProductDeletedEvent;
import com.crm.productservice.command.event.ProductUpdatedEvent;

import lombok.NoArgsConstructor;

@Aggregate
@NoArgsConstructor
public class ProductAggregate {
    @AggregateIdentifier
    private String id;
    private String sku;
    private String name;
    private String description;
    private Integer quantity;
    private BigDecimal price;
    private String imageId;

    @CommandHandler
    public ProductAggregate(CreateProductCommand createproductCommand) {
        ProductCreatedEvent productCreatedEvent = new ProductCreatedEvent();
        BeanUtils.copyProperties(createproductCommand, productCreatedEvent);
        AggregateLifecycle.apply(productCreatedEvent);
    }

    @CommandHandler
    public void handle(UpdateProductCommand updateproductCommand) {

        ProductUpdatedEvent productUpdatedEvent = new ProductUpdatedEvent();
        BeanUtils.copyProperties(updateproductCommand, productUpdatedEvent);
        AggregateLifecycle.apply(productUpdatedEvent);
    }

    @CommandHandler
    public void handle(DeleteProductCommand deleteproductCommand) {

        ProductDeletedEvent deletedEvent = new ProductDeletedEvent();
        BeanUtils.copyProperties(deleteproductCommand, deletedEvent);
        AggregateLifecycle.apply(deletedEvent);
    }

    @EventSourcingHandler
    public void on(ProductCreatedEvent event) {
        this.id = event.getId();
        this.sku = event.getSku();
        this.name = event.getName();
        this.description = event.getDescription();
        this.quantity = event.getQuantity();
        this.price = event.getPrice();
    }

    @EventSourcingHandler
    public void on(ProductUpdatedEvent event) {
        this.id = event.getId();
        this.sku = event.getSku();
        this.name = event.getName();
        this.description = event.getDescription();
        this.quantity = event.getQuantity();
        this.price = event.getPrice();
        
    }

    @EventSourcingHandler
    public void on(ProductDeletedEvent event) {
        this.id = event.getId();
    }
}
