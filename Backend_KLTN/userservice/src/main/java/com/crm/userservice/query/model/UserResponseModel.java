package com.crm.userservice.query.model;

import java.util.Date;

import org.bson.types.Binary;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseModel {
    private String id;
	private String username;
	private String email;
	private String firstName;
	private String lastName;
	private String phoneNumber;
	private Boolean isActive;
	private Integer role;
    private String imageId;
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Ho_Chi_Minh")
    private Date createdAt;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Ho_Chi_Minh")
    private Date updatedAt;

	private String imageTitle;
	private Binary imageFile;
}
