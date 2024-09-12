package com.crm.activityservice.controller;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicReference;

import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.crm.activityservice.command.command.CreateActivityCommand;
import com.crm.activityservice.service.FaceBookServiceImpl;
import com.crm.activityservice.service.PublicImageServiceImpl;

@RestController
@RequestMapping("/api/v1/activities/facebook")
public class FaceBookController {

    @Autowired
    private PublicImageServiceImpl publicImageService;

    @Autowired
    private FaceBookServiceImpl faceBookService;

    @Autowired
    private CommandGateway commandGateway;

    @PostMapping("/create-post")
    public ResponseEntity<String> createPost(@RequestParam("caption") String caption,
            @RequestParam(required = false) MultipartFile imageFile) {
        try {
            CompletableFuture<Void> postFuture;
            AtomicReference<String> status = new AtomicReference<>();

            if (imageFile != null && !imageFile.isEmpty()) {
                CompletableFuture<String> imageUrlFuture = CompletableFuture
                        .supplyAsync(() -> publicImageService.getImageUrl(imageFile));
                postFuture = imageUrlFuture
                        .thenAccept(imageUrl -> status.set(faceBookService.createPagePostWithImage(caption, imageUrl)));
            } else {
                postFuture = CompletableFuture.runAsync(() -> status.set(faceBookService.createPagePost(caption)));
            }

            postFuture.thenRun(() -> {
                if (!status.get().equals("Error creating page post")) {
                    CreateActivityCommand createActivityCommand = new CreateActivityCommand(
                            UUID.randomUUID().toString(),
                            "create facebook post",
                            "facebook",
                            caption,
                            null,
                            null,
                            true,
                            null,
                            null,
                            null);
                    commandGateway.sendAndWait(createActivityCommand);
                }
            }).join();

            return ResponseEntity.ok().body("{\"status\": \"success\", \"message\": \"Post created successfully\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Error creating post\"}");
        }
    }

}
