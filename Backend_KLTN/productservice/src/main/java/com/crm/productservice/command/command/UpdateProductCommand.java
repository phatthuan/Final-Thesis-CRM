package com.crm.productservice.command.command;


import java.math.BigDecimal;

import org.axonframework.modelling.command.TargetAggregateIdentifier;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProductCommand {
    @TargetAggregateIdentifier
    private String id;
    private String sku;
    private String name;
    private String description;
    private Integer quantity;
    private BigDecimal price;
    private String imageId;
}
