package com.painel.buffet.demo.clientes;

import com.painel.buffet.demo.converter.ClientConverter;
import com.painel.buffet.demo.dto.ClientDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/client")
public class ClientController {

    @Autowired
    private ClientService service;

    @Autowired
    private ClientConverter converter;


    @PostMapping
    public ResponseEntity<ClientDTO> create(@RequestBody ClientDTO dto) throws Exception {

        try{
            Client client = converter.dtoToClient(dto);
            Client CreatedClient = service.create(client);
            ClientDTO clientDto = converter.clientToDTO(CreatedClient);
            return  ResponseEntity.status(HttpStatus.CREATED).body(clientDto);
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
        }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> getById(@PathVariable String id) throws Exception {
        Client client = service.getById(id);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }
        ClientDTO dto = converter.clientToDTO(client);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<ClientDTO>> getAll() throws Exception {
        List<Client> client = service.getAll();
        List<ClientDTO> clientDTO = converter.clientToDTOList(client);
        return  ResponseEntity.ok(clientDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDTO> update(@PathVariable String id, @RequestBody ClientDTO dto ) throws Exception {
        try{
            dto.setId(id);
            Client client = converter.dtoToClient(dto);
            Client updatedClient = service.update(client,id);
            ClientDTO clientDto = converter.clientToDTO(updatedClient);
            return  ResponseEntity.ok(clientDto);

        } catch(Exception e){
            return ResponseEntity.status(404).build();
        }
    }
//    tbm é possivel fazer da forma abaixo. A principal diferença é que ele utilizar o toDTO ao invés do toDTOList
//    @GetMapping
//    public ResponseEntity<List<ClientDTO>> getAll() throws Exception {
//        List<Client> clients = service.getAll();
//        List<ClientDTO> dtos = clients.stream()
//                .map(converter::toDto)
//                .collect(Collectors.toList());
//        return ResponseEntity.ok(dtos);
//    }


}
