package com.crm.leadservice.command.data;

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
@Table(name = "leads")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Lead {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "title")
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "lead_value")
    private BigDecimal leadValue;

    @Column(name = "status")
    private String status;

    @Column(name = "lost_reason", columnDefinition = "TEXT")
    private String lostReason;

    @Column(name = "closed_at")
    private Date closedAt;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "person_id")
    private String personId;

    @Column(name = "lead_source_id")
    private Integer leadSourceId;

    @Column(name = "lead_type_id")
    private Integer leadTypeId;

    @Column(name = "lead_pipeline_stage_id")
    private Integer leadPipelineStageId;

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
