package com.example.backend.dto.usuario;

import java.time.LocalDate;

import com.example.backend.model.endereco.Endereco;
import com.example.backend.security.Role;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class UsuarioDTO {

    private String nome;
    private String email;
    private String senha;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;
    private String cpf;
    private String telefone;
    private Role role;
    private Endereco endereco;
}
