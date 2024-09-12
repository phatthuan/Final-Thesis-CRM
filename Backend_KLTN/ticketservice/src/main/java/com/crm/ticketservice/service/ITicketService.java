package com.crm.ticketservice.service;

import com.crm.ticketservice.command.model.Message;

public interface ITicketService {
    void sendMessage(Message message);
}
