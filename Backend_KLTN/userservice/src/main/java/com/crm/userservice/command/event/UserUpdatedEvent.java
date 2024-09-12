package com.crm.userservice.command.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdatedEvent {
    private String id;
	private String username;
	private String email;
	private String firstName;
	private String lastName;
	private String phoneNumber;
	private Integer role;
    private String imageId;
}
