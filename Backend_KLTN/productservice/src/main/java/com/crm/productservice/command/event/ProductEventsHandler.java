package com.crm.productservice.command.event;


import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.productservice.command.data.Product;
import com.crm.productservice.command.data.ProductRepository;

@Component
public class ProductEventsHandler {
    @Autowired
    private ProductRepository productRepository;


    @EventHandler
    public void on(ProductCreatedEvent event) {
        Product product = new Product();
        BeanUtils.copyProperties(event, product);
        productRepository.save(product);
    }

    @EventHandler
    public void on(ProductUpdatedEvent event) {
        Product product = productRepository.getById(event.getId());
        product.setSku(event.getSku());
        product.setName(event.getName());
        product.setDescription(event.getDescription());
        product.setQuantity(event.getQuantity());
        product.setPrice(event.getPrice());
        productRepository.save(product);
    }

    @EventHandler
    public void on(ProductDeletedEvent event) {
        productRepository.deleteById(event.getId());
    }
}
