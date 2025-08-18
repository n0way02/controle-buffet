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
    private String description;
    @NotBlank(message = "O preço não pode estar em branco")
    private double price;
    @NotBlank(message = "A data de aluguel não pode estar em branco")
    private String rentalDate;
    @NotBlank(message = "A data de devolução não pode estar em branco")
    private String returnDate;
}
