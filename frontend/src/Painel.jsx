import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Painel({ onLogout }) {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      title: "👥 Cadastrar Cliente",
      description: "Adicionar novos clientes ao sistema",
      path: "/cadastrar-cliente",
      icon: "👥"
    },
    {
      title: "🍽️ Cadastrar Item",
      description: "Adicionar utensílios ao catálogo",
      path: "/cadastrar-item",
      icon: "🍽️"
    },
    {
      title: "📋 Listar Itens",
      description: "Visualizar todos os utensílios",
      path: "/listar-itens",
      icon: "📋"
    },
    {
      title: "🎉 Registrar Aluguel",
      description: "Criar novo aluguel de itens",
      path: "/registrar-aluguel",
      icon: "🎉"
    },
    {
      title: "📊 Itens Alugados",
      description: "Ver histórico de aluguéis",
      path: "/listar-alugueis",
      icon: "📊"
    },
    {
      title: "👨‍👩‍👧‍👦 Listar Clientes",
      description: "Visualizar todos os clientes",
      path: "/listar-clientes",
      icon: "👨‍👩‍👧‍👦"
    }
  ];

  return (
    <div className="painel-container">
      <div className="painel-header">
        <h2>🏢 Painel de Controle</h2>
        <button 
          className="logout-btn"
          onClick={() => { signOut(auth); onLogout(); }}
        >
          🚪 Sair
        </button>
      </div>
      
      <div className="nav-grid">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className="nav-card"
            onClick={() => navigate(item.path)}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              {item.icon}
            </div>
            <button>{item.title}</button>
            <p style={{ 
              margin: '0.5rem 0 0 0', 
              fontSize: '0.875rem', 
              color: 'var(--muted-color)' 
            }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
