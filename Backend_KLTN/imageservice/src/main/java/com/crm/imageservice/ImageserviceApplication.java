package com.crm.imageservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import com.crm.imageservice.config.AxonConfig;
import com.crm.imageservice.config.MongoConfig;

@SpringBootApplication
@EnableDiscoveryClient
@Import({ AxonConfig.class, MongoConfig.class })
public class ImageserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImageserviceApplication.class, args);
	}
}
