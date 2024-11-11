package com.example.backend.model.motorista;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import com.example.backend.model.endereco.Endereco;
import com.example.backend.model.escola.Escola;
import com.example.backend.model.imagem.Imagem;
import com.example.backend.model.van.Van;
import com.example.backend.security.Usuario;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Motorista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String nome;
    private String email;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;
    private String cpf;
    private String telefone;
    private String status;
    private Integer idade;
    private String experiencia;
    private String sobreMim;

    @OneToOne
    private Usuario usuario;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "endereco_id")
    private Endereco endereco;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "imagem_id")
    private Imagem imagem;

    @ManyToMany
    @JoinTable(name = "motorista_escolas", // Nome da tabela de junção
            joinColumns = @JoinColumn(name = "motorista_id"), // Coluna para o motorista
            inverseJoinColumns = @JoinColumn(name = "escola_id") // Coluna para a escola
    )
    private List<Escola> escolas;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "van_id")
    private Van van;

    public String getExperiencia() {
        return experiencia;
    }

    public void setExperiencia(String experiencia) {
        this.experiencia = experiencia;
    }

    public String getSobreMim() {
        return sobreMim;
    }

    public void setSobreMim(String sobreMim) {
        this.sobreMim = sobreMim;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<Escola> getEscolas() {
        return escolas;
    }

    public void setEscolas(List<Escola> escolas) {
        this.escolas = escolas;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    @Override
    public String toString() {
        return "Motorista [id=" + id + ", nome=" + nome + ", email=" + email + ", data_nascimento=" + dataNascimento
                + ", cpf=" + cpf
                + ", telefone=" + telefone + ", status=" + status + ", endereco: " + endereco + ", imagem: " + imagem
                + "]";
    }

    public Integer getIdade() {
        if (dataNascimento != null) {
            LocalDate today = LocalDate.now();
            return Period.between(dataNascimento, today).getYears();
        }
        return 0;
    }

    public void setIdade(Integer idade) {
        this.idade = idade;
    }

    public Imagem getImagem() {
        return imagem;
    }

    public void setImagem(Imagem imagem) {
        this.imagem = imagem;
    }

    public Van getVan() {
        return van;
    }

    public void setVan(Van van) {
        this.van = van;
    }

    

}
