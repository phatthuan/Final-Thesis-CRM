package com.crm.ticketservice.command.event;


import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.ticketservice.command.data.Ticket;
import com.crm.ticketservice.command.data.TicketRepository;
import com.crm.ticketservice.command.model.Message;
import com.crm.ticketservice.service.ITicketService;

@Component
public class TicketEventsHandler {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
	private ITicketService ticketService;


    @EventHandler
    public void on(TicketCreatedEvent event) {
        Ticket ticket = new Ticket();
        BeanUtils.copyProperties(event, ticket);
        ticketRepository.save(ticket);
    }

    @EventHandler
    public void on(TicketUpdatedEvent event) {
        Ticket ticket = ticketRepository.getById(event.getId());
        ticket.setSubject(event.getSubject());
        ticket.setUserId(event.getUserId());
        ticket.setStatus(event.getStatus());
        ticket.setPriority(event.getPriority());
        ticket.setDescription(event.getDescription());
        ticket.setAssignedToUserId(event.getAssignedToUserId());
        ticketRepository.save(ticket);
    }

    @EventHandler
    public void on(TicketDeletedEvent event) {
        ticketRepository.deleteById(event.getId());
    }

    @EventHandler
	public void on(TicketSendMessageEvent event) {
		Message message = new Message(event.getId(), event.getMessage());
		ticketService.sendMessage(message);
	}
}
