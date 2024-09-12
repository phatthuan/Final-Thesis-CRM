package com.crm.activityservice.service;

import java.io.IOException;
import java.util.Date;

import com.google.api.services.calendar.model.Event;

public interface GoogleCalendarService {
    public Event createEvent(String summary, String description, Date dateScheduleFrom, Date dateScheduleTo,
            String location,
            String[] attendee) throws IOException;
}
