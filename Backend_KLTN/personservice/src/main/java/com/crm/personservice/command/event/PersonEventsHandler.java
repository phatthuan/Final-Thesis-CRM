package com.crm.personservice.command.event;


import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.personservice.command.data.Person;
import com.crm.personservice.command.data.PersonRepository;

@Component
public class PersonEventsHandler {
    @Autowired
    private PersonRepository personRepository;


    @EventHandler
    public void on(PersonCreatedEvent event) {
        Person person = new Person();
        BeanUtils.copyProperties(event, person);
        personRepository.save(person);
    }

    @EventHandler
    public void on(PersonUpdatedEvent event) {
        Person person = personRepository.getById(event.getId());
        person.setName(event.getName());
        person.setEmails(event.getEmails());
        person.setContactNumbers(event.getContactNumbers());
        person.setOrganizationId(event.getOrganizationId());
        personRepository.save(person);
    }

    @EventHandler
    public void on(PersonDeletedEvent event) {
        personRepository.deleteById(event.getId());
    }
}
