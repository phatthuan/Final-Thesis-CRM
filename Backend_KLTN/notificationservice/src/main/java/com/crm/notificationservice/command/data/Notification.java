package com.crm.notificationservice.command.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Notification{
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "title", columnDefinition = "TEXT")
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "userId")
    private String userId;
    @Column(name = "ticketId")
    private String ticketId;
    @Column(name = "activityId")
    private String activityId;
    @Column(name = "quoteId")
    private String quoteId;
    @Column(name = "productId")
    private String productId;
    @Column(name = "leadId")
    private String leadId;
    @Column(name = "isRead")
    private int isRead;

	@CreatedDate
    @Column(name = "created_at")
	private Date createdAt;

	@LastModifiedDate
    @Column(name = "updated_at")
	private Date updatedAt;

}