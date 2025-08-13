
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import Painel from "./Painel";
import CadastroItem from "./cadastrarItem";
import CadastroCliente from "./cadastrarClientes";
import RegistrarAluguel from "./RegistrarAluguel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);
  if (!user) return <Login onLogin={() => {}} />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Painel onLogout={() => setUser(null)} />} />
        <Route path="/cadastrar-item" element={<CadastroItem />} />
        <Route path="/registrar-aluguel" element={<RegistrarAluguel />} />
        <Route path="/cadastrar-cliente" element={<CadastroCliente />} />
      </Routes>
    </Router>
  );
}

export default App;
