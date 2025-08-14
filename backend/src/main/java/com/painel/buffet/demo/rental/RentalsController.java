package com.painel.buffet.demo.rental;

import com.painel.buffet.demo.clientes.Client;
import com.painel.buffet.demo.converter.RentalsConverter;
import com.painel.buffet.demo.dto.ClientDTO;
import com.painel.buffet.demo.dto.RentalsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/rentals")
public class RentalsController {

    @Autowired
    private RentalsService service;

    @Autowired
    private RentalsConverter converter;

    @PostMapping
    public ResponseEntity<RentalsDTO> create(@RequestBody RentalsDTO dto) throws Exception {

        try{
            Rentals rentals = converter.dtoToRentals(dto);
            Rentals createdRentals = service.create(rentals);
            RentalsDTO rentalsDto = converter.rentalsToDTO(createdRentals);
            return  ResponseEntity.status(HttpStatus.CREATED).body(rentalsDto);
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
        }

    @GetMapping("/{id}")
    public ResponseEntity<RentalsDTO> getById(@PathVariable String id) throws Exception {
        Rentals rentals = service.getById(id);
        if (rentals == null) {
            return ResponseEntity.notFound().build();
        }
        RentalsDTO dto = converter.rentalsToDTO(rentals);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<RentalsDTO>> getAll() throws Exception {
        List<Rentals> rentals = service.getAll();
        List<RentalsDTO> rentalsDTO = converter.rentalsToDTOList(rentals);
        return  ResponseEntity.ok(rentalsDTO);
    }


    @PutMapping("/{id}")
    public ResponseEntity<RentalsDTO> update(@PathVariable String id, @RequestBody RentalsDTO dto ) throws Exception {
        try{
            dto.setId(id);
            Rentals rentals = converter.dtoToRentals(dto);
            Rentals updatedRentals = service.update(rentals,id);
            RentalsDTO rentalsDTO = converter.rentalsToDTO(updatedRentals);
            return  ResponseEntity.ok(rentalsDTO);

        } catch(Exception e){
            return ResponseEntity.status(404).build();
        }
    }
}