import axios from "axios";
import { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IncluirProduto(props) {
  const nomeRef = useRef(null);
  const descricaoRef = useRef(null);
  const precoRef = useRef(null);

  function gravar() {
    console.log("clicou");

    const api = axios.create({
      baseURL: "http://localhost:3000",
    });

    // Obtendo os valores dos campos de entrada de texto utilizando refs
    const nome = nomeRef.current.value;
    const descricao = descricaoRef.current.value;
    const preco = precoRef.current.value;

    // Inserindo dados
    api
      .post("/produtos", {
        nome: nome,
        descricao: descricao,
        preco: preco,
      })
      .then((response) => {
        console.log("Salvou");
        toast.success("Produto cadastrado com sucesso!", {
          position: "top-left",
          autoClose: 3000,
        });

        // Limpar os campos de entrada de texto após o cadastro
        nomeRef.current.value = "";
        descricaoRef.current.value = "";
        precoRef.current.value = "";
      })
      .catch((error) => {
        console.error("Erro ao salvar:", error);
        toast.error("Erro ao cadastrar o produto.", {
          position: "top-left",
          autoClose: 3000,
        });
      });
  }

  return (
    <div style={{ marginTop: "130px" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "1rem",
          }}
        >
          Nome:
          <input
            type="text"
            ref={nomeRef}
            name="nome"
            style={{ marginTop: "0.5rem" }} // Adicione estilo CSS aqui
          />
        </label>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "1rem",
          }}
        >
          Descrição:
          <input
            type="text"
            ref={descricaoRef}
            name="descricao"
            style={{ marginTop: "0.5rem" }} // Adicione estilo CSS aqui
          />
        </label>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "1rem",
          }}
        >
          Preço:
          <input
            type="number"
            ref={precoRef}
            name="preco"
            style={{ marginTop: "0.5rem" }} // Adicione estilo CSS aqui
          />
        </label>
        <input type="button" value="Salvar" onClick={gravar} />
      </form>
      <ToastContainer /> {/* Adicione o ToastContainer para exibir as notificações */}
    </div>
  );
}

export default IncluirProduto;
