import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListarClientes() {
  const [client, setClient] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [utensils, setUtensils] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedClients = [...client].sort((a, b) => {
    let valA = a[sortField] || "";
    let valB = b[sortField] || "";
    if (sortField === "rentedItems") {
      valA = getRentedItems(a.id).length;
      valB = getRentedItems(b.id).length;
    }
    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();
    if (valA < valB) {
      return sortAsc ? -1 : 1;
    }
    if (valA > valB) {
      return sortAsc ? 1 : -1;
    }
    return 0;
  });



  return (
    <div className="page-container">
      <div className="page-header">
        <h2>👨‍👩‍👧‍👦 Clientes Cadastrados</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Voltar
        </button>
      </div>
      
      <div className="list-container">
        {client.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'var(--muted-color)' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
            <h3>Nenhum cliente cadastrado</h3>
            <p>Cadastre o primeiro cliente para começar.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>Nome</th>
                <th onClick={() => handleSort("phone")}>Telefone</th>
                <th onClick={() => handleSort("email")}>Email</th>
                <th onClick={() => handleSort("address")}>Endereço</th>
                <th onClick={() => handleSort("description")}>Anotação</th>
                <th onClick={() => handleSort("rentedItems")}>Itens Alugados</th>
              </tr>
            </thead>
            <tbody>
              {sortedClients.map(cliente => {
                const rentedItems = getRentedItems(cliente.id);
                
                return (
                  <tr key={cliente.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>👤</span>
                        <strong>{cliente.name}</strong>
                      </div>
                    </td>
                    <td>
                      <a 
                        href={`tel:${cliente.phone}`}
                        style={{ 
                          color: 'var(--primary-blue)',
                          textDecoration: 'none'
                        }}
                      >
                        {cliente.phone}
                      </a>
                    </td>
                    <td>
                      <a 
                        href={`mailto:${cliente.email}`}
                        style={{ 
                          color: 'var(--primary-blue)',
                          textDecoration: 'none'
                        }}
                      >
                        {cliente.email}
                      </a>
                    </td>
                    <td>
                      <span style={{ color: 'var(--secondary-color)' }}>
                        📍 {cliente.address}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        background: 'var(--accent-bg)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.875rem'
                      }}>
                        {cliente.description || 'Nenhuma anotação'}
                      </span>
                    </td>
                    <td>
                      {rentedItems.length > 0 ? (
                        <div style={{ maxWidth: '200px' }}>
                          {rentedItems.map((item, index) => (
                            <span 
                              key={index}
                              style={{
                                display: 'inline-block',
                                background: 'var(--accent-bg)',
                                padding: '0.25rem 0.5rem',
                                margin: '0.125rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem'
                              }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--muted-color)', fontStyle: 'italic' }}>
                          Nenhum item alugado
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ListarClientes;