import React, { useEffect, useState } from "react";
import axios from "axios";

function RegistrarAluguel() {
  const [clientes, setClientes] = useState([]);
  const [utensilios, setUtensilios] = useState([]);
  const [clienteId, setClienteId] = useState("");
  const [utensilioId, setUtensilioId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mensagem, setMensagem] = useState("");

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
      quantity: Number(quantity)
    });
    setMensagem("Aluguel registrado com sucesso!");
    setClienteId("");
    setUtensilioId("");
    setQuantity("");
    await fetchUtensilios(); // Atualiza a lista de utensílios
  } catch (err) {
    setMensagem("Erro ao registrar aluguel: " + err.message);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar aluguel</h2>
      <select value={clienteId} onChange={e => setClienteId(e.target.value)} required>
        <option value="">Selecione o cliente</option>
        {clientes.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <select value={utensilioId} onChange={e => setUtensilioId(e.target.value)} required>
        <option value="">Selecione o item</option>
        {utensilios.map(u => (
          <option key={u.id} value={u.id}>{u.name} ({u.availableQuantity} disponíveis)</option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        placeholder="Quantidade"
        required
      />
      <button type="submit">Registrar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}

export default RegistrarAluguel;