package com.microlearning.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                // 1. Open Endpoints (Login/Register)
                .requestMatchers("/api/auth/**").permitAll()
                
                // 2. ADMIN ONLY Rules (Create & Delete Content)
                .requestMatchers(HttpMethod.POST, "/api/topics/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/topics/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/topics/**").hasAuthority("ADMIN")
                
                // Only Admins can ADD questions or DELETE them
                .requestMatchers(HttpMethod.POST, "/api/quizzes/*/questions").hasAuthority("ADMIN") 
                .requestMatchers(HttpMethod.DELETE, "/api/quizzes/**").hasAuthority("ADMIN")

                // 3. SHARED Rules (Students needs these!)
                // ALLOW students to VIEW quiz questions (GET)
                .requestMatchers(HttpMethod.GET, "/api/quizzes/*/questions").authenticated()
                
                // ALLOW students to SUBMIT quiz results (POST)
                .requestMatchers(HttpMethod.POST, "/api/quizzes/*/submit").authenticated()
                
                // ALLOW students to VIEW progress (GET)
                .requestMatchers(HttpMethod.GET, "/api/quizzes/progress").authenticated()
                
                // 4. Catch-all
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}