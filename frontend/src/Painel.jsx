import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Painel({ onLogout }) {
  const navigate = useNavigate();
  return (
    <div className="painel-container">
      <button onClick={() => { signOut(auth); onLogout(); }}>Sair</button>
      <h2>Painel de Controle</h2>
      <ul>
        <li><button onClick={() => navigate("/cadastrar-cliente")}>Cadastrar Cliente</button></li>
        <li><button onClick={() => navigate("/cadastrar-item")}>Cadastrar Item</button></li>
        <li><button onClick={() => navigate("/listar-itens")}>Listar Itens</button></li>
        <li><button onClick={() => navigate("/itens-alugados")}>Itens Alugados</button></li>
        <li><button onClick={() => navigate("/registrar-aluguel")}>Registrar Aluguel</button></li>
      </ul>
      {/* Aqui você pode renderizar os formulários e listas conforme a opção escolhida */}
    </div>
  );
}
