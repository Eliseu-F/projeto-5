package com.example.backend.dto.motorista;


import com.example.backend.dto.endereco.EnderecoDTO;
import com.example.backend.model.endereco.Endereco;
import com.example.backend.security.Role;

import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class MotoristaDTO {

    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private String experiencia;
    private String sobreMim;
    @Lob
    private byte[] imagem;
    private Role role;
    private EnderecoDTO endereco;
    private String cpf;

    public void setEndereco(Endereco endereco) {
        if (endereco != null) {
            this.endereco = new EnderecoDTO(endereco); 
        }
    }

}
