package com.crm.personservice.command.event;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PersonUpdatedEvent {
    private String id;
    private String name;
    private String emails;
    private String contactNumbers;
    private String organizationId;
}
