package com.crm.contactservice.query.projection;

import java.util.ArrayList;
import java.util.List;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.contactservice.command.data.ContactRepository;
import com.crm.commonservice.model.PersonResponseCommonModel;
import com.crm.commonservice.query.GetDetailsPersonQuery;
import com.crm.contactservice.command.data.Contact;
import com.crm.contactservice.query.model.ContactResponseModel;
import com.crm.contactservice.query.queries.GetAllContactsQuery;
import com.crm.contactservice.query.queries.GetContactQuery;

@Component
public class ContactProjection {
    @Autowired
    private ContactRepository ContactRepository;

    @Autowired
    private QueryGateway queryGateway;

    @QueryHandler
    public ContactResponseModel handle(GetContactQuery getContactsQuery) {
        ContactResponseModel model = new ContactResponseModel();
        Contact Contact = ContactRepository.getById(getContactsQuery.getId());
        BeanUtils.copyProperties(Contact, model);

        if (getContactsQuery.getId() == null) {
            throw new IllegalStateException("Lead not found");
        }

        if (model.getPersonId() != null && !model.getPersonId().isEmpty()) {
            GetDetailsPersonQuery personQuery = new GetDetailsPersonQuery(model.getPersonId());

            if (personQuery != null) {
                PersonResponseCommonModel personResponseCommonModel = queryGateway
                        .query(personQuery, ResponseTypes.instanceOf(PersonResponseCommonModel.class)).join();
                model.setPersonName(personResponseCommonModel.getName());
                model.setEmail(personResponseCommonModel.getEmails());
                model.setContactNumbers(personResponseCommonModel.getContactNumbers());
            }
        }
        return model;
    }

    @QueryHandler
    List<ContactResponseModel> handle(GetAllContactsQuery getAllContactsQuery) {
        List<Contact> listEntity = ContactRepository.findAll();
        List<ContactResponseModel> listContact = new ArrayList<>();
        listEntity.forEach(s -> {
            ContactResponseModel model = new ContactResponseModel();
            BeanUtils.copyProperties(s, model);
            if (model.getPersonId() != null && !model.getPersonId().isEmpty()) {
                GetDetailsPersonQuery personQuery = new GetDetailsPersonQuery(model.getPersonId());

                if (personQuery != null) {
                    PersonResponseCommonModel personResponseCommonModel = queryGateway
                            .query(personQuery, ResponseTypes.instanceOf(PersonResponseCommonModel.class)).join();
                    model.setPersonName(personResponseCommonModel.getName());
                    model.setEmail(personResponseCommonModel.getEmails());
                    model.setContactNumbers(personResponseCommonModel.getContactNumbers());
                }
            }
            listContact.add(model);
            listContact.sort((x1, x2) -> x2.getCreatedAt().compareTo(x1.getCreatedAt()));
        });
        return listContact;
    }

}
