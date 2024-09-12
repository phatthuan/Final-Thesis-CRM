package com.crm.userservice.query.controller;

import java.util.List;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.userservice.UserserviceApplication;
import com.crm.userservice.query.model.UserResponseModel;
import com.crm.userservice.query.queries.GetAllUsersQuery;
import com.crm.userservice.query.queries.GetUserQuery;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/users")
public class UserQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @Autowired
    private ObjectMapper objectMapper;

    private Logger logger = org.slf4j.LoggerFactory.getLogger(UserserviceApplication.class);

    @GetMapping("/{UserId}")
    public ResponseEntity<String> getUserDetail(@PathVariable String UserId) {
        GetUserQuery getUsersQuery = new GetUserQuery();
        getUsersQuery.setId(UserId);

        UserResponseModel userResponseModel = queryGateway.query(getUsersQuery,
                ResponseTypes.instanceOf(UserResponseModel.class))
                .join();

        try {
            String modelJson = objectMapper.writeValueAsString(userResponseModel);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @GetMapping
    public ResponseEntity<String> getAllUsers() {
        GetAllUsersQuery getAllUsersQuery = new GetAllUsersQuery();
        List<UserResponseModel> list = queryGateway
                .query(getAllUsersQuery, ResponseTypes.multipleInstancesOf(UserResponseModel.class))
                .join();
        logger.info("Danh sach User " + list.toString());
        try {
            String modelJson = objectMapper.writeValueAsString(list);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }
}
