package com.crm.imageservice.query.controller;

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

import com.crm.imageservice.ImageserviceApplication;
import com.crm.imageservice.query.model.ImageResponseModel;
import com.crm.imageservice.query.queries.GetAllImagesQuery;
import com.crm.imageservice.query.queries.GetImageQuery;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/images")
public class ImageQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @Autowired
    private ObjectMapper objectMapper;

    private Logger logger = org.slf4j.LoggerFactory.getLogger(ImageserviceApplication.class);

    @GetMapping("/{imageId}")
    public ResponseEntity<String> getimageDetail(@PathVariable String imageId) {
        GetImageQuery getimagesQuery = new GetImageQuery();
        getimagesQuery.setId(imageId);

        ImageResponseModel imageResponseModel = queryGateway.query(getimagesQuery,
                ResponseTypes.instanceOf(ImageResponseModel.class))
                .join();

        try {
            String modelJson = objectMapper.writeValueAsString(imageResponseModel);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @GetMapping
    public ResponseEntity<String> getAllimages() {
        GetAllImagesQuery getAllimagesQuery = new GetAllImagesQuery();
        List<ImageResponseModel> list = queryGateway
                .query(getAllimagesQuery, ResponseTypes.multipleInstancesOf(ImageResponseModel.class))
                .join();
        logger.info("Danh sach image " + list.toString());
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
