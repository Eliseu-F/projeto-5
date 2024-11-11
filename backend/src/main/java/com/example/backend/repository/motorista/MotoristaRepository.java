package com.example.backend.repository.motorista;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.motorista.Motorista;

public interface MotoristaRepository extends JpaRepository<Motorista, Long> {
    Optional<Motorista> findByUsuarioId(Long usuarioId);
    boolean existsByCpf(String cpf);
}
