import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function EditarPedido() {
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const { id } = useParams();

  useEffect(() => {
    buscarDetalhes();
  }, []);

  const buscarDetalhes = () => {
    axios
      .get(`http://localhost:3000/pedidos/${id}`)
      .then((response) => {
        const { clienteId, produtoId, quantidade } = response.data;

        // Obter o nome do cliente
        axios
          .get(`http://localhost:3000/clientes/${clienteId}`)
          .then((responseCliente) => {
            const cliente = responseCliente.data;
            setCliente(cliente.nome);
          })
          .catch((err) => {
            console.error("Erro ao buscar detalhes do cliente:", err);
          });

        // Obter o nome do produto
        axios
          .get(`http://localhost:3000/produtos/${produtoId}`)
          .then((responseProduto) => {
            const produto = responseProduto.data;
            setProduto(produto.nome);
          })
          .catch((err) => {
            console.error("Erro ao buscar detalhes do produto:", err);
          });

        setQuantidade(quantidade);
      })
      .catch((err) => {
        console.error("Erro ao buscar detalhes do pedido:", err);
      });
  };

  const editarPedido = async () => {
    console.log("Clicou em editar");

    try {
      const response = await axios.put(`http://localhost:3000/pedidos/${id}`, {
        clienteId: 1, // Substitua pelo ID do cliente selecionado
        produtoId: 1, // Substitua pelo ID do produto selecionado
        quantidade,
      });

      console.log("Pedido editado com sucesso:", response.data);
    } catch (err) {
      console.error("Erro ao editar o pedido:", err);
    }
  };

  return (
    <div>
      <form>
        <h1>Editar Pedido</h1>
        <table>
          <tbody>
            <tr>
              <th>Cliente:</th>
              <td>
                <input
                  type="text"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  name="cliente"
                />
              </td>
            </tr>
            <tr>
              <th>Produto:</th>
              <td>
                <input
                  type="text"
                  value={produto}
                  onChange={(e) => setProduto(e.target.value)}
                  name="produto"
                />
              </td>
            </tr>
            <tr>
              <th>Quantidade:</th>
              <td>
                <input
                  type="text"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  name="quantidade"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="button" value="Gravar" onClick={editarPedido} />
      </form>
      <ToastContainer />
   

      <ToastContainer /> {/* Adicionando o container do react-toastify */}
    </div>
  );

}

export default EditarPedido;
