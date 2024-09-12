package com.crm.imageservice.command.model;



import org.bson.types.Binary;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageRequestModel {
    private String id;
    private String title;
    private Binary image;
}
