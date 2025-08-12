package com.painel.buffet.demo.converter;

import com.painel.buffet.demo.clientes.Client;
import com.painel.buffet.demo.dto.ClientDTO;

import java.util.ArrayList;
import java.util.List;
public class ClientConverter {

    public Client dtoToClient(ClientDTO dto){
        Client client = new Client();
        client.setAddress(dto.getAddress());
        client.setId(dto.getId());
        client.setTelefone(dto.getTelefone());
        client.setNome(dto.getNome());

        return client;
    }

    public ClientDTO clientToDTO(Client client){
        ClientDTO dto = new ClientDTO();
        dto.setAddress(client.getAddress());
        dto.setId(client.getId());
        dto.setTelefone(client.getTelefone());
        dto.setNome(client.getNome());

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
