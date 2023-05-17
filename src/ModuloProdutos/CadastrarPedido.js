import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function CadastrarPedido() {
  const clienteRef = useRef(null);
  const produtoRef = useRef(null);
  const quantidadeRef = useRef(null);

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  // Carregar lista de clientes e produtos ao iniciar o componente
  useEffect(() => {
    carregarClientes();
    carregarProdutos();
  }, []);

  // Carregar lista de clientes
  const carregarClientes = () => {
    axios
      .get("http://localhost:3000/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar clientes:", error);
      });
  };

  // Carregar lista de produtos
  const carregarProdutos = () => {
    axios
      .get("http://localhost:3000/produtos")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
      });
  };

  const gravarPedido = () => {
    const clienteId = clienteRef.current.value;
    const cliente = clientes.find((cliente) => cliente.id === clienteId);
    const clienteNome = cliente?.nome;
  
    const produtoId = produtoRef.current.value;
    const produto = produtos.find((produto) => produto.id === produtoId);
    const produtoNome = produto?.nome;
    const produtoPreco = produto?.preco;
  
    const quantidade = quantidadeRef.current.value;
  
    axios
      .post("http://localhost:3000/pedidos", {
        clienteId,
        clienteNome,
        produtoId,
        produtoNome,
        produtoPreco,
        quantidade,
      })
      .then((response) => {
        toast.success("Pedido cadastrado com sucesso!", {
          position: "top-left",
          autoClose: 3000,
        });
  
        // Limpar os campos após o cadastro
        clienteRef.current.value = "";
        produtoRef.current.value = "";
        quantidadeRef.current.value = "";
      })
      .catch((error) => {
        console.error("Erro ao cadastrar pedido:", error);
        toast.error("Erro ao cadastrar o pedido.", {
          position: "top-left",
          autoClose: 3000,
        });
      });
  };
    

  return (
    <div style={{ marginTop: "130px" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div className="container">
            <h2>Formulário de cadastro de Pedido</h2>
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              Cliente:
              <select ref={clienteRef} style={{ marginTop: "0.5rem" }}>
                {clientes.map((cliente) => (
                         <option key={cliente.id} value={cliente.id}>
                         {cliente.nome}
                       </option>
                     ))}
                   </select>
                 </label>
                 <label
                   style={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "flex-start",
                     marginBottom: "1rem",
                   }}
                 >
                   Produto:
                   <select ref={produtoRef} style={{ marginTop: "0.5rem" }}>
                     {produtos.map((produto) => (
                       <option key={produto.id} value={produto.id}>
                         {produto.nome}
                       </option>
                     ))}
                   </select>
                 </label>
                 <label
                   style={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "flex-start",
                     marginBottom: "1rem",
                   }}
                 >
                   Quantidade:
                   <input
                     type="number"
                     ref={quantidadeRef}
                     name="quantidade"
                     style={{ marginTop: "0.5rem" }}
                   />
                 </label>
                 <input type="button" value="Salvar" onClick={gravarPedido} />
               </div>
             </div>
           </form>
           <ToastContainer /> {/* Adicione o ToastContainer para exibir as notificações */}
         </div>
         );
         
         }
         
         export default CadastrarPedido;
         
