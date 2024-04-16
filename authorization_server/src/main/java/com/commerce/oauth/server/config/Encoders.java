package com.commerce.oauth.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class Encoders {

    @Bean
    @Primary 
    public PasswordEncoder userPasswordEncoder() {
        return new BCryptPasswordEncoder(8);
    }

    @Bean
    public PasswordEncoder oauthClientPasswordEncoder() {
        return new BCryptPasswordEncoder(4);
    }
    
}
