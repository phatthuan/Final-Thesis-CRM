package com.crm.activityservice.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crm.activityservice.command.command.CreateActivityCommand;
import com.crm.activityservice.service.GoogleCalendarServiceImpl;
import com.google.api.services.calendar.model.Event;

@RestController
@RequestMapping("/api/v1/activities/google-calendar")
public class GoogleCalendarController {
    @Autowired
    private GoogleCalendarServiceImpl googleCalendarServiceImpl;

    @Autowired
    private CommandGateway commandGateway;

    @PostMapping("/create-event")
    public ResponseEntity<String> createEvent(@RequestParam("summary") String summary,
            @RequestParam("description") String description, @RequestParam("dateScheduleFrom") String dateScheduleFrom,
            @RequestParam("dateScheduleTo") String dateScheduleTo, @RequestParam("location") String location,
            @RequestParam("attendee") String[] attendee) {
        CompletableFuture<ResponseEntity<String>> futureResponse = CompletableFuture.supplyAsync(() -> {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
                LocalDateTime localdateScheduleFrom = LocalDateTime.parse(dateScheduleFrom, formatter);
                LocalDateTime localdateScheduleTo = LocalDateTime.parse(dateScheduleTo, formatter);

                Date dateScheduleFromFormat = Date.from(localdateScheduleFrom.atZone(ZoneId.systemDefault()).toInstant());
                Date dateScheduleToFormat = Date.from(localdateScheduleTo.atZone(ZoneId.systemDefault()).toInstant());

                Event event = googleCalendarServiceImpl.createEvent(summary, description, dateScheduleFromFormat,
                dateScheduleToFormat, location, attendee);

                Date dateScheduleFromEvent = new Date(event.getStart().getDateTime().getValue());
                Date dateScheduleToEvent = new Date(event.getEnd().getDateTime().getValue());

                String sendToEmail = String.join(", ", attendee);

                CreateActivityCommand createActivityCommand = new CreateActivityCommand(
                        UUID.randomUUID().toString(),
                        event.getSummary(),
                        "google-calendar",
                        event.getDescription(),
                        dateScheduleFromEvent,
                        dateScheduleToEvent,
                        null,
                        null,
                        event.getLocation(),
                        sendToEmail);
                commandGateway.sendAndWait(createActivityCommand);

                return ResponseEntity.ok()
                        .body("{\"status\": \"success\", \"message\": \"Event created successfully.\"}");
            } catch (IOException e) {
                e.printStackTrace();

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("{\"status\": \"error\", \"message\": \"Failed to create event\"}");
            } catch (Exception e) {
                e.printStackTrace();

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("{\"status\": \"error\", \"message\": \"Failed to create event\"}");
            }
        });

        try {
            return futureResponse.get();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": \"error\", \"message\": \"Failed to create event\"}");
        }
    }
}
