package com.painel.buffet.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RentalsDTO {

   // @NotBlank(message = "O id não pode estar em branco")
    private String id;
    private String clientId;
    private String utensilId;
    @NotBlank(message = "A quantidade não pode estar em branco")
    private int quantity;
    private boolean rented = false;
    private String rentedBy = "";
    @NotBlank(message = "O descrição não pode estar em branco")
    private String description;
}
