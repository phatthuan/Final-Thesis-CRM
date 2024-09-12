package com.crm.leadservice.query.projection;

import java.util.ArrayList;
import java.util.List;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.leadservice.command.data.LeadRepository;
import com.crm.commonservice.model.PersonResponseCommonModel;
import com.crm.commonservice.query.GetDetailsPersonQuery;
import com.crm.leadservice.command.data.Lead;
import com.crm.leadservice.query.model.LeadResponseModel;
import com.crm.leadservice.query.queries.GetAllLeadsQuery;
import com.crm.leadservice.query.queries.GetLeadQuery;

@Component
public class LeadProjection {
    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private QueryGateway queryGateway;

    @QueryHandler
    public LeadResponseModel handle(GetLeadQuery getleadsQuery) {
        LeadResponseModel model = new LeadResponseModel();
        Lead lead = leadRepository.getById(getleadsQuery.getId());
        BeanUtils.copyProperties(lead, model);
        if (getleadsQuery.getId() == null) {
            throw new IllegalStateException("Lead not found");
        }

        if (model.getPersonId() != null && !model.getPersonId().isEmpty()) {
            GetDetailsPersonQuery personQuery =  new GetDetailsPersonQuery(model.getPersonId());

            if (personQuery != null) {
                PersonResponseCommonModel personResponseCommonModel = queryGateway.query(personQuery, ResponseTypes.instanceOf(PersonResponseCommonModel.class)).join();
                model.setPersonName(personResponseCommonModel.getName());
                model.setEmail(personResponseCommonModel.getEmails());
                model.setContactNumbers(personResponseCommonModel.getContactNumbers());
            }
        }

        return model;
    }

    @QueryHandler
    List<LeadResponseModel> handle(GetAllLeadsQuery getAllleadsQuery) {
        List<Lead> listEntity = leadRepository.findAll();
        List<LeadResponseModel> listlead = new ArrayList<>();
        listEntity.forEach(s -> {
            LeadResponseModel model = new LeadResponseModel();
            BeanUtils.copyProperties(s, model);
            if (model.getPersonId() != null && !model.getPersonId().isEmpty()) {
                GetDetailsPersonQuery personQuery =  new GetDetailsPersonQuery(model.getPersonId());
    
                if (personQuery != null) {
                    PersonResponseCommonModel personResponseCommonModel = queryGateway.query(personQuery, ResponseTypes.instanceOf(PersonResponseCommonModel.class)).join();
                    model.setPersonName(personResponseCommonModel.getName());
                    model.setEmail(personResponseCommonModel.getEmails());
                    model.setContactNumbers(personResponseCommonModel.getContactNumbers());
                }
            }
            listlead.add(model);
        });
        listlead.sort((x1, x2) -> x2.getCreatedAt().compareTo(x1.getCreatedAt()));
        return listlead;
    }

}
