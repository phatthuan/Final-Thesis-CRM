package com.crm.notificationservice;

import com.crm.notificationservice.configuration.AxonConfig;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.cloud.stream.messaging.Sink;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EnableBinding(Sink.class)
@RequestMapping("/api/v1/notifications")
@EnableDiscoveryClient
@EnableJpaAuditing
@Import({ AxonConfig.class })
public class NotificationserviceApplication {
	private Logger logger = org.slf4j.LoggerFactory.getLogger(NotificationserviceApplication.class);
	private Message lastMessage = null;
	private final ObjectMapper objectMapper = new ObjectMapper();

	@StreamListener(Sink.INPUT)
	public void consumeMessage(Message message) {
		logger.info("Consume Payload: " + message.getId() + " " + message.getMessage());
		lastMessage = message;
	}

	@GetMapping("/messages")
	public ResponseEntity<String> getMessages() {
		try {
			String modelJson = objectMapper.writeValueAsString(lastMessage);
			return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(NotificationserviceApplication.class, args);
	}
}
