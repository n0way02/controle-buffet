package com.painel.buffet.demo.rental;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Rentals {
    private String id;
    private String utensilId;
    private int quantity;
    private boolean rented = false;
    private String clientId;
    private double price;
}

