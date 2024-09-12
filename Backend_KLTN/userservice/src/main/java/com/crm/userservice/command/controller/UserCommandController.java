package com.crm.userservice.command.controller;

import java.io.IOException;
import java.util.UUID;

import javax.ws.rs.Path;

import com.crm.userservice.command.data.User;
import com.crm.userservice.command.data.UserRepository;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.crm.commonservice.command.CreateUserImageCommand;
import com.crm.commonservice.command.UpdateUserImageCommand;
import com.crm.userservice.command.command.CreateUserCommand;
import com.crm.userservice.command.command.DeleteUserCommand;
import com.crm.userservice.command.command.UpdateUserCommand;
import com.crm.userservice.command.model.UserRequestModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/users")
public class UserCommandController {
    @Autowired
    private CommandGateway commandGateway;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> addUser(@RequestParam("username") String username,
            @RequestParam("password") String password, @RequestParam("email") String email,
            @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName,
            @RequestParam("phoneNumber") String phoneNumber, @RequestParam("isActive") String isActive,
            @RequestParam("role") String role, @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {
        try {
            String userId = UUID.randomUUID().toString();
            String imageId = imageFile != null ? UUID.randomUUID().toString() : "";
            Boolean active = Boolean.parseBoolean(isActive);
            Integer parseRole = Integer.parseInt(role);

            User user = userRepository.findByEmail(email);

            if (user != null ) {
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                        .body("{\"status\": \"error\", \"message\": \"This email is exist. Please choose another email\"}");
            }

            CreateUserCommand command = new CreateUserCommand(
                    userId, username, password, email, firstName, lastName,
                    phoneNumber, active, parseRole, imageId);
            commandGateway.sendAndWait(command);

            if (imageFile != null) {
                CreateUserImageCommand imageCommand = new CreateUserImageCommand(imageId, "Image of " + username + "",
                        new Binary(BsonBinarySubType.BINARY, imageFile.getBytes()));
                commandGateway.sendAndWait(imageCommand);
            }

            String modelJson = objectMapper.writeValueAsString(command);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable String id, @RequestParam(value = "username", required = false, defaultValue = "unknown") String username,
    @RequestParam("email") String email,
    @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName,
    @RequestParam("phoneNumber") String phoneNumber,
    @RequestParam("role") String role, @RequestParam("imageId") String imageId, @RequestParam("imageFile") MultipartFile imageFile) throws IOException {
        try {
            Integer parseRole = Integer.parseInt(role);
            UpdateUserCommand command = new UpdateUserCommand(
                    id, username, email, firstName, lastName,
                    phoneNumber, parseRole, imageId);
            commandGateway.sendAndWait(command);

            if (imageFile != null) {
                UpdateUserImageCommand imageCommand = new UpdateUserImageCommand(imageId, "Image of " + username + "",
                        new Binary(BsonBinarySubType.BINARY, imageFile.getBytes()));
                commandGateway.sendAndWait(imageCommand);
            }

            String modelJson = objectMapper.writeValueAsString(command);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @DeleteMapping("/{UserId}")
    public ResponseEntity<String> deleteUser(@PathVariable String UserId) {

        DeleteUserCommand command = new DeleteUserCommand(UserId);
        commandGateway.sendAndWait(command);
        return ResponseEntity.ok().body("{\"status\": \"success\"}");
    }
}
