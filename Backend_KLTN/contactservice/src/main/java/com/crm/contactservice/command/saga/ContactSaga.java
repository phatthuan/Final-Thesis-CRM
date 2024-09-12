package com.crm.contactservice.command.saga;

import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.modelling.saga.SagaEventHandler;
import org.axonframework.modelling.saga.SagaLifecycle;
import org.axonframework.modelling.saga.StartSaga;
import org.axonframework.queryhandling.QueryGateway;
import org.axonframework.spring.stereotype.Saga;
import org.springframework.beans.factory.annotation.Autowired;

import com.crm.commonservice.command.DeleteLeadCommonCommand;
import com.crm.contactservice.command.command.DeleteContactCommand;
import com.crm.contactservice.command.event.LeadToContactConvertedEvent;

@Saga
public class ContactSaga {
    @Autowired
    private transient CommandGateway commandGateway;

    @Autowired
    private transient QueryGateway queryGateway;

    @StartSaga
    @SagaEventHandler(associationProperty = "id")
    private void handle(LeadToContactConvertedEvent event) {
        try {
            SagaLifecycle.associateWith("id", event.getId());
            DeleteLeadCommonCommand command = new DeleteLeadCommonCommand(event.getLeadId());
            commandGateway.sendAndWait(command);
            SagaLifecycle.end();

        } catch (Exception e) {
            System.out.println(e.getMessage());
            DeleteContactCommand command = new DeleteContactCommand(event.getId());
            commandGateway.sendAndWait(command);
            SagaLifecycle.end();
        }
    }
}
