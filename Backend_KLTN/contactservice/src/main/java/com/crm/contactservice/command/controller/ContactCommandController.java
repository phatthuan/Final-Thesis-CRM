package com.crm.contactservice.command.controller;

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

import com.crm.contactservice.command.command.CreateContactCommand;
import com.crm.contactservice.command.command.DeleteContactCommand;
import com.crm.contactservice.command.command.UpdateContactCommand;
import com.crm.contactservice.command.model.ContactRequestModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/v1/contacts")
public class ContactCommandController {
    @Autowired
    private CommandGateway commandGateway;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<String> addUser(@RequestBody ContactRequestModel model) {
        CreateContactCommand command = new CreateContactCommand(
            UUID.randomUUID().toString(),
            model.getTitle(),
            model.getDescription(),
            model.getContactValue(),
            model.getStatus(),
            model.getLostReason(),
            model.getClosedAt(),
            model.getUserId(),
            model.getPersonId(),
            model.getContactSourceId(),
            model.getContactTypeId(),
            model.getContactPipelineStageId(),
            model.getExpectedCloseDate(),
            model.getScore()
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

    @PutMapping("/{contactId}")
    public ResponseEntity<String> updateUser(@PathVariable String contactId, @RequestBody ContactRequestModel model) {
        UpdateContactCommand command = new UpdateContactCommand(
            contactId,
            model.getTitle(),
            model.getDescription(),
            model.getContactValue(),
            model.getStatus(),
            model.getLostReason(),
            model.getClosedAt(),
            model.getUserId(),
            model.getPersonId(),
            model.getContactSourceId(),
            model.getContactTypeId(),
            model.getContactPipelineStageId(),
            model.getExpectedCloseDate(),
            model.getScore()
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

    @DeleteMapping("/{ContactId}")
    public ResponseEntity<String> deleteUser(@PathVariable String ContactId) {

        DeleteContactCommand command = new DeleteContactCommand(ContactId);
        commandGateway.sendAndWait(command);
        return ResponseEntity.ok().body("{\"status\": \"success\"}");
    }
}
