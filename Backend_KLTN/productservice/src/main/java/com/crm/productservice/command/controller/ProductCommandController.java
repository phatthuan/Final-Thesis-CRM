package com.crm.productservice.command.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.UUID;

import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.crm.commonservice.command.CreateProductImageCommand;
import com.crm.commonservice.command.CreateUserImageCommand;
import com.crm.commonservice.command.UpdateProductImageCommand;
import com.crm.commonservice.command.UpdateUserImageCommand;
import com.crm.productservice.command.command.CreateProductCommand;
import com.crm.productservice.command.command.DeleteProductCommand;
import com.crm.productservice.command.command.UpdateProductCommand;
import com.crm.productservice.command.model.ProductRequestModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/products")
public class ProductCommandController {
    @Autowired
    private CommandGateway commandGateway;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<String> addProduct(@RequestParam("sku") String sku, @RequestParam("name") String name,
            @RequestParam("description") String description, @RequestParam("quantity") String quantity,
            @RequestParam("price") String price, @RequestParam("imageFile") MultipartFile imageFile)
            throws IOException {
        try {
            String productId = UUID.randomUUID().toString();
            String imageId = imageFile != null ? UUID.randomUUID().toString() : "";
            Integer parseQuantity = Integer.parseInt(quantity);
            BigDecimal parsePrice = new BigDecimal(price);
            CreateProductCommand command = new CreateProductCommand(productId, sku, name, description, parseQuantity, parsePrice,
                    imageId);
            commandGateway.sendAndWait(command);

            if (imageFile != null) {
                CreateProductImageCommand imageCommand = new CreateProductImageCommand(imageId,
                        "Image of product" + name + "",
                        new Binary(BsonBinarySubType.BINARY, imageFile.getBytes()));
                commandGateway.sendAndWait(imageCommand);
            }

            String modelJson = objectMapper.writeValueAsString(command);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable String id ,@RequestParam("sku") String sku,
            @RequestParam("name") String name, @RequestParam("description") String description,
            @RequestParam("quantity") String quantity, @RequestParam("price") String price,
            @RequestParam("imageId") String imageId,
            @RequestParam("imageFile") MultipartFile imageFile) throws IOException {
        try {
            Integer parseQuantity = Integer.parseInt(quantity);
            BigDecimal parsePrice = new BigDecimal(price);
            UpdateProductCommand command = new UpdateProductCommand(
                    id, sku, name, description, parseQuantity, parsePrice, imageId);
            commandGateway.sendAndWait(command);

            if (imageFile != null) {
                UpdateProductImageCommand imageCommand = new UpdateProductImageCommand(imageId, "Image of product" + name + "",
                        new Binary(BsonBinarySubType.BINARY, imageFile.getBytes()));
                commandGateway.sendAndWait(imageCommand);
            }

            String modelJson = objectMapper.writeValueAsString(command);
            return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteUser(@PathVariable String productId) {

        DeleteProductCommand command = new DeleteProductCommand(productId);
        commandGateway.sendAndWait(command);
        return ResponseEntity.ok().body("{\"status\": \"success\"}");
    }
}
