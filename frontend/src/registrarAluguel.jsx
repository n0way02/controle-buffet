import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrarAluguel() {
  const [clientes, setClientes] = useState([]);
  const [utensilios, setUtensilios] = useState([]);
  const [clienteId, setClienteId] = useState("");
  const [utensilioId, setUtensilioId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("")
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

const fetchUtensilios = async () => {
  const res = await axios.get("http://localhost:8080/utensils");
  setUtensilios(res.data);
};

useEffect(() => {
  axios.get("http://localhost:8080/client").then(res => setClientes(res.data));
  fetchUtensilios();
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  const utensilioSelecionado = utensilios.find(u => u.id === utensilioId);
  if (!utensilioSelecionado) {
    setMensagem("Selecione um item válido.");
    return;
  }
  if (Number(quantity) > utensilioSelecionado.availableQuantity) {
    setMensagem("Quantidade solicitada maior que a disponível!");
    return;
  }
  try {
    await axios.post("http://localhost:8080/rentals", {
      clientId: clienteId,
      utensilId: utensilioId,
      quantity: Number(quantity),
      price: Number(price)
    });
    setMensagem("Aluguel registrado com sucesso!");
    setClienteId("");
    setUtensilioId("");
    setQuantity("");
    setPrice("");
    await fetchUtensilios(); // Atualiza a lista de utensílios
  } catch (err) {
    setMensagem("Erro ao registrar aluguel: " + err.message);
  }
};

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>🎉 Registrar Aluguel</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Voltar
        </button>
      </div>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cliente">Cliente</label>
            <select 
              id="cliente"
              value={clienteId} 
              onChange={e => setClienteId(e.target.value)} 
              required
            >
              <option value="">Selecione o cliente</option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="item">Item</label>
            <select 
              id="item"
              value={utensilioId} 
              onChange={e => setUtensilioId(e.target.value)} 
              required
            >
              <option value="">Selecione o item</option>
              {utensilios.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.availableQuantity} disponíveis)
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="quantity">Quantidade</label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              placeholder="Quantidade a alugar"
              required
            />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="price">Preço</label>
            <span style={{ marginRight: "8px", marginLeft: "8px" }}>R$</span>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="Preço do aluguel"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            ✅ Registrar Aluguel
          </button>
          
          {mensagem && (
            <div className={mensagem.includes('sucesso') ? 'success-message' : 'error-message'}>
              {mensagem}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default RegistrarAluguel;