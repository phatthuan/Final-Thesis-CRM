package com.crm.notificationservice.command.controller;

import com.crm.notificationservice.command.command.CreateNotificationCommand;
import com.crm.notificationservice.command.command.DeleteNotificationCommand;
import com.crm.notificationservice.command.command.UpdateNotificationCommand;
import com.crm.notificationservice.command.command.UpdateStatusNotificationCommand;
import com.crm.notificationservice.command.model.NotificationRequestModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationCommandController{
    @Autowired
    private CommandGateway commandGateway;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<String> AddNotification(@RequestBody NotificationRequestModel model) {
        CreateNotificationCommand command = new CreateNotificationCommand(
                UUID.randomUUID().toString(), // idmodel.getId(),
                model.getTitle(),
                model.getDescription(),
                model.getUserId(),
                model.getTicketId(),
                model.getQuoteId(),
                model.getProductId(),
                model.getActivityId(),
                model.getLeadId(),
                model.getIsRead()
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

    @PutMapping("/{notificationId}")
    public ResponseEntity<String> updateNotification(@PathVariable String notificationId, @RequestBody NotificationRequestModel model) {
        UpdateNotificationCommand command = new UpdateNotificationCommand(
                notificationId,
                model.getTitle(),
                model.getDescription(),
                model.getUserId(),
                model.getTicketId(),
                model.getQuoteId(),
                model.getProductId(),
                model.getActivityId(),
                model.getLeadId()
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

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<String> DeleteNotification(@PathVariable String notificationId) {

        DeleteNotificationCommand command = new DeleteNotificationCommand(notificationId);
        commandGateway.sendAndWait(command);
        return ResponseEntity.ok().body("{\"status\": \"success\"}");
    }

    @PostMapping("/is_read/{notificationId}")
    public ResponseEntity<String> UpdateStatusNotification(@PathVariable String notificationId) {

        UpdateStatusNotificationCommand command = new UpdateStatusNotificationCommand(
            notificationId,
            1
        );
        commandGateway.sendAndWait(command);
        return ResponseEntity.ok().body("{\"status\": \"success\", \"is_read\": true, \"id\": " + notificationId + "}");
    }
}