import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CadastroCliente() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/client', { name, phone, address, email, description });
      setMensagem('Cliente cadastrado com sucesso!');
      setName('');
      setPhone('');
      setAddress('');
      setEmail('');
      setDescription('');
    } catch (err) {
      setMensagem(`Erro ao cadastrar cliente: ${err.message}`);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>👥 Cadastrar Cliente</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Voltar
        </button>
      </div>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input 
              id="name"
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Digite o nome completo do cliente" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
            <input 
              id="phone"
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              placeholder="(11) 99999-9999" 
              type="tel"
              required 
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Digite o email do cliente" 
              type="email"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Endereço</label>
            <input 
              id="address"
              value={address} 
              onChange={e => setAddress(e.target.value)} 
              placeholder="Endereço completo com CEP" 
              required 
            />
          </div>

          <div>
            <label htmlFor="description">Anotação</label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Digite uma anotação para o cliente"
            />
          </div>
          
          <button type="submit" className="submit-btn">
            ✅ Cadastrar Cliente
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

export default CadastroCliente;