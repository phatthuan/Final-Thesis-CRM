package com.crm.commonservice.model;

import org.bson.types.Binary;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageResponseCommonModel {
    private String id;
    private String title;
    private Binary image;
}
