package com.crm.personservice.query.controller;

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

import com.crm.personservice.PersonserviceApplication;
import com.crm.personservice.query.model.PersonResponseModel;
import com.crm.personservice.query.queries.GetAllPersonsQuery;
import com.crm.personservice.query.queries.GetPersonQuery;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/persons")
public class PersonQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @Autowired
    private ObjectMapper objectMapper;

    private Logger logger = org.slf4j.LoggerFactory.getLogger(PersonserviceApplication.class);

    @GetMapping("/{personId}")
    public ResponseEntity<String> getpersonDetail(@PathVariable String personId) {
        GetPersonQuery getpersonsQuery = new GetPersonQuery();
        getpersonsQuery.setId(personId);

        PersonResponseModel personResponseModel = queryGateway.query(getpersonsQuery,
                ResponseTypes.instanceOf(PersonResponseModel.class))
                .join();

        try {
            String modelJson = objectMapper.writeValueAsString(personResponseModel);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @GetMapping
    public ResponseEntity<String> getAllpersons() {
        GetAllPersonsQuery getAllpersonsQuery = new GetAllPersonsQuery();
        List<PersonResponseModel> list = queryGateway
                .query(getAllpersonsQuery, ResponseTypes.multipleInstancesOf(PersonResponseModel.class))
                .join();
        logger.info("Danh sach person " + list.toString());
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
