import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { BrowserRouter as Router, Link } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// Estilo para adicionar margem à parte superior do componente
const listarProdutosContainerStyle = {
  marginTop: '130px' // Ajuste o valor para a quantidade de espaçamento desejada
};

function ListarProdutos() {

  const [produtos, setProdutos] = useState([]);

  const obterDados = () => {
    const api = axios.create({
      baseURL: "http://localhost:3000"
    });

    api.get("/produtos")
      .then((response) => {
        console.log(response.data)
        setProdutos(response.data);
      })
      .catch((err) => {
        console.error("erro ao listar");
      });

  }

  const excluirProduto = (id) => {
    const api = axios.create({
      baseURL: "http://localhost:3000"
    });

    api.delete(`/produtos/${id}`)
      .then((response) => {
        console.log(response.data)
        // Atualiza a lista de produtos após a exclusão
        obterDados();
      })
      .catch((err) => {
        console.error("erro ao excluir");
      });
  }

  // o método useEffect é chamado quando a página é carregada
  useEffect(() => {
    obterDados();
  }, [])

  // dentro do colchetes [], você pode colocar uma variável que quando for atualizada
  // o método useEffect é chamado automaticamente.

  const mostraBotoes = (rowData) => {
    const { id } = rowData; // Extrai o ID do rowData
    return (
      <div>
        {/* Use o componente Link para criar um link de navegação para a página de edição */}
        <Link to={`/editarPro/${id}`}>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success no-outline" />

        </Link>
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => excluirProduto(id)} style={{ outline: 'none' }} />
      </div>
    );
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
        <div style={{
            boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
            padding: "20px",
            borderRadius: "10px",
        }}>

      <DataTable value={produtos} tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="ID"></Column>
        <Column field="nome" header="Nome"></Column>
        <Column field="descricao" header="Descrição"></Column>
        <Column field="preco" header="Preço"></Column>
        <Column header="Ação" body={mostraBotoes}></Column>
      </DataTable>
   
        </div>

    </form>
</div>
  );
}

export default ListarProdutos;
