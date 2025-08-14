import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListarItens() {
  const [itens, setItens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/utensils")
      .then(res => setItens(res.data))
      .catch(() => setItens([]));
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/")}>Voltar</button>
      <h2>Itens cadastrados</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Quantidade total</th>
            <th>Disponível</th>
          </tr>
        </thead>
        <tbody>
          {itens.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.quantity}</td>
              <td>{item.availableQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarItens;