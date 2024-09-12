package com.crm.personservice.command.model;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonRequestModel {
    private String id;
    private String name;
    private String emails;
    private String contactNumbers;
    private String organizationId;
}
