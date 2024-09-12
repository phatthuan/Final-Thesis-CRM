package com.crm.ticketservice.command.controller;

import java.util.UUID;

import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.ticketservice.command.command.CreateTicketCommand;
import com.crm.ticketservice.command.command.DeleteTicketCommand;
import com.crm.ticketservice.command.command.UpdateTicketCommand;
import com.crm.ticketservice.command.model.TicketRequestModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/v1/tickets")
public class TicketCommandController {
    @Autowired
    private CommandGateway commandGateway;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<String> addTicket(@RequestBody TicketRequestModel model) {
        CreateTicketCommand command = new CreateTicketCommand(
            UUID.randomUUID().toString(),
            model.getSubject(),
            model.getUserId(),
            model.getStatus(),
            model.getPriority(),
            model.getDescription(),
            model.getAssignedToUserId()
        );
        commandGateway.sendAndWait(command);
        try {
            String modelJson = objectMapper.writeValueAsString(command);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @PutMapping("/{ticketId}")
    public ResponseEntity<String> updateTicket(@RequestBody TicketRequestModel model, @PathVariable String ticketId) {
        UpdateTicketCommand command = new UpdateTicketCommand(
            ticketId,
            model.getSubject(),
            model.getUserId(),
            model.getStatus(),
            model.getPriority(),
            model.getDescription(),
            model.getAssignedToUserId()
        );
        commandGateway.sendAndWait(command);
        try {
            String modelJson = objectMapper.writeValueAsString(model);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @DeleteMapping("/{ticketId}")
    public ResponseEntity<String> deleteTicket(@PathVariable String ticketId) {

        DeleteTicketCommand command = new DeleteTicketCommand(ticketId);
        commandGateway.sendAndWait(command);
        return ResponseEntity.ok().body("{\"status\": \"success\"}");
    }
}
