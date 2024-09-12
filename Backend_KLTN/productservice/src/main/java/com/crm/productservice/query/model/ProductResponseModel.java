package com.crm.productservice.query.model;


import java.math.BigDecimal;
import java.util.Date;

import org.bson.types.Binary;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponseModel {
    private String id;
    private String sku;
    private String name;
    private String description;
    private Integer quantity;
    private BigDecimal price;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Ho_Chi_Minh")
    private Date createdAt;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Ho_Chi_Minh")
    private Date updatedAt;

    private String imageId;
    private String imageTitle;
	private Binary imageFile;
}
