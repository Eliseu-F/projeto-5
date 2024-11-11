package com.example.backend.repository.escola;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.escola.MotoristaEscola;

public interface MotoristaEscolaRepository extends JpaRepository<MotoristaEscola, Long>{
    List<MotoristaEscola> findByMotoristaId(Long idMotorista);
    List<MotoristaEscola> findByEscolaId(Long idEscola);

    List<MotoristaEscola> findByMotoristaIdAndEscolaId(Long motoristaId, Long escolaId);

    void deleteByMotoristaIdAndEscolaId(Long motoristaId, Long escolaId);

}
