package com.microlearning.backend.service;

import java.util.Optional; // <--- Import this!

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.microlearning.backend.entity.User;
import com.microlearning.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {
        // Encrypt the password before saving to DB
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // --- ADD THIS METHOD ---
    // This allows the AuthController to find the user and check their role
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}