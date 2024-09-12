package com.crm.personservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.crm.personservice.config.AxonConfig;

@SpringBootApplication
@EnableDiscoveryClient
@EnableJpaAuditing
@Import({ AxonConfig.class })
public class PersonserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PersonserviceApplication.class, args);
	}
}
