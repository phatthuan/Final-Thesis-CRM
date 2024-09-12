package com.crm.imageservice.command.event;

import org.bson.types.Binary;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserImageUpdatedEvent {
    private String id;
    private String title;
    private Binary image;
}
