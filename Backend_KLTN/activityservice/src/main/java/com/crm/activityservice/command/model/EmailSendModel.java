package com.crm.activityservice.command.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailSendModel {
    private String title;
    private String comment;
    private String sendToEmail;
}
