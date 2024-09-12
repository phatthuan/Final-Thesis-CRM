package com.crm.productservice.command.model;


import java.math.BigDecimal;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequestModel {
    private String id;
    private String sku;
    private String name;
    private String description;
    private Integer quantity;
    private BigDecimal price;
    private String imageId;
}
