package com.crm.imageservice.command.controller;

import java.io.IOException;
import java.util.UUID;

import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.crm.imageservice.command.command.CreateImageCommand;
import com.crm.imageservice.command.command.DeleteImageCommand;
import com.crm.imageservice.command.command.UpdateImageCommand;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/v1/images")
public class ImageCommandController {
    @Autowired
    private CommandGateway commandGateway;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<String> addUser(@RequestParam("title") String title, @RequestParam("image") MultipartFile image) throws IOException {
        CreateImageCommand command = new CreateImageCommand(
            UUID.randomUUID().toString(),
            title,
            new Binary(BsonBinarySubType.BINARY, image.getBytes())
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

    @PutMapping("/{imageId}")
    public ResponseEntity<String> updateUser(@PathVariable String imageId, @RequestParam("title") String title, @RequestParam("image") MultipartFile image) throws IOException {
        UpdateImageCommand command = new UpdateImageCommand(
            imageId,
            title,
            new Binary(BsonBinarySubType.BINARY, image.getBytes())
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

    @DeleteMapping("/{imageId}")
    public ResponseEntity<String> deleteUser(@PathVariable String imageId) {

        DeleteImageCommand command = new DeleteImageCommand(imageId);
        commandGateway.sendAndWait(command);
        return ResponseEntity.ok().body("{\"status\": \"success\"}");
    }
}
