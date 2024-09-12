package com.crm.notificationservice.query.controller;

import com.crm.notificationservice.NotificationserviceApplication;
import com.crm.notificationservice.query.model.NotificationResponseModel;
import com.crm.notificationservice.query.queries.GetAllNotificationsQuery;
import com.crm.notificationservice.query.queries.GetNotificationQuery;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @Autowired
    private ObjectMapper objectMapper;

    private Logger logger = org.slf4j.LoggerFactory.getLogger(NotificationserviceApplication.class);

    @GetMapping("/{notificationId}")
    public ResponseEntity<String> getNotificationDetail(@PathVariable String notificationId) {
        GetNotificationQuery getleadsQuery = new GetNotificationQuery();
        getleadsQuery.setId(notificationId);

        NotificationResponseModel leadResponseModel = queryGateway.query(getleadsQuery,
                        ResponseTypes.instanceOf(NotificationResponseModel.class))
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
    public ResponseEntity<String> getAllNotifications() {
        GetAllNotificationsQuery getAllNotificationsQuery = new GetAllNotificationsQuery();
        List<NotificationResponseModel> list = queryGateway
                .query(getAllNotificationsQuery, ResponseTypes.multipleInstancesOf(NotificationResponseModel.class))
                .join();
        logger.info("Danh sach notifications " + list.toString());
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
