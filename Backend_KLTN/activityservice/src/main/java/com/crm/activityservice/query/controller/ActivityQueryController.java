package com.crm.activityservice.query.controller;

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

import com.crm.activityservice.ActivityserviceApplication;
import com.crm.activityservice.query.model.ActivityResponseModel;
import com.crm.activityservice.query.queries.GetAllActivitiesQuery;
import com.crm.activityservice.query.queries.GetActivityQuery;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/activities")
public class ActivityQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @Autowired
    private ObjectMapper objectMapper;

    private Logger logger = org.slf4j.LoggerFactory.getLogger(ActivityserviceApplication.class);

    @GetMapping("/{activityId}")
    public ResponseEntity<String> getactivityDetail(@PathVariable String activityId) {
        GetActivityQuery getactivitysQuery = new GetActivityQuery();
        getactivitysQuery.setId(activityId);

        ActivityResponseModel activityResponseModel = queryGateway.query(getactivitysQuery,
                ResponseTypes.instanceOf(ActivityResponseModel.class))
                .join();

        try {
            String modelJson = objectMapper.writeValueAsString(activityResponseModel);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @GetMapping
    public ResponseEntity<String> getAllactivitys() {
        GetAllActivitiesQuery getAllactivitysQuery = new GetAllActivitiesQuery();
        List<ActivityResponseModel> list = queryGateway
                .query(getAllactivitysQuery, ResponseTypes.multipleInstancesOf(ActivityResponseModel.class))
                .join();
        logger.info("Danh sach activity " + list.toString());
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
