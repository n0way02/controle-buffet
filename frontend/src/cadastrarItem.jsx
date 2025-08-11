import { useState } from 'react';
import axios from 'axios';

function CadastroItem() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/utensilios', { nome, tipo, quantidade });
      setMensagem('Item cadastrado com sucesso!');
      setNome('');
      setTipo('');
      setQuantidade('');
    } catch (err) {
      setMensagem(`Erro ao cadastrar item: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" required />
      <input value={tipo} onChange={e => setTipo(e.target.value)} placeholder="Tipo" required />
      <input value={quantidade} onChange={e => setQuantidade(e.target.value)} placeholder="Quantidade" type="number" required />
      <button type="submit">Cadastrar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}

export default CadastroItem;