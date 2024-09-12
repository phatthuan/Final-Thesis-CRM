package com.crm.personservice.query.projection;

import java.util.ArrayList;
import java.util.List;

import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.personservice.command.data.PersonRepository;
import com.crm.commonservice.model.PersonResponseCommonModel;
import com.crm.commonservice.query.GetDetailsPersonQuery;
import com.crm.personservice.command.data.Person;
import com.crm.personservice.query.model.PersonResponseModel;
import com.crm.personservice.query.queries.GetAllPersonsQuery;
import com.crm.personservice.query.queries.GetPersonQuery;

@Component
public class PersonProjection {
    @Autowired
    private PersonRepository personRepository;

    @QueryHandler
    public PersonResponseModel handle(GetPersonQuery getpersonsQuery) {
        PersonResponseModel model = new PersonResponseModel();
        Person person = personRepository.getById(getpersonsQuery.getId());
        BeanUtils.copyProperties(person, model);

        return model;
    }

    @QueryHandler
    List<PersonResponseModel> handle(GetAllPersonsQuery getAllpersonsQuery) {
        List<Person> listEntity = personRepository.findAll();
        List<PersonResponseModel> listperson = new ArrayList<>();
        listEntity.forEach(s -> {
            PersonResponseModel model = new PersonResponseModel();
            BeanUtils.copyProperties(s, model);
            listperson.add(model);
        });
        listperson.sort((x1, x2) -> x2.getCreatedAt().compareTo(x1.getCreatedAt()));
        return listperson;
    }

    @QueryHandler
    public PersonResponseCommonModel handle(GetDetailsPersonQuery getpersonsQuery) {
        PersonResponseCommonModel model = new PersonResponseCommonModel();
        Person person = personRepository.getById(getpersonsQuery.getId());
        BeanUtils.copyProperties(person, model);

        return model;
    }

}
