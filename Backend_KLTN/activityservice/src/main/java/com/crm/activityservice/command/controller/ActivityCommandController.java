package com.crm.activityservice.command.controller;

import java.util.UUID;

import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.activityservice.command.command.CreateActivityCommand;
import com.crm.activityservice.command.command.DeleteActivityCommand;
import com.crm.activityservice.command.command.SendEmailCommand;
import com.crm.activityservice.command.command.UpdateActivityCommand;
import com.crm.activityservice.command.model.ActivityRequestModel;
import com.crm.activityservice.command.model.EmailSendModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/v1/activities")
public class ActivityCommandController {
    @Autowired
    private CommandGateway commandGateway;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<String> addActivity(@RequestBody ActivityRequestModel model) {
        CreateActivityCommand command = new CreateActivityCommand(
            UUID.randomUUID().toString(), // idmodel.getId(),
            model.getTitle(),
            model.getType(),
            model.getComment(),
            model.getScheduleFrom(),
            model.getScheduleTo(),
            model.getIsDone(),
            model.getUserId(),
            model.getLocation(),
            model.getSendToEmail()
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

    @PutMapping("/{activityId}")
    public ResponseEntity<String> updateActivity(@RequestBody ActivityRequestModel model) {
        UpdateActivityCommand command = new UpdateActivityCommand(
            model.getId(),
            model.getTitle(),
            model.getType(),
            model.getComment(),
            model.getScheduleFrom(),
            model.getScheduleTo(),
            model.getIsDone(),
            model.getUserId(),
            model.getLocation(),
            model.getSendToEmail()
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

    @DeleteMapping("/{activityId}")
    public ResponseEntity<String> deleteActivity(@PathVariable String activityId) {

        DeleteActivityCommand command = new DeleteActivityCommand(activityId);
        commandGateway.sendAndWait(command);
        return ResponseEntity.ok().body("{\"status\": \"success\"}");
    }

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailSendModel emailSendModel) {
        try {
            String id = UUID.randomUUID().toString();
            SendEmailCommand command = new SendEmailCommand(id, emailSendModel.getTitle(), emailSendModel.getComment(), emailSendModel.getSendToEmail());
            commandGateway.sendAndWait(command);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"message\": \"Email sent successfully\", \"id\": \"" + id + "\"}");
        } catch (MailException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"status\": \"error\", \"message\": \"Error sending mail\"}");
        }
    }
}
