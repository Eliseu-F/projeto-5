package com.example.backend.repository.ausencia;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.ausencia.Ausencia;

public interface AusenciaRepository extends JpaRepository<Ausencia, Long>{
    List<Ausencia> findByCriancaId(Long criancaId);

}
