package com.painel.buffet.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UtensilsDTO {

   // @NotBlank(message = "O id não pode estar em branco")
    private String id;
    @NotBlank(message = "O nome não pode estar em branco")
    private String name;
    @NotBlank(message = "O tipo não pode estar em branco")
    private String type;
    @NotBlank(message = "A quantidade não pode estar em branco")
    private int quantity;
    private int availableQuantity;
    @NotBlank(message = "O descrição não pode estar em branco")
    private String description;
}
