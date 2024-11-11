package com.example.backend.controller.api.backoffice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.model.responsavel.Responsavel;
import com.example.backend.repository.responsavel.ResponsavelRepository;

@Controller
@RequestMapping("/responsaveis")
public class ResponsaveisBackofficeController {

    @Autowired
    private ResponsavelRepository responsaveisRepository;

    @GetMapping
    public String responsaveisPage(Model model) {
        model.addAttribute("responsaveis", responsaveisRepository.findAll());
        return "listaResponsaveis.html";
    }

    @GetMapping("{id}")
    public String responsavelPage(@PathVariable Long id, Model model) {
        model.addAttribute("responsavel", responsaveisRepository.findById(id));
        return "responsavel.html";
    }

    @PutMapping("{id}")
    public String atualizarReponsavel(@PathVariable Long id, @ModelAttribute Responsavel responsavel) {

        responsaveisRepository.save(responsavel);

        return "redirect:/responsaveis";
    }

    @DeleteMapping("{id}")
    public String removerResponsavel(@PathVariable Long id) {
        responsaveisRepository.deleteById(id);
        return "redirect:/responsaveis";
    }

}
