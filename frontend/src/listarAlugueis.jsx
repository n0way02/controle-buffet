import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListarAlugueis() {
  const [alugueis, setAlugueis] = useState([]);
  const [clientes, setClientes] = useState([]);
    const [utensils, setUtensils] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/rentals")
      .then(res => setAlugueis(res.data))
      .catch(() => setAlugueis([]));
    axios.get("http://localhost:8080/client")
      .then(res => setClientes(res.data))
      .catch(() => setClientes([]));
    axios.get("http://localhost:8080/utensils")
      .then(res => setUtensils(res.data))
      .catch(() => setUtensils([]));
  }, []);

  // Função para pegar o nome do cliente pelo ID
  const getClienteNome = (id) => {
    const cliente = clientes.find(c => c.id === id);
    return cliente ? cliente.name : id;
  };

  const getUtensilName = (id) => {
    const utensil = utensils.find(u => u.id === id);
    return utensil ? utensil.name : id;
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>Voltar</button>
      <h2>Aluguéis registrados</h2>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Item ID</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {alugueis.map(aluguel => (
            <tr key={aluguel.id}>
              <td>{getClienteNome(aluguel.clientId)}</td>
              <td>{getUtensilName(aluguel.utensilId)}</td>
              <td>{aluguel.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarAlugueis;