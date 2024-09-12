package com.crm.contactservice.command.data;

import java.math.BigDecimal;
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
@Table(name = "contacts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Contact {
	@Id
    @Column(name = "id")
    private String id;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "contact_value")
    private BigDecimal contactValue;
    @Column(name = "status")
    private String status;
    @Column(name = "lost_reason")
    private String lostReason;
    @Column(name = "closed_at")
    private Date closedAt;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "person_id")
    private String personId;
    @Column(name = "contact_source_id")
    private Integer contactSourceId;
    @Column(name = "contact_type_id")
    private Integer contactTypeId;
    @Column(name = "contact_pipeline_stage_id")
    private Integer contactPipelineStageId;
    @Column(name = "expected_close_date")
    private Date expectedCloseDate;
    @Column(name = "score")
    private Integer score;
	
	@CreatedDate
    @Column(name = "created_at")
	private Date createdAt;

	@LastModifiedDate
    @Column(name = "updated_at")
	private Date updatedAt;
}
