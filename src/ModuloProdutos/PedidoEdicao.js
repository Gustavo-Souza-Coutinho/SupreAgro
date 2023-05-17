import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function EditarPedido() {
  const clienteRef = useRef(null);
  const produtoRef = useRef(null);
  const quantidadeRef = useRef(null);

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clienteNome, setClienteNome] = useState("");
  const [produtoNome, setProdutoNome] = useState("");
  const [produtoPreco, setProdutoPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const { id } = useParams();

  useEffect(() => {
    buscarDetalhes();
    carregarClientes();
    carregarProdutos();
  }, []);

  const buscarDetalhes = () => {
    axios
      .get(`http://localhost:3000/pedidos/${id}`)
      .then((response) => {
        const { clienteId, produtoId, quantidade } = response.data;
        setQuantidade(quantidade);
        setClienteNome("");
        setProdutoNome("");
        setProdutoPreco("");

        clienteRef.current.value = clienteId;
        produtoRef.current.value = produtoId;
      })
      .catch((err) => {
        console.error("Erro ao buscar detalhes do pedido:", err);
      });
  };

  const carregarClientes = () => {
    axios
      .get("http://localhost:3000/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar clientes:", err);
      });
  };

  const carregarProdutos = () => {
    axios
      .get("http://localhost:3000/produtos")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar produtos:", err);
      });
  };

  const editarPedido = async () => {
    console.log("Clicou em editar");

    const clienteId = clienteRef.current.value;
    const cliente = clientes.find((cliente) => cliente.id === clienteId);
    const clienteNome = cliente?.nome;

    const produtoId = produtoRef.current.value;
    const produto = produtos.find((produto) => produto.id === produtoId);
    const produtoNome = produto?.nome;
    const produtoPreco = produto?.preco;

    const quantidade = quantidadeRef.current.value;

    try {
      const response = await axios.put(`http://localhost:3000/pedidos/${id}`, {
        clienteId: parseInt(clienteId),
        produtoId: parseInt(produtoId),
        quantidade,
      });

      console.log('Pedido editado com sucesso:', response.data);
      toast.success("Pedido editado com sucesso!", {
        position: "top-left",
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Erro ao editar o Pedido:', err);
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
                <select ref={clienteRef}>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>Produto:</th>
              <td>
              <select ref={produtoRef} className="select-large">
                  {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.nome}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>Quantidade:</th>
              <td>
                <input
                  type="text"
                  defaultValue={quantidade}
                  ref={quantidadeRef}
                  className="select-large"
                  name="quantidade"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="button" value="Gravar" onClick={editarPedido} />
      </form>
      <ToastContainer />
    </div>
  );
}

export default EditarPedido;
