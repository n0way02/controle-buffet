package com.painel.buffet.demo.converter;

import com.painel.buffet.demo.clientes.Client;
import com.painel.buffet.demo.dto.ClientDTO;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class ClientConverter {

    public Client dtoToClient(ClientDTO dto){
        Client client = new Client();
        client.setAddress(dto.getAddress());
        // client.setId(dto.getId());
        client.setPhone(dto.getPhone());
        client.setName(dto.getName());
        client.setDescription(dto.getDescription());
        client.setEmail(dto.getEmail());

        return client;
    }

    public ClientDTO clientToDTO(Client client){
        ClientDTO dto = new ClientDTO();
        dto.setAddress(client.getAddress());
        dto.setId(client.getId());
        dto.setPhone(client.getPhone());
        dto.setName(client.getName());
        dto.setDescription(client.getDescription());
        dto.setEmail(client.getEmail());

        return dto;
    }

    public List<Client> dtoToClientList(List<ClientDTO> dtoList){
        List<Client> clientList = new ArrayList<>();
        for (ClientDTO dto: dtoList){
            Client client = dtoToClient(dto);
            clientList.add(client);
        }
        return clientList;
    }

    public List<ClientDTO> clientToDTOList(List<Client> clientList){
        List<ClientDTO> dtoList = new ArrayList<>();
        for (Client client: clientList){
            ClientDTO dto =  clientToDTO(client);
            dtoList.add(dto);
        }
        return dtoList;
    }
}
