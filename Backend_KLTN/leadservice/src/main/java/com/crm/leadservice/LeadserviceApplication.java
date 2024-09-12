package com.crm.leadservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.crm.leadservice.config.AxonConfig;

@SpringBootApplication
@EnableDiscoveryClient
@EnableJpaAuditing
@Import({ AxonConfig.class })
public class LeadserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LeadserviceApplication.class, args);
	}
}
