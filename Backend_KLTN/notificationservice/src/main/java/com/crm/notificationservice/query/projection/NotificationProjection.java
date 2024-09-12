package com.crm.notificationservice.query.projection;
import com.crm.notificationservice.command.data.Notification;
import com.crm.notificationservice.command.data.NotificationRepository;
import com.crm.notificationservice.query.model.NotificationResponseModel;
import com.crm.notificationservice.query.queries.GetAllNotificationsQuery;
import com.crm.notificationservice.query.queries.GetNotificationQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class NotificationProjection {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private QueryGateway queryGateway;

    @QueryHandler
    public NotificationResponseModel handle(GetNotificationQuery getNotificationQuery) {
        NotificationResponseModel model = new NotificationResponseModel();
        Notification lead = notificationRepository.getById(getNotificationQuery.getId());
        model.setCreatedAt(new Date());
        BeanUtils.copyProperties(lead, model);

        if (getNotificationQuery.getId() == null) {
            throw new IllegalStateException("Notification is not found");
        }

        return model;
    }

    @QueryHandler
    List<NotificationResponseModel> handle(GetAllNotificationsQuery getAllNotificationQuery) {
        List<Notification> listEntity = notificationRepository.findAll();
        List<NotificationResponseModel> listNoti = new ArrayList<>();
        listEntity.forEach(s -> {
            NotificationResponseModel model = new NotificationResponseModel();
            BeanUtils.copyProperties(s, model);

            listNoti.add(model);
        });
        listNoti.sort((x1, x2) -> x2.getCreatedAt().compareTo(x1.getCreatedAt()));
        return listNoti;
    }
}