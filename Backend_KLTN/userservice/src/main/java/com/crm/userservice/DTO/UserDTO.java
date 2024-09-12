package com.crm.userservice.DTO;

import com.crm.userservice.command.data.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	private String id;
	private String username;
	private String password;
	private String email;
	private String firstName;
	private String lastName;
	private String phoneNumber;
	private boolean isActive;
	private String token;
	private String refreshtoken;
	private Integer role;
    private String imageId;
	

	public static UserDTO entityToDTO(User user){
		UserDTO userDTO = new UserDTO();
		userDTO.setId(user.getId());
		userDTO.setUsername(user.getUsername());
		userDTO.setPassword(user.getPassword());
		userDTO.setEmail(user.getEmail());
		userDTO.setFirstName(user.getFirstName());
		userDTO.setLastName(user.getLastName());
		userDTO.setPhoneNumber(user.getPhoneNumber());
		userDTO.setActive(user.getIsActive());
		userDTO.setRole(user.getRole());
		userDTO.setImageId(user.getImageId());
		return userDTO;
	}
	public static User dtoToEntity(UserDTO dto){
		User user = new User();
		user.setId(dto.getId());
		user.setUsername(dto.getUsername());
		user.setPassword(dto.getPassword());
		user.setEmail(dto.getEmail());
		user.setFirstName(dto.getFirstName());
		user.setLastName(dto.getLastName());
		user.setPhoneNumber(dto.getPhoneNumber());
		user.setIsActive(dto.isActive());
		user.setRole(dto.getRole());
		user.setImageId(dto.getImageId());
		return user;
	}
}
