package com.crm.leadservice.command.controller;

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

import com.crm.commonservice.command.ConvertLeadToContactCommand;
import com.crm.commonservice.model.ConvertLeadToContactRequestCommonModel;
import com.crm.leadservice.command.command.CreateLeadCommand;
import com.crm.leadservice.command.command.DeleteLeadCommand;
import com.crm.leadservice.command.command.UpdateLeadCommand;
import com.crm.leadservice.command.model.LeadRequestModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/v1/leads")
public class LeadCommandController {
    @Autowired
    private CommandGateway commandGateway;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<String> AddLead(@RequestBody LeadRequestModel model) {
        CreateLeadCommand command = new CreateLeadCommand(
            UUID.randomUUID().toString(), // idmodel.getId(),
            model.getTitle(),
            model.getDescription(),
            model.getLeadValue(),
            model.getStatus(),
            model.getLostReason(),
            model.getClosedAt(),
            model.getUserId(),
            model.getPersonId(),
            model.getLeadSourceId(),
            model.getLeadTypeId(),
            model.getLeadPipelineStageId(),
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

    @PutMapping("/{leadId}")
    public ResponseEntity<String> updateUser(@PathVariable String leadId, @RequestBody LeadRequestModel model) {
        UpdateLeadCommand command = new UpdateLeadCommand(
            leadId,
            model.getTitle(),
            model.getDescription(),
            model.getLeadValue(),
            model.getStatus(),
            model.getLostReason(),
            model.getClosedAt(),
            model.getUserId(),
            model.getPersonId(),
            model.getLeadSourceId(),
            model.getLeadTypeId(),
            model.getLeadPipelineStageId(),
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

    @DeleteMapping("/{leadId}")
    public ResponseEntity<String> DeleteLead(@PathVariable String leadId) {

        DeleteLeadCommand command = new DeleteLeadCommand(leadId);
        commandGateway.sendAndWait(command);
        return ResponseEntity.ok().body("{\"status\": \"success\"}");
    }

    @PostMapping("/convert-lead-to-contact")
    public ResponseEntity<String> ConvertLeadToContact(@RequestBody ConvertLeadToContactRequestCommonModel model) {
        ConvertLeadToContactCommand command = new ConvertLeadToContactCommand(
            UUID.randomUUID().toString(),
            model.getTitle(),
            model.getDescription(),
            model.getLeadValue(),
            model.getStatus(),
            model.getLostReason(),
            model.getClosedAt(),
            model.getUserId(),
            model.getPersonId(),
            model.getLeadSourceId(),
            model.getLeadTypeId(),
            model.getLeadPipelineStageId(),
            model.getExpectedCloseDate(),
            model.getScore(),
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
}
