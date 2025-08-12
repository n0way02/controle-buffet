package com.painel.buffet.demo.utensils;

import com.painel.buffet.demo.converter.UtensilsConverter;
import com.painel.buffet.demo.dto.UtensilsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/client")
public class UtensilsController {

    @Autowired
    private UtensilsService service;

    @Autowired
    private UtensilsConverter converter;

    @PostMapping
    public ResponseEntity<UtensilsDTO> create(@RequestBody UtensilsDTO dto) throws Exception {

        try{
            Utensils utensils = converter.dtoToUtensils(dto);
            Utensils createdUtensils = service.create(utensils);
            UtensilsDTO utensilsDto = converter.utensilsToDTO(createdUtensils);
            return  ResponseEntity.status(HttpStatus.CREATED).body(utensilsDto);
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
        }

    @GetMapping("/{id}")
    public ResponseEntity<UtensilsDTO> getById(@PathVariable String id) throws Exception {
        Utensils utensils = service.getById(id);
        if (utensils == null) {
            return ResponseEntity.notFound().build();
        }
        UtensilsDTO dto = converter.utensilsToDTO(utensils);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<UtensilsDTO>> getAll() throws Exception {
        List<Utensils> utensils = service.getAll();
        List<UtensilsDTO> utensilsDTO = converter.utensilsToDTOList(utensils);
        return  ResponseEntity.ok(utensilsDTO);
    }
}