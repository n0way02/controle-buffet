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
    <div className="page-container">
      <div className="page-header">
        <h2>📊 Aluguéis Registrados</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Voltar
        </button>
      </div>
      
      <div className="list-container">
        {alugueis.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'var(--muted-color)' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3>Nenhum aluguel registrado</h3>
            <p>Registre o primeiro aluguel para começar.</p>
          </div>
        ) : (
          <>
            <div style={{ 
              marginBottom: '1.5rem', 
              padding: '1rem', 
              background: 'var(--secondary-bg)', 
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '1rem',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '1.5rem', color: 'var(--primary-blue)' }}>
                    {alugueis.length}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--muted-color)' }}>
                    Total de Aluguéis
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', color: 'var(--success-green)' }}>
                    {[...new Set(alugueis.map(a => a.clientId))].length}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--muted-color)' }}>
                    Clientes Ativos
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', color: 'var(--warning-orange)' }}>
                    {alugueis.reduce((sum, a) => sum + a.quantity, 0)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--muted-color)' }}>
                    Itens Alugados
                  </div>
                </div>
              </div>
            </div>
            
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Item</th>
                  <th>Quantidade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {alugueis.map(aluguel => {
                  const cliente = getClienteNome(aluguel.clientId);
                  const item = getUtensilName(aluguel.utensilId);
                  
                  return (
                    <tr key={aluguel.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.2rem' }}>👤</span>
                          <strong>{cliente}</strong>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.2rem' }}>🍽️</span>
                          <span>{item}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{
                          background: 'var(--accent-bg)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}>
                          {aluguel.quantity}x
                        </span>
                      </td>
                      <td>
                        <span style={{
                          background: 'rgba(221, 107, 32, 0.1)',
                          color: 'var(--warning-orange)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          textTransform: 'uppercase'
                        }}>
                          🔄 Ativo
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default ListarAlugueis;