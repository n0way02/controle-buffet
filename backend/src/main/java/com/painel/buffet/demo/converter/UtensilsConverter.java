package com.painel.buffet.demo.converter;

import com.painel.buffet.demo.utensils.Utensils;
import com.painel.buffet.demo.dto.UtensilsDTO;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class UtensilsConverter {

    public Utensils dtoToUtensils(UtensilsDTO dto){
        Utensils utensils = new Utensils();
        utensils.setId(dto.getId());
        utensils.setName(dto.getName());
        utensils.setType(dto.getType());
        utensils.setQuantity(dto.getQuantity());
        utensils.setAvailableQuantity(dto.getAvailableQuantity());
        return utensils;
    }

    public UtensilsDTO utensilsToDTO(Utensils utensils){
        UtensilsDTO dto = new UtensilsDTO();
        dto.setId(utensils.getId());
        dto.setName(utensils.getName());
        dto.setType(utensils.getType());
        dto.setQuantity(utensils.getQuantity());
        dto.setAvailableQuantity(utensils.getAvailableQuantity());
        return dto;
    }

    public List<Utensils> dtoToUtensilsList(List<UtensilsDTO> dtoList){
        List<Utensils> utensilsList = new ArrayList<>();
        for (UtensilsDTO dto: dtoList){
            Utensils utensils = dtoToUtensils(dto);
            utensilsList.add(utensils);
        }
        return utensilsList;
    }

    public List<UtensilsDTO> utensilsToDTOList(List<Utensils> utensilsList){
        List<UtensilsDTO> dtoList = new ArrayList<>();
        for (Utensils utensils: utensilsList){
            UtensilsDTO dto =  utensilsToDTO(utensils);
            dtoList.add(dto);
        }
        return dtoList;
    }
}
