package com.example.backend.repository.endereco;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.endereco.Endereco;
public interface EnderecoRepository extends JpaRepository<Endereco, Long>{
    
}