package com.crm.userservice.service;

import java.util.Date;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.crm.userservice.DTO.UserDTO;
import com.crm.userservice.command.data.User;
import com.crm.userservice.command.data.UserRepository;

@Service
public class UserService {
    @Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

    public UserDTO login(String email, String password) {
        User user = userRepository.findByEmail(email);
        UserDTO dto = new UserDTO();
        if (user != null) {
            BeanUtils.copyProperties(user, dto);
            if (passwordEncoder.matches(password, dto.getPassword())) {
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                String accessToken = JWT.create()
                        .withSubject(user.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + (48 * 60 * 60 * 1000)))
                        .sign(algorithm);
                String refreshtoken = JWT.create()
                        .withSubject(user.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + (48 * 60 * 60 * 1000)))
                        .sign(algorithm);
                dto.setToken(accessToken);
                dto.setRefreshtoken(refreshtoken);
            } else {
                return null;
            }
        } else {
            return null;
        }
        return dto;
    }
}
