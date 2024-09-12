package com.crm.personservice.command.command;



import org.axonframework.modelling.command.TargetAggregateIdentifier;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePersonCommand {
    @TargetAggregateIdentifier
    private String id;
    private String name;
    private String emails;
    private String contactNumbers;
    private String organizationId;
}
