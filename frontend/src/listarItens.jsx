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
    <div className="page-container">
      <div className="page-header">
        <h2>📋 Itens Cadastrados</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Voltar
        </button>
      </div>
      
      <div className="list-container">
        {itens.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'var(--muted-color)' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <h3>Nenhum item cadastrado</h3>
            <p>Cadastre o primeiro item para começar.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Quantidade Total</th>
                <th>Disponível</th>
              </tr>
            </thead>
            <tbody>
              {itens.map(item => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>
                    <span style={{
                      background: 'var(--accent-bg)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.875rem'
                    }}>
                      {item.type}
                    </span>
                  </td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <span style={{
                      color: item.availableQuantity > 0 ? 'var(--success-green)' : 'var(--danger-red)',
                      fontWeight: '600'
                    }}>
                      {item.availableQuantity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ListarItens;