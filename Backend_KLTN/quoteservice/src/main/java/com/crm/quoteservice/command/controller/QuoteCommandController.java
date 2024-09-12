package com.crm.quoteservice.command.controller;

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

import com.crm.quoteservice.command.command.CreateQuoteCommand;
import com.crm.quoteservice.command.command.DeleteQuoteCommand;
import com.crm.quoteservice.command.command.UpdateQuoteCommand;
import com.crm.quoteservice.command.model.QuoteRequestModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/v1/quotes")
public class QuoteCommandController {
    @Autowired
    private CommandGateway commandGateway;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<String> addUser(@RequestBody QuoteRequestModel model) {
        CreateQuoteCommand command = new CreateQuoteCommand(
            UUID.randomUUID().toString(), // idmodel.getId(),
            model.getSubject(),
            model.getDescription(),
            model.getBillingAddress(),
            model.getShippingAddress(),
            model.getDiscountPercent(),
            model.getDiscountAmount(),
            model.getTaxAmount(),
            model.getAdjustmentAmount(),
            model.getSubTotal(),
            model.getGrandTotal(),
            model.getExpiredAt(),
            model.getPersonId(),
            model.getUserId(),
            model.getIsDone()
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

    @PutMapping("/{quoteId}")
    public ResponseEntity<String> updateUser(@RequestBody QuoteRequestModel model) {
        UpdateQuoteCommand command = new UpdateQuoteCommand(
            model.getId(),
            model.getSubject(),
            model.getDescription(),
            model.getBillingAddress(),
            model.getShippingAddress(),
            model.getDiscountPercent(),
            model.getDiscountAmount(),
            model.getTaxAmount(),
            model.getAdjustmentAmount(),
            model.getSubTotal(),
            model.getGrandTotal(),
            model.getExpiredAt(),
            model.getPersonId(),
            model.getUserId(),
            model.getIsDone()
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

    @DeleteMapping("/{quoteId}")
    public ResponseEntity<String> deleteUser(@PathVariable String quoteId) {

        DeleteQuoteCommand command = new DeleteQuoteCommand(quoteId);
        commandGateway.sendAndWait(command);
        return ResponseEntity.ok().body("{\"status\": \"success\"}");
    }
}
