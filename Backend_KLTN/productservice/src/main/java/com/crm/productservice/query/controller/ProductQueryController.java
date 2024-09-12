package com.crm.productservice.query.controller;

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

import com.crm.productservice.ProductserviceApplication;
import com.crm.productservice.query.model.ProductResponseModel;
import com.crm.productservice.query.queries.GetAllProductsQuery;
import com.crm.productservice.query.queries.GetProductQuery;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/products")
public class ProductQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @Autowired
    private ObjectMapper objectMapper;

    private Logger logger = org.slf4j.LoggerFactory.getLogger(ProductserviceApplication.class);

    @GetMapping("/{productId}")
    public ResponseEntity<String> getproductDetail(@PathVariable String productId) {
        GetProductQuery getproductsQuery = new GetProductQuery();
        getproductsQuery.setId(productId);

        ProductResponseModel productResponseModel = queryGateway.query(getproductsQuery,
                ResponseTypes.instanceOf(ProductResponseModel.class))
                .join();

        try {
            String modelJson = objectMapper.writeValueAsString(productResponseModel);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @GetMapping
    public ResponseEntity<String> getAllproducts() {
        GetAllProductsQuery getAllproductsQuery = new GetAllProductsQuery();
        List<ProductResponseModel> list = queryGateway
                .query(getAllproductsQuery, ResponseTypes.multipleInstancesOf(ProductResponseModel.class))
                .join();
        logger.info("Danh sach product " + list.toString());
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
