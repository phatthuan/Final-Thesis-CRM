package com.crm.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.userservice.DTO.UserDTO;
import com.crm.userservice.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private ObjectMapper objectMapper;

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody UserDTO dto) {
		if (dto.getEmail() == null || dto.getPassword() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("{\"status\": \"error\", \"message\": \"Missing email or password.\"}");
		}
		if (dto.getEmail().isEmpty() || dto.getPassword().isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("{\"status\": \"error\", \"message\": \"Missing email or password\"}");
		}
		try {
			UserDTO user = userService.login(dto.getEmail(), dto.getPassword());
			if (user == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body("{\"status\": \"error\", \"message\": \"User not found\"}");
			}
			String modelJson = objectMapper.writeValueAsString(user);
			return ResponseEntity.ok().body("{\"status\": \"success\", \"data\": " + modelJson + "}");
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("{\"status\": \"error\", \"message\": \"Error processing JSON\"}");
		}
	}
}
