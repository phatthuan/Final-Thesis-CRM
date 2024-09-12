package com.crm.ticketservice.query.controller;

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

import com.crm.ticketservice.TicketserviceApplication;
import com.crm.ticketservice.query.model.TicketResponseModel;
import com.crm.ticketservice.query.queries.GetAllTicketsQuery;
import com.crm.ticketservice.query.queries.GetTicketQuery;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/tickets")
public class TicketQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @Autowired
    private ObjectMapper objectMapper;

    private Logger logger = org.slf4j.LoggerFactory.getLogger(TicketserviceApplication.class);

    @GetMapping("/{ticketId}")
    public ResponseEntity<String> getticketDetail(@PathVariable String ticketId) {
        GetTicketQuery getticketsQuery = new GetTicketQuery();
        getticketsQuery.setId(ticketId);

        TicketResponseModel ticketResponseModel = queryGateway.query(getticketsQuery,
                ResponseTypes.instanceOf(TicketResponseModel.class))
                .join();

        try {
            String modelJson = objectMapper.writeValueAsString(ticketResponseModel);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @GetMapping
    public ResponseEntity<String> getAlltickets() {
        GetAllTicketsQuery getAllticketsQuery = new GetAllTicketsQuery();
        List<TicketResponseModel> list = queryGateway
                .query(getAllticketsQuery, ResponseTypes.multipleInstancesOf(TicketResponseModel.class))
                .join();
        logger.info("Danh sach ticket " + list.toString());
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
