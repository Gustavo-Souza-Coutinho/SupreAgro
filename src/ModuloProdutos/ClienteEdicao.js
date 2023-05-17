import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Importando a biblioteca react-toastify
import "react-toastify/dist/ReactToastify.css"; // Importando o arquivo de estilos do react-toastify
import "./css/FormEdicao.css"; // Importando o arquivo CSS

function CliEdicao() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  // Pegando o parâmetro que está vindo via URL
  const { id } = useParams();

  useEffect(() => {
    buscarDetalhes();
  }, []);

  const buscarDetalhes = () => {
    axios.get("http://localhost:3000/clientes/" + id)
      .then((response) => {
        setNome(response.data.nome);
        setCpf(response.data.cpf);
        setEmail(response.data.email);
        setTelefone(response.data.telefone);
        console.log(response.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar detalhes do Cliente:", err);
      });
  }

  const editarCli = async () => {
    console.log('Clicou em editar');
    try {
      const response = await axios.put('http://localhost:3000/clientes/' + id, {
        nome,
        cpf,
        email,
        telefone
      });
      console.log('Cliente editado com sucesso:', response.data);
      toast.success("Cliente editado com sucesso!", {
        position: "top-left",
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Erro ao editar o cliente:', err);
    }
  }

  return (
    <div>
      <form>
        <h1>Editar cliente</h1> {/* Aplicando o estilo do cabeçalho h1 */}
        <table className="zigzag"> {/* Aplicando o estilo da tabela com a classe .zigzag */}
          <tbody>
            <tr>
              <th>Nome:</th>
              <td><input type="text" value={nome} onChange={(e) => setNome(e.target.value)} name="nome" /></td>
            </tr>
            <tr>
              <th>CPF:</th>
              <td><input type="number" value={cpf} onChange={(e) => setCpf(e.target.value)} name="cpf" /></td>
            </tr>
            <tr>
              <th>Email:</th>
              <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" /></td>
            </tr>
            <tr>
              <th>Telefone:</th>
              <td><input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} name="telefone" /></td>
            </tr>
          </tbody>
        </table>
        <input type="button" value="Gravar" onClick={editarCli} />
      </form>
      <ToastContainer /> {/* Adicionando o container do react-toastify */}
    </div>
  );
}

export default CliEdicao;

