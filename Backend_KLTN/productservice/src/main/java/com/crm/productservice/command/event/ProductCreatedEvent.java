package com.crm.productservice.command.event;


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
public class ProductCreatedEvent {
    private String id;
    private String sku;
    private String name;
    private String description;
    private Integer quantity;
    private BigDecimal price;
    private String imageId;
}
