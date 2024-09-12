package com.crm.activityservice.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.crm.activityservice.auth.GoogleAuth;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventAttendee;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.api.services.calendar.model.EventReminder;

@Service
public class GoogleCalendarServiceImpl implements GoogleCalendarService {

        public Event createEvent(String summary, String description, Date dateScheduleFrom, Date dateScheduleTo,
                        String location, String[] attendee) throws IOException {
                List<String> scopes = Arrays.asList("https://www.googleapis.com/auth/calendar");
                Credential credential = GoogleAuth.authorize(scopes, "calendargoogle");

                Calendar calendarService = new Calendar.Builder(GoogleAuth.HTTP_TRANSPORT, GoogleAuth.JSON_FACTORY,
                                credential)
                                .setApplicationName("calendar-cmdline-createevent-sample").build();
                                
                Event event = new Event()
                                .setSummary(summary)
                                .setLocation(location)
                                .setDescription(description);

                DateTime startDateTime = new DateTime(dateScheduleFrom);
                EventDateTime start = new EventDateTime()
                                .setDateTime(startDateTime)
                                .setTimeZone("Asia/Ho_Chi_Minh");
                event.setStart(start);

                DateTime endDateTime = new DateTime(dateScheduleTo);
                EventDateTime end = new EventDateTime()
                                .setDateTime(endDateTime)
                                .setTimeZone("Asia/Ho_Chi_Minh");
                event.setEnd(end);

                String[] recurrence = new String[] { "RRULE:FREQ=DAILY;COUNT=1" };
                event.setRecurrence(Arrays.asList(recurrence));

                EventAttendee[] attendees = new EventAttendee[attendee.length];
                for (int i = 0; i < attendee.length; i++) {
                        attendees[i] = new EventAttendee().setEmail(attendee[i]);
                }
                event.setAttendees(Arrays.asList(attendees));

                EventReminder[] reminderOverrides = new EventReminder[] {
                                new EventReminder().setMethod("email").setMinutes(24 * 60),
                                new EventReminder().setMethod("popup").setMinutes(10),
                };
                Event.Reminders reminders = new Event.Reminders()
                                .setUseDefault(false)
                                .setOverrides(Arrays.asList(reminderOverrides));
                event.setReminders(reminders);

                String calendarId = "6da15f558f43f88903b34d6469bdfcd36d12f0fbc42570b178ed74ae99123422@group.calendar.google.com";
                event = calendarService.events().insert(calendarId, event).execute();
                System.out.printf("Event created: %s\n", event.getHtmlLink());
                return event;
        }
}
