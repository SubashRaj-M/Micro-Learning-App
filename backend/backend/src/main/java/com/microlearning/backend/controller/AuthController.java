package com.microlearning.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microlearning.backend.entity.User;
import com.microlearning.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER"); // Default role
        }
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        // 1. Authenticate using Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        if (authentication.isAuthenticated()) {
            // 2. Fetch the full User object from DB to get the Role
            Optional<User> userOpt = userService.findByUsername(loginRequest.getUsername());
            
            if (userOpt.isPresent()) {
                User dbUser = userOpt.get();
                
                // 3. Create a Custom Response with the Role
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login Successful!");
                response.put("username", dbUser.getUsername());
                response.put("role", dbUser.getRole()); // <--- THIS IS THE MISSING KEY
                
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(401).body("Invalid Credentials");
    }
}