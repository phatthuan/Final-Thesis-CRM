package com.crm.contactservice.command.event;

import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.contactservice.command.data.Contact;
import com.crm.contactservice.command.data.ContactRepository;

@Component
public class ContactEventsHandler {
    @Autowired
    private ContactRepository ContactRepository;


    @EventHandler
    public void on(ContactCreatedEvent event) {
        Contact Contact = new Contact();
        BeanUtils.copyProperties(event, Contact);
        ContactRepository.save(Contact);
    }

    @EventHandler
    public void on(ContactUpdatedEvent event) {
        Contact contact = ContactRepository.getById(event.getId());
        contact.setTitle(event.getTitle());
        contact.setDescription(event.getDescription());
        contact.setContactValue(event.getContactValue());
        contact.setStatus(event.getStatus());
        contact.setLostReason(event.getLostReason());
        contact.setClosedAt(event.getClosedAt());
        contact.setUserId(event.getUserId());
        contact.setPersonId(event.getPersonId());
        contact.setContactSourceId(event.getContactSourceId());
        contact.setContactTypeId(event.getContactTypeId());
        contact.setContactPipelineStageId(event.getContactPipelineStageId());
        contact.setExpectedCloseDate(event.getExpectedCloseDate());
        ContactRepository.save(contact);
    }

    @EventHandler
    public void on(ContactDeletedEvent event) {
        ContactRepository.deleteById(event.getId());
    }

    @EventHandler
    public void on(LeadToContactConvertedEvent event) {
        Contact contact = new Contact();        
        BeanUtils.copyProperties(event, contact);
        ContactRepository.save(contact);
    }
}
