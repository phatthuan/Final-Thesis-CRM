package com.crm.activityservice.command.event;


import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import com.crm.activityservice.command.data.Activity;
import com.crm.activityservice.command.data.ActivityRepository;

@Component
public class ActivityEventsHandler {
    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private JavaMailSender mailSender;


    @EventHandler
    public void on(ActivityCreatedEvent event) {
        Activity activity = new Activity();
        BeanUtils.copyProperties(event, activity);
        activityRepository.save(activity);
    }

    @EventHandler
    public void on(ActivityUpdatedEvent event) {
        Activity activity = activityRepository.getById(event.getId());
        activity.setTitle(event.getTitle());
        activity.setType(event.getType());
        activity.setComment(event.getComment());
        activity.setScheduleFrom(event.getScheduleFrom());
        activity.setScheduleTo(event.getScheduleTo());
        activity.setIsDone(event.getIsDone());
        activity.setUserId(event.getUserId());
        activity.setLocation(event.getLocation());
        activity.setSendToEmail(event.getSendToEmail());
        activityRepository.save(activity);
    }

    @EventHandler
    public void on(ActivityDeletedEvent event) {
        activityRepository.deleteById(event.getId());
    }

    @EventHandler
    public void on(EmailSentEvent event) throws MailException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(event.getSendToEmail());
        message.setSubject(event.getTitle());
        message.setText(event.getComment());
        mailSender.send(message);
    }
}
