package com.crm.ticketservice.command.saga;

import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.modelling.saga.EndSaga;
import org.axonframework.modelling.saga.SagaEventHandler;
import org.axonframework.modelling.saga.SagaLifecycle;
import org.axonframework.modelling.saga.StartSaga;
import org.axonframework.queryhandling.QueryGateway;
import org.axonframework.spring.stereotype.Saga;
import org.springframework.beans.factory.annotation.Autowired;

import com.crm.commonservice.model.UserResponseCommonModel;
import com.crm.commonservice.query.GetDetailsUserQuery;
import com.crm.ticketservice.command.command.DeleteTicketCommand;
import com.crm.ticketservice.command.command.SendMessageCommand;
import com.crm.ticketservice.command.event.TicketCreatedEvent;
import com.crm.ticketservice.command.event.TicketDeletedEvent;

@Saga
public class TicketSaga {
    @Autowired
    private transient CommandGateway commandGateway;

    @Autowired
    private transient QueryGateway queryGateway;

    @StartSaga
    @SagaEventHandler(associationProperty = "id")
    private void handle(TicketCreatedEvent event) {
        try {
            SagaLifecycle.associateWith("id", event.getId());

            if (event.getAssignedToUserId() != null && !event.getAssignedToUserId().isEmpty()) {
                GetDetailsUserQuery getDetailsUserQuery = new GetDetailsUserQuery(event.getAssignedToUserId());

                UserResponseCommonModel userResponseModel = queryGateway.query(getDetailsUserQuery,
                        ResponseTypes.instanceOf(UserResponseCommonModel.class))
                        .join();
                if (userResponseModel.getIsActive() == true) {
                    SendMessageCommand command = new SendMessageCommand(event.getId(), "A new ticket has been created");
                    commandGateway.sendAndWait(command);
                    SagaLifecycle.end();
                } else {
                    DeleteTicketCommand command = new DeleteTicketCommand(event.getId());
                    commandGateway.sendAndWait(command);
                    SendMessageCommand commandMessage = new SendMessageCommand(event.getId(),
                            "Staff is currently inactive");
                    commandGateway.sendAndWait(commandMessage);
                    SagaLifecycle.end();
                }
            }else{
                SendMessageCommand command = new SendMessageCommand(event.getId(), "A new ticket has been created");
                commandGateway.sendAndWait(command);
                SagaLifecycle.end();
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
