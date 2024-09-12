package com.crm.ticketservice.command.data;

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
@Table(name = "tickets")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Ticket {
	@Id
    @Column(name = "id")
    private String id;
    @Column(name = "subject")
    private String subject;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "status")
    private Integer status;
    @Column(name = "priority")
    private Integer priority;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(name = "assigned_to_user_id")
    private String assignedToUserId;
	
	@CreatedDate
    @Column(name = "created_at")
	private Date createdAt;

	@LastModifiedDate
    @Column(name = "updated_at")
	private Date updatedAt;
}
