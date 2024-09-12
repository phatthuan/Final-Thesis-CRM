package com.crm.userservice.command.event;


import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.crm.userservice.command.data.User;
import com.crm.userservice.command.data.UserRepository;

@Component
public class UserEventsHandler {
    @Autowired
    private UserRepository UserRepository;

    @Autowired
	private PasswordEncoder passwordEncoder;

    @EventHandler
    public void on(UserCreatedEvent event) {
        User User = new User();
        event.setPassword(passwordEncoder.encode(event.getPassword()));
        BeanUtils.copyProperties(event, User);
        UserRepository.save(User);
    }

    @EventHandler
    public void on(UserUpdatedEvent event) {
        User User = UserRepository.getById(event.getId());
        User.setUsername(event.getUsername());
        User.setEmail(event.getEmail());
        User.setFirstName(event.getFirstName());
        User.setLastName(event.getLastName());
        User.setPhoneNumber(event.getPhoneNumber());
        User.setRole(event.getRole());
        User.setImageId(event.getImageId());
        UserRepository.save(User);
    }

    @EventHandler
    public void on(UserDeletedEvent event) {
        UserRepository.deleteById(event.getId());
    }
}
