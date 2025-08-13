package com.painel.buffet.demo.converter;

import com.painel.buffet.demo.rental.Rentals;
import com.painel.buffet.demo.dto.RentalsDTO;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class RentalsConverter {

    public Rentals dtoToRentals(RentalsDTO dto){
        Rentals rentals = new Rentals();
        rentals.setId(dto.getId());
        rentals.setClientId(dto.getClientId());
        rentals.setUtensilId(dto.getUtensilId());
        rentals.setQuantity(dto.getQuantity());
        return rentals;
    }

    public RentalsDTO rentalsToDTO(Rentals rentals){
        RentalsDTO dto = new RentalsDTO();
        dto.setId(rentals.getId());
        dto.setClientId(rentals.getClientId());
        dto.setUtensilId(rentals.getUtensilId());
        dto.setQuantity(rentals.getQuantity());
        return dto;
    }

    public List<Rentals> dtoToRentalsList(List<RentalsDTO> dtoList){
        List<Rentals> rentalsList = new ArrayList<>();
        for (RentalsDTO dto: dtoList){
            Rentals rentals = dtoToRentals(dto);
            rentalsList.add(rentals);
        }
        return rentalsList;
    }

    public List<RentalsDTO> rentalsToDTOList(List<Rentals> rentalsList){
        List<RentalsDTO> dtoList = new ArrayList<>();
        for (Rentals rentals: rentalsList){
            RentalsDTO dto =  rentalsToDTO(rentals);
            dtoList.add(dto);
        }
        return dtoList;
    }
}
