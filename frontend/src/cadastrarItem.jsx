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
    <div>
      <button onClick={() => navigate("/")}>Voltar</button>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" required />
        <input value={type} onChange={e => seType(e.target.value)} placeholder="Tipo" required />
        <input value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Quantidade" type="number" required />
        <button type="submit">Cadastrar</button>
        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
}

export default CadastroItem;