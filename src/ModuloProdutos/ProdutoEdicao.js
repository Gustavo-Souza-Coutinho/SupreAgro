import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Importando a biblioteca react-toastify
import "react-toastify/dist/ReactToastify.css"; // Importando o arquivo de estilos do react-toastify
import "./css/FormEdicao.css"; // Importando o arquivo CSS

function ProdEdicao() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria_id, setCategoria] = useState('');

  // Pegando o parâmetro que está vindo via URL
  const { id } = useParams();

  useEffect(() => {
    buscarDetalhes();
  }, []);

  const buscarDetalhes = () => {
    axios.get("http://localhost:3000/produtos/" + id)
      .then((response) => {
        setNome(response.data.nome);
        setPreco(response.data.preco);
        setDescricao(response.data.descricao);
        setCategoria(response.data.categoria_id);
        console.log(response.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar detalhes do produto:", err);
      });
  }

  const editar = async () => {
    console.log('Clicou em editar');
    try {
      const response = await axios.put('http://localhost:3000/produtos/' + id, {
        nome,
        preco,
        descricao,
        categoria_id
      });
      console.log('Produto editado com sucesso:', response.data);
      toast.success("Produto editado com sucesso!", {
        position: "top-left",
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Erro ao editar o produto:', err);
    }
  }

  return (
    <div>
      <form>
        <h1>Editar Produto</h1> {/* Aplicando o estilo do cabeçalho h1 */}
        <table className="zigzag"> {/* Aplicando o estilo da tabela com a classe .zigzag */}
          <tbody>
            <tr>
              <th>Nome:</th>
              <td><input type="text" value={nome} onChange={(e) => setNome(e.target.value)} name="nome" /></td>
            </tr>
            <tr>
              <th>Preço:</th>
              <td><input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} name="preco" /></td>
            </tr>
            <tr>
              <th>Descrição:</th>
              <td><input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} name="descricao" /></td>
            </tr>
            <tr>
              <th>Categoria:</th>
              <td><input type="text" value={categoria_id} onChange={(e) => setCategoria(e.target.value)} name="categoria_id" /></td>
            </tr>
          </tbody>
        </table>
        <input type="button" value="Gravar" onClick={editar} />
      </form>
      <ToastContainer /> {/* Adicionando o container do react-toastify */}
    </div>
  );
}

export default ProdEdicao;

