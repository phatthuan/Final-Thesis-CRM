package com.crm.userservice.command.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestModel {
    private String id;
	private String username;
	private String password;
	private String email;
	private String firstName;
	private String lastName;
	private String phoneNumber;
	private Boolean isActive;
	private Integer role;
    private String imageId;
}
