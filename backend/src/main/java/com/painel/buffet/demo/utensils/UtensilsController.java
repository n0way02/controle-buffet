package com.painel.buffet.demo.utensils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/utensilios")
public class UtensilsController {

    @Autowired
    private UtensilsService service;

    @PostMapping
    public String criar(@RequestBody Utensils utensilio) throws Exception {
        return service.create(utensilio);
    }

    @GetMapping("/{id}")
    public Utensils buscar(@PathVariable String id) throws Exception {
        return service.getById(id);
    }

    @GetMapping
    public List<Utensils> listarTodos() throws Exception {
        return service.getAll();
    }


}
