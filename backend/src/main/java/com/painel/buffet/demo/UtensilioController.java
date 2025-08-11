package com.painel.buffet.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/utensilios")
public class UtensilioController {

    @Autowired
    private UtensilioService service;

    @PostMapping
    public String criar(@RequestBody Utensilios utensilio) throws Exception {
        return service.salvar(utensilio);
    }

    @GetMapping("/{id}")
    public Utensilios buscar(@PathVariable String id) throws Exception {
        return service.buscar(id);
    }

    @GetMapping
    public List<Utensilios> listarTodos() throws Exception {
        return service.listarTodos();
    }


}
