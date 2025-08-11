import { useState } from 'react';
import axios from 'axios';

function CadastroCliente() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/clientes', { nome, telefone, endereco });
      setMensagem('Cliente cadastrado com sucesso!');
      setNome('');
      setTelefone('');
      setEndereco('');
    } catch (err) {
      setMensagem(`Erro ao cadastrar cliente: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" required />
      <input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Telefone" required />
      <input value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Endereço" required />
      <button type="submit">Cadastrar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}

export default CadastroCliente;