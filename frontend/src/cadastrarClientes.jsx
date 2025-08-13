import { useState } from 'react';
import axios from 'axios';

function CadastroCliente() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/client', { name, phone, address });
      setMensagem('Cliente cadastrado com sucesso!');
      setName('');
      setPhone('');
      setAddress('');
    } catch (err) {
      setMensagem(`Erro ao cadastrar cliente: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" required />
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone" required />
      <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Endereço" required />
      <button type="submit">Cadastrar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}

export default CadastroCliente;