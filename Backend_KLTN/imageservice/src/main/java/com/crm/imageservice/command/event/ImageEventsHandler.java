package com.crm.imageservice.command.event;

import java.util.Date;
import java.util.Optional;

import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.imageservice.command.data.Image;
import com.crm.imageservice.command.data.ImageRepository;

@Component
public class ImageEventsHandler {
    @Autowired
    private ImageRepository imageRepository;

    @EventHandler
    public void on(ImageCreatedEvent event) {
        Image image = new Image();
        BeanUtils.copyProperties(event, image);
        // explicitly set createdAt when creating a new Image
        image.setCreatedAt(new Date());
        imageRepository.insert(image);
    }

    @EventHandler
    public void on(ImageUpdatedEvent event) {
        Optional<Image> optionalImage = imageRepository.findById(event.getId());
        if (optionalImage.isPresent()) {
            Image image = optionalImage.get();
            image.setTitle(event.getTitle());
            image.setImage(event.getImage());
            imageRepository.save(image);
        } else {
            throw new IllegalArgumentException("Image not found with id: " + event.getId());
        }
    }

    @EventHandler
    public void on(ImageDeletedEvent event) {
        imageRepository.deleteById(event.getId());
    }

    @EventHandler
    public void on(UserImageCreatedEvent event) {
        Image image = new Image();
        BeanUtils.copyProperties(event, image);
        // explicitly set createdAt when creating a new Image
        image.setCreatedAt(new Date());
        imageRepository.insert(image);
    }

    @EventHandler
    public void on(UserImageUpdatedEvent event) {
        Optional<Image> optionalImage = imageRepository.findById(event.getId());
        if (optionalImage.isPresent()) {
            Image image = optionalImage.get();
            image.setTitle(event.getTitle());
            image.setImage(event.getImage());
            imageRepository.save(image);
        } else {
            throw new IllegalArgumentException("Image not found with id: " + event.getId());
        }
    }

    @EventHandler
    public void on(ProductImageCreatedEvent event) {
        Image image = new Image();
        BeanUtils.copyProperties(event, image);
        // explicitly set createdAt when creating a new Image
        image.setCreatedAt(new Date());
        imageRepository.insert(image);
    }

    @EventHandler
    public void on(ProductImageUpdatedEvent event) {
        Optional<Image> optionalImage = imageRepository.findById(event.getId());
        if (optionalImage.isPresent()) {
            Image image = optionalImage.get();
            image.setTitle(event.getTitle());
            image.setImage(event.getImage());
            imageRepository.save(image);
        } else {
            throw new IllegalArgumentException("Image not found with id: " + event.getId());
        }
    }
}
