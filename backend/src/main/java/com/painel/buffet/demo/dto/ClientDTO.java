package com.painel.buffet.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ClientDTO {

    @NotBlank(message = "O id não pode estar em branco")
    private String id;
    @NotBlank(message = "O nome não pode estar em branco")
    private String nome;
    @NotBlank(message = "O telefone não pode estar em branco")
    private String telefone;
    @NotBlank(message = "O endereço não pode estar em branco")
    private String address;



}
