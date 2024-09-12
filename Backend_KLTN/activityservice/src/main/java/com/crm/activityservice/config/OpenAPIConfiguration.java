package com.crm.activityservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;


@OpenAPIDefinition
@Configuration
public class OpenAPIConfiguration {
    @Bean
    public OpenAPI publicApi() {
        return new OpenAPI().info(new Info().title("Activity APIs"));
    }
}
