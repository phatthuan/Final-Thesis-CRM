package com.crm.activityservice.command.model;

import java.util.Date;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActivityRequestModel {
    private String id;
    private String title;
    private String type;
    private String comment;
    private Date scheduleFrom;
    private Date scheduleTo;
    private Boolean isDone;
    private String userId;
    private String location;
    private String sendToEmail;
}
