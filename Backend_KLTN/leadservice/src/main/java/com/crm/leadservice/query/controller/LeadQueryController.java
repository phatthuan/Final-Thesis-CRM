package com.crm.leadservice.query.controller;

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

import com.crm.leadservice.LeadserviceApplication;
import com.crm.leadservice.query.model.LeadResponseModel;
import com.crm.leadservice.query.queries.GetAllLeadsQuery;
import com.crm.leadservice.query.queries.GetLeadQuery;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/leads")
public class LeadQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @Autowired
    private ObjectMapper objectMapper;

    private Logger logger = org.slf4j.LoggerFactory.getLogger(LeadserviceApplication.class);

    @GetMapping("/{leadId}")
    public ResponseEntity<String> getleadDetail(@PathVariable String leadId) {
        GetLeadQuery getleadsQuery = new GetLeadQuery();
        getleadsQuery.setId(leadId);

        LeadResponseModel leadResponseModel = queryGateway.query(getleadsQuery,
                ResponseTypes.instanceOf(LeadResponseModel.class))
                .join();

        try {
            String modelJson = objectMapper.writeValueAsString(leadResponseModel);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @GetMapping
    public ResponseEntity<String> getAllleads() {
        GetAllLeadsQuery getAllleadsQuery = new GetAllLeadsQuery();
        List<LeadResponseModel> list = queryGateway
                .query(getAllleadsQuery, ResponseTypes.multipleInstancesOf(LeadResponseModel.class))
                .join();
        logger.info("Danh sach lead " + list.toString());
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
