package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.backend.repository.operador.OperadorRepository;
import com.example.backend.security.UsuarioRepository;

@SpringBootApplication
public class ServerApplication {

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private OperadorRepository operadorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

}
