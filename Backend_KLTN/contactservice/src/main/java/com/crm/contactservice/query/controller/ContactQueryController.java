package com.crm.contactservice.query.controller;

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

import com.crm.contactservice.ContactserviceApplication;
import com.crm.contactservice.query.model.ContactResponseModel;
import com.crm.contactservice.query.queries.GetAllContactsQuery;
import com.crm.contactservice.query.queries.GetContactQuery;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/contacts")
public class ContactQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @Autowired
    private ObjectMapper objectMapper;

    private Logger logger = org.slf4j.LoggerFactory.getLogger(ContactserviceApplication.class);

    @GetMapping("/{ContactId}")
    public ResponseEntity<String> getContactDetail(@PathVariable String ContactId) {
        GetContactQuery getContactsQuery = new GetContactQuery();
        getContactsQuery.setId(ContactId);

        ContactResponseModel ContactResponseModel = queryGateway.query(getContactsQuery,
                ResponseTypes.instanceOf(ContactResponseModel.class))
                .join();

        try {
            String modelJson = objectMapper.writeValueAsString(ContactResponseModel);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @GetMapping
    public ResponseEntity<String> getAllContacts() {
        GetAllContactsQuery getAllContactsQuery = new GetAllContactsQuery();
        List<ContactResponseModel> list = queryGateway
                .query(getAllContactsQuery, ResponseTypes.multipleInstancesOf(ContactResponseModel.class))
                .join();
        logger.info("Danh sach Contact " + list.toString());
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
