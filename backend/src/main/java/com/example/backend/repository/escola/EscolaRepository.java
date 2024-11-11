package com.example.backend.repository.escola;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.backend.model.escola.Escola;

public interface EscolaRepository extends JpaRepository<Escola, Long> {
    List<Escola> findByIdIn(List<Long> escolaId);

}
