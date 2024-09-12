package com.crm.activityservice.controller;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.crm.activityservice.command.command.CreateActivityCommand;
import com.crm.activityservice.service.GoogleYoutubeServiceImpl;
import com.google.api.services.youtube.model.Video;

import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/v1/activities/youtube")
public class GoogleYoutubeController {
    @Autowired
    private GoogleYoutubeServiceImpl googleYoutubeService;

    @Autowired
    private CommandGateway commandGateway;

    @PostMapping("create-video")
    public ResponseEntity<String> createVideo(@RequestParam("title") String title, @RequestParam("description") String description, @RequestParam("file") MultipartFile file) {
        CompletableFuture<ResponseEntity<String>> futureResponse = CompletableFuture.supplyAsync(() -> {
            try {
                Video uploadedVideo = googleYoutubeService.createYoutubeVideo(title, description, file);
                CreateActivityCommand createActivityCommand = new CreateActivityCommand(
                        UUID.randomUUID().toString(),
                        uploadedVideo.getSnippet().getTitle(),
                        "youtube",
                        uploadedVideo.getSnippet().getDescription(),
                        null,
                        null,
                        true,
                        null,
                        null,
                        null);
                commandGateway.sendAndWait(createActivityCommand);
                return ResponseEntity.ok()
                        .body("{\"status\": \"success\", \"message\": \"Video uploaded successfully.\"}");
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("{\"status\": \"error\", \"message\": \"Failed to upload video\"}");
            }
        });

        try {
            return futureResponse.get();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Failed to upload video\"}");
        }
    }

}
