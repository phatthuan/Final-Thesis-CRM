package com.crm.imageservice.command.aggregate;


import java.io.IOException;

import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.BeanUtils;

import com.crm.commonservice.command.CreateProductImageCommand;
import com.crm.commonservice.command.CreateUserImageCommand;
import com.crm.commonservice.command.UpdateProductImageCommand;
import com.crm.commonservice.command.UpdateUserImageCommand;
import com.crm.imageservice.command.command.CreateImageCommand;
import com.crm.imageservice.command.command.DeleteImageCommand;
import com.crm.imageservice.command.command.UpdateImageCommand;
import com.crm.imageservice.command.event.ImageCreatedEvent;
import com.crm.imageservice.command.event.ImageDeletedEvent;
import com.crm.imageservice.command.event.ImageUpdatedEvent;
import com.crm.imageservice.command.event.ProductImageCreatedEvent;
import com.crm.imageservice.command.event.ProductImageUpdatedEvent;
import com.crm.imageservice.command.event.UserImageCreatedEvent;
import com.crm.imageservice.command.event.UserImageUpdatedEvent;

import lombok.NoArgsConstructor;

@Aggregate
@NoArgsConstructor
public class ImageAggregate {
    @AggregateIdentifier
    private String id;
    private String title;
    private Binary image;


    @CommandHandler
    public ImageAggregate(CreateImageCommand createimageCommand) {
        ImageCreatedEvent imageCreatedEvent = new ImageCreatedEvent();
        BeanUtils.copyProperties(createimageCommand, imageCreatedEvent);
        AggregateLifecycle.apply(imageCreatedEvent);
    }

    @CommandHandler
    public void handle(UpdateImageCommand updateimageCommand) {

        ImageUpdatedEvent imageUpdatedEvent = new ImageUpdatedEvent();
        BeanUtils.copyProperties(updateimageCommand, imageUpdatedEvent);
        AggregateLifecycle.apply(imageUpdatedEvent);
    }

    @CommandHandler
    public void handle(DeleteImageCommand deleteimageCommand) {

        ImageDeletedEvent deletedEvent = new ImageDeletedEvent();
        BeanUtils.copyProperties(deleteimageCommand, deletedEvent);
        AggregateLifecycle.apply(deletedEvent);
    }

    @CommandHandler
    public ImageAggregate(CreateUserImageCommand createUserImageCommand) {
        UserImageCreatedEvent userImageCreatedEvent = new UserImageCreatedEvent();
        BeanUtils.copyProperties(createUserImageCommand, userImageCreatedEvent);
        AggregateLifecycle.apply(userImageCreatedEvent);
    }

    @CommandHandler
    public void handle(UpdateUserImageCommand updateimageCommand) {
        UserImageUpdatedEvent userImageUpdatedEvent = new UserImageUpdatedEvent();
        BeanUtils.copyProperties(updateimageCommand, userImageUpdatedEvent);
        AggregateLifecycle.apply(userImageUpdatedEvent);
    }

    @CommandHandler
    public ImageAggregate(CreateProductImageCommand createProductImageCommand) {
        ProductImageCreatedEvent productImageCreatedEvent = new ProductImageCreatedEvent();
        BeanUtils.copyProperties(createProductImageCommand, productImageCreatedEvent);
        AggregateLifecycle.apply(productImageCreatedEvent);
    }

    @CommandHandler
    public void handle(UpdateProductImageCommand updateProductImageCommand) {
        ProductImageUpdatedEvent productImageUpdatedEvent = new ProductImageUpdatedEvent();
        BeanUtils.copyProperties(updateProductImageCommand, productImageUpdatedEvent);
        AggregateLifecycle.apply(productImageUpdatedEvent);
    }

    @EventSourcingHandler
    public void on(ImageCreatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.image = event.getImage();
    }

    @EventSourcingHandler
    public void on(ImageUpdatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.image = event.getImage();
    }

    @EventSourcingHandler
    public void on(ImageDeletedEvent event) {
        this.id = event.getId();
    }

    @EventSourcingHandler
    public void on(UserImageCreatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.image = event.getImage();
    }

    @EventSourcingHandler
    public void on(UserImageUpdatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.image = event.getImage();
    }

    @EventSourcingHandler
    public void on(ProductImageCreatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.image = event.getImage();
    }

    @EventSourcingHandler
    public void on(ProductImageUpdatedEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.image = event.getImage();
    }
}
