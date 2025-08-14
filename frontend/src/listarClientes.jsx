import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListarClientes() {
  const [client, setClient] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [utensils, setUtensils] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/client")
      .then(res => setClient(res.data))
      .catch(() => setClient([]));
    axios.get("http://localhost:8080/rentals")
      .then(res => setRentals(res.data))
      .catch(() => setRentals([]));
    axios.get("http://localhost:8080/utensils")
      .then(res => setUtensils(res.data))
      .catch(() => setUtensils([]));
  }, []);

  const getRentedItems = (clientId) => {
    const clientRentedItems = rentals.filter(r => r.clientId === clientId);
    return clientRentedItems.map(r => {
        const item = utensils.find(u => u.id === r.utensilId);
        return item ? `${item.name} (${r.quantity})` : `ID: ${r.utensilId} (${r.quantity})`;
    });
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>Voltar</button>
      <h2>Clientes Cadastrados</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Itens Alugados</th>
          </tr>
        </thead>
        <tbody>
          {client.map(client => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.phone}</td>
              <td>{client.address}</td>
              <td>
                {getRentedItems(client.id).length > 0 
                ? getRentedItems(client.id).join(", ")
                : "Nenhum item alugado"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarClientes;