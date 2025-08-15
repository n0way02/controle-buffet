package com.painel.buffet.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ClientDTO {

    // @NotBlank(message = "O id não pode estar em branco")
    private String id;
    @NotBlank(message = "O nome não pode estar em branco")
    private String name;
    @NotBlank(message = "O telefone não pode estar em branco")
    private String phone;
    @NotBlank(message = "O endereço não pode estar em branco")
    private String address;
    @NotBlank(message = "O email não pode estar em branco")
    private String email;
    private String description;



}
