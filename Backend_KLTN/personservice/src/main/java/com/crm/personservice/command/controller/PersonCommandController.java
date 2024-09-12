package com.crm.personservice.command.controller;

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

import com.crm.personservice.command.command.CreatePersonCommand;
import com.crm.personservice.command.command.DeletePersonCommand;
import com.crm.personservice.command.command.UpdatePersonCommand;
import com.crm.personservice.command.model.PersonRequestModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/v1/persons")
public class PersonCommandController {
    @Autowired
    private CommandGateway commandGateway;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<String> addUser(@RequestBody PersonRequestModel model) {
        CreatePersonCommand command = new CreatePersonCommand(
            UUID.randomUUID().toString(),
            model.getName(),
            model.getEmails(),
            model.getContactNumbers(),
            model.getOrganizationId()
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

    @PutMapping("/{personId}")
    public ResponseEntity<String> updateUser(@PathVariable String personId,@RequestBody PersonRequestModel model) {
        UpdatePersonCommand command = new UpdatePersonCommand(
            personId,
            model.getName(),
            model.getEmails(),
            model.getContactNumbers(),
            model.getOrganizationId()
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

    @DeleteMapping("/{personId}")
    public ResponseEntity<String> deleteUser(@PathVariable String personId) {

        DeletePersonCommand command = new DeletePersonCommand(personId);
        commandGateway.sendAndWait(command);
        return ResponseEntity.ok().body("{\"status\": \"success\"}");
    }
}
