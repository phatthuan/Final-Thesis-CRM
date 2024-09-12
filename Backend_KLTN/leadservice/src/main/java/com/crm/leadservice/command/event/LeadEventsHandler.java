package com.crm.leadservice.command.event;


import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.leadservice.command.data.Lead;
import com.crm.leadservice.command.data.LeadRepository;

@Component
public class LeadEventsHandler {
    @Autowired
    private LeadRepository leadRepository;


    @EventHandler
    public void on(LeadCreatedEvent event) {
        Lead lead = new Lead();
        BeanUtils.copyProperties(event, lead);
        leadRepository.save(lead);
    }

    @EventHandler
    public void on(LeadUpdatedEvent event) {
        Lead lead = leadRepository.getById(event.getId());
        lead.setTitle(event.getTitle());
        lead.setDescription(event.getDescription());
        lead.setLeadValue(event.getLeadValue());
        lead.setStatus(event.getStatus());
        lead.setLostReason(event.getLostReason());
        lead.setClosedAt(event.getClosedAt());
        lead.setUserId(event.getUserId());
        lead.setPersonId(event.getPersonId());
        lead.setLeadSourceId(event.getLeadSourceId());
        lead.setLeadTypeId(event.getLeadTypeId());
        lead.setLeadPipelineStageId(event.getLeadPipelineStageId());
        lead.setExpectedCloseDate(event.getExpectedCloseDate());
        lead.setScore(event.getScore());
        leadRepository.save(lead);
    }

    @EventHandler
    public void on(LeadDeletedEvent event) {
        leadRepository.deleteById(event.getId());
    }

    @EventHandler
    public void on(LeadCommonDeletedEvent event) {
        leadRepository.deleteById(event.getId());
    }
}
