package com.crm.imageservice.command.data;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import org.bson.types.Binary;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

@Document(collection = "images")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Image {
    @Id    
    private String id;

    @Field(name = "title")
    private String title;

    @Field(name = "image")
    private Binary image;

    @CreatedDate
    @Field(name = "created_at")
    private Date createdAt;

    @Field(name = "updated_at")
    @LastModifiedDate
    private Date updatedAt;
}
