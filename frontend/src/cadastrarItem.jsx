import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CadastroItem() {
  const [name, setName] = useState('');
  const [type, seType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/utensils', { name, type, quantity });
      setMensagem('Item cadastrado com sucesso!');
      setName('');
      seType('');
      setQuantity('');
    } catch (err) {
      setMensagem(`Erro ao cadastrar item: ${err.message}`);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>🍽️ Cadastrar Item</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Voltar
        </button>
      </div>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome do Item</label>
            <input 
              id="name"
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Ex: Prato de vidro, Taça de cristal..." 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="type">Tipo</label>
            <input 
              id="type"
              value={type} 
              onChange={e => seType(e.target.value)} 
              placeholder="Ex: Louça, Utensílio, Decoração..." 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="quantity">Quantidade</label>
            <input 
              id="quantity"
              value={quantity} 
              onChange={e => setQuantity(e.target.value)} 
              placeholder="Quantidade disponível" 
              type="number" 
              min="1"
              required 
            />
          </div>
          
          <button type="submit" className="submit-btn">
            ✅ Cadastrar Item
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

export default CadastroItem;