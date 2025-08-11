import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function Painel({ onLogout }) {
  return (
    <div className="painel-container">
      <button onClick={() => { signOut(auth); onLogout(); }}>Sair</button>
      <h2>Painel de Controle</h2>
      <ul>
        <li><a href="#">Cadastrar Cliente</a></li>
        <li><a href="#">Cadastrar Item</a></li>
        <li><a href="#">Listar Itens</a></li>
        <li><a href="#">Itens Alugados</a></li>
      </ul>
      {/* Aqui você pode renderizar os formulários e listas conforme a opção escolhida */}
    </div>
  );
}
