package com.crm.activityservice.command.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmailSentEvent {
    private String id;
    private String title;
    private String comment;
    private String sendToEmail;
}
