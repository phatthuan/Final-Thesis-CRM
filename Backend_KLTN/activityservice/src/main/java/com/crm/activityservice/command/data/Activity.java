package com.crm.activityservice.command.data;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "activities")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Activity {
    @Id
    @Column(name = "id")
    private String id;
    @Column(name = "title")
    private String title;
    @Column(name = "type")
    private String type;
    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;
    @Column(name = "schedule_from")
    private Date scheduleFrom;
    @Column(name = "schedule_to")
    private Date scheduleTo;
    @Column(name = "is_done")
    private Boolean isDone;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "location")
    private String location;
    @Column(name = "send_to_email")
    private String sendToEmail;

    @CreatedDate
    @Column(name = "created_at")
    private Date createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt;
}
