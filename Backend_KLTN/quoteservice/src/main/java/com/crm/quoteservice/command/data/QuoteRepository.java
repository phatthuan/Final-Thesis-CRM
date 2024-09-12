package com.crm.quoteservice.command.data;


import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, String> {
}
