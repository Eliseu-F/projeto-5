package com.example.backend.repository.oferta;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.oferta.Oferta;

public interface OfertaRepository extends JpaRepository<Oferta, Long> {
    List<Oferta> findByMotoristaIdOrderByIdDesc(Long motoristaId);

    List<Oferta> findByCriancaId(Long criancaId);

    boolean existsByCriancaId(Long criancaId);

}
