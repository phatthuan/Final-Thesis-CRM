package com.crm.imageservice.command.event;


import java.math.BigDecimal;
import java.util.Date;

import org.bson.types.Binary;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageUpdatedEvent {
    private String id;
    private String title;
    private Binary image;
}
