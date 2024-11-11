package com.example.backend.repository.imagem;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.imagem.Imagem;

public interface ImagemRepository extends JpaRepository<Imagem, Long>{
    boolean existsByNome(String nome);

    Optional<Imagem> findByNome(String nome);

}
