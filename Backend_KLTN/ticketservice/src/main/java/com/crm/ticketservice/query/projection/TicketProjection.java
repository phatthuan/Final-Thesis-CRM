package com.crm.ticketservice.query.projection;

import java.util.ArrayList;
import java.util.List;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.ticketservice.command.data.TicketRepository;
import com.crm.ticketservice.command.data.Ticket;
import com.crm.ticketservice.query.model.TicketResponseModel;
import com.crm.ticketservice.query.queries.GetAllTicketsQuery;
import com.crm.ticketservice.query.queries.GetTicketQuery;
import com.crm.commonservice.query.GetDetailsUserQuery;
import com.crm.commonservice.model.UserResponseCommonModel;

@Component
public class TicketProjection {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
	private QueryGateway queryGateway;

    @QueryHandler
    public TicketResponseModel handle(GetTicketQuery getticketsQuery) {
        TicketResponseModel model = new TicketResponseModel();

        if (getticketsQuery.getId() == null) {
            throw new IllegalStateException("Ticket not found");
        }

        Ticket ticket = ticketRepository.getReferenceById(getticketsQuery.getId());
        BeanUtils.copyProperties(ticket, model);

        if (model.getUserId() != null && !model.getUserId().isEmpty()) {
            GetDetailsUserQuery userQuery =  new GetDetailsUserQuery(model.getUserId());

            if (userQuery != null) {
                UserResponseCommonModel requester = queryGateway.query(userQuery, ResponseTypes.instanceOf(UserResponseCommonModel.class)).join();
                model.setRequester(requester.getFirstName()+" "+requester.getLastName());
                model.setRequesterEmail(requester.getEmail());
            }
        }

        if (model.getAssignedToUserId() != null && !model.getAssignedToUserId().isEmpty()) {
            GetDetailsUserQuery userQuery =  new GetDetailsUserQuery(model.getAssignedToUserId());
            if(userQuery != null){
                UserResponseCommonModel receiver = queryGateway.query(userQuery, ResponseTypes.instanceOf(UserResponseCommonModel.class)).join();
                model.setReceiver(receiver.getFirstName()+" "+receiver.getLastName());
                model.setReceiverEmail(receiver.getEmail());
            }
        }

        return model;
    }

    @QueryHandler
    List<TicketResponseModel> handle(GetAllTicketsQuery getAllticketsQuery) {
        List<Ticket> listEntity = ticketRepository.findAll();
        List<TicketResponseModel> listTicket = new ArrayList<>();
        listEntity.forEach(s -> {
            TicketResponseModel model = new TicketResponseModel();
            BeanUtils.copyProperties(s, model);
            if (model.getUserId() != null && !model.getUserId().isEmpty()) {
                GetDetailsUserQuery userQuery =  new GetDetailsUserQuery(model.getUserId());
                
                if (userQuery != null) {
                    UserResponseCommonModel requester = queryGateway.query(userQuery, ResponseTypes.instanceOf(UserResponseCommonModel.class)).join();
                    model.setRequester(requester.getFirstName()+" "+requester.getLastName());
                    model.setRequesterEmail(requester.getEmail());
                }
            }
            
            if (model.getAssignedToUserId() != null && !model.getAssignedToUserId().isEmpty()) { 
                GetDetailsUserQuery userQuery =  new GetDetailsUserQuery(model.getAssignedToUserId());
                
                if (userQuery != null) {
                    UserResponseCommonModel receiver = queryGateway.query(userQuery, ResponseTypes.instanceOf(UserResponseCommonModel.class)).join();
                    model.setReceiver(receiver.getFirstName()+" "+receiver.getLastName());
                    model.setReceiverEmail(receiver.getEmail());
                }
            }

            listTicket.add(model);
            listTicket.sort((x1, x2) -> x2.getCreatedAt().compareTo(x1.getCreatedAt()));
        });
        return listTicket;
    }

}