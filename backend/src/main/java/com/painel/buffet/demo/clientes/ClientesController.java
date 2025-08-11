package com.painel.buffet.demo.clientes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClientesController {

    @Autowired
    private ClientesService service;

    @PostMapping
    public String criar(@RequestBody Clientes cliente) throws Exception {
        return service.salvar(cliente);
    }

    @GetMapping("/{id}")
    public Clientes buscar(@PathVariable String id) throws Exception {
        return service.buscar(id);
    }

    @GetMapping
    public List<Clientes> listarTodos() throws Exception {
        return service.listarTodos();
    }


}
