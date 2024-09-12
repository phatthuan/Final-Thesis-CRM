package com.crm.commonservice.command;

import org.axonframework.modelling.command.TargetAggregateIdentifier;
import org.bson.types.Binary;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserImageCommand {
    @TargetAggregateIdentifier
    private String id;
    private String title;
    private Binary image;
}
