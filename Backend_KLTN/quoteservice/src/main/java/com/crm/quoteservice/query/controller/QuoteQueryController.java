package com.crm.quoteservice.query.controller;

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

import com.crm.quoteservice.QuoteserviceApplication;
import com.crm.quoteservice.query.model.QuoteResponseModel;
import com.crm.quoteservice.query.queries.GetAllQuotesQuery;
import com.crm.quoteservice.query.queries.GetQuoteQuery;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/quotes")
public class QuoteQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @Autowired
    private ObjectMapper objectMapper;

    private Logger logger = org.slf4j.LoggerFactory.getLogger(QuoteserviceApplication.class);

    @GetMapping("/{quoteId}")
    public ResponseEntity<String> getquoteDetail(@PathVariable String quoteId) {
        GetQuoteQuery getquotesQuery = new GetQuoteQuery();
        getquotesQuery.setId(quoteId);

        QuoteResponseModel quoteResponseModel = queryGateway.query(getquotesQuery,
                ResponseTypes.instanceOf(QuoteResponseModel.class))
                .join();

        try {
            String modelJson = objectMapper.writeValueAsString(quoteResponseModel);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @GetMapping
    public ResponseEntity<String> getAllquotes() {
        GetAllQuotesQuery getAllquotesQuery = new GetAllQuotesQuery();
        List<QuoteResponseModel> list = queryGateway
                .query(getAllquotesQuery, ResponseTypes.multipleInstancesOf(QuoteResponseModel.class))
                .join();
        logger.info("Danh sach quote " + list.toString());
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
