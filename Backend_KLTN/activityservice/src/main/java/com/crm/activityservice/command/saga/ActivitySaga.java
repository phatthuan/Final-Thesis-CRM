package com.crm.activityservice.command.saga;

import java.util.UUID;

import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.modelling.saga.SagaEventHandler;
import org.axonframework.modelling.saga.SagaLifecycle;
import org.axonframework.modelling.saga.StartSaga;
import org.axonframework.queryhandling.QueryGateway;
import org.axonframework.spring.stereotype.Saga;
import org.springframework.beans.factory.annotation.Autowired;

import com.crm.activityservice.command.command.CreateActivityCommand;
import com.crm.activityservice.command.event.EmailSentEvent;
import com.crm.commonservice.model.UserResponseCommonModel;
import com.crm.commonservice.query.GetDetailsUserQuery;

@Saga
public class ActivitySaga {
    @Autowired
    private transient CommandGateway commandGateway;

    @Autowired
    private transient QueryGateway queryGateway;

    @StartSaga
    @SagaEventHandler(associationProperty = "id")
    private void handle(EmailSentEvent event) {
        try {
            SagaLifecycle.associateWith("id", event.getId());
            CreateActivityCommand createActivityCommand = new CreateActivityCommand(
            UUID.randomUUID().toString(),
            event.getTitle(),
            "email",
            event.getComment(),
            null,
            null,
            true,
            null,
            null,
            event.getSendToEmail()
        );
        commandGateway.sendAndWait(createActivityCommand);
        SagaLifecycle.end();

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
