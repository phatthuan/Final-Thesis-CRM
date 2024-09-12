package com.crm.quoteservice.query.projection;

import java.util.ArrayList;
import java.util.List;

import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.quoteservice.command.data.QuoteRepository;
import com.crm.quoteservice.command.data.Quote;
import com.crm.quoteservice.query.model.QuoteResponseModel;
import com.crm.quoteservice.query.queries.GetAllQuotesQuery;
import com.crm.quoteservice.query.queries.GetQuoteQuery;

@Component
public class QuoteProjection {
    @Autowired
    private QuoteRepository quoteRepository;

    @QueryHandler
    public QuoteResponseModel handle(GetQuoteQuery getquotesQuery) {
        QuoteResponseModel model = new QuoteResponseModel();
        Quote quote = quoteRepository.getById(getquotesQuery.getId());
        BeanUtils.copyProperties(quote, model);

        return model;
    }

    @QueryHandler
    List<QuoteResponseModel> handle(GetAllQuotesQuery getAllquotesQuery) {
        List<Quote> listEntity = quoteRepository.findAll();
        List<QuoteResponseModel> listquote = new ArrayList<>();
        listEntity.forEach(s -> {
            QuoteResponseModel model = new QuoteResponseModel();
            BeanUtils.copyProperties(s, model);
            listquote.add(model);
        });
        listquote.sort((x1, x2) -> x2.getCreatedAt().compareTo(x1.getCreatedAt()));
        return listquote;
    }

}
