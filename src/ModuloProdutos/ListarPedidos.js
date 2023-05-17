import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { BrowserRouter as Router, Link } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


function ListarPedidos() {

  const [pedidos, setPedidos] = useState([]);

  const obterDados = () => {
    const api = axios.create({
      baseURL: "http://localhost:3000"
    });
  
    api.get("/pedidos")
      .then((response) => {
        console.log(response.data);
        // Para cada pedido, obter o nome do cliente e do produto
        const pedidosComNomes = response.data.map((pedido) => {
          const { clienteId, produtoId, ...resto } = pedido;
          return api.get(`/clientes/${clienteId}`)
            .then((responseCliente) => {
              const cliente = responseCliente.data;
              return api.get(`/produtos/${produtoId}`)
                .then((responseProduto) => {
                  const produto = responseProduto.data;
                  return {
                    ...resto,
                    cliente: cliente.nome,
                    produto: produto.nome
                  };
                });
            });
        });
  
        // Aguardar todas as chamadas assíncronas serem concluídas
        Promise.all(pedidosComNomes)
          .then((pedidosCompletos) => {
            setPedidos(pedidosCompletos);
          })
          .catch((err) => {
            console.error("Erro ao obter nomes dos clientes e produtos:", err);
          });
      })
      .catch((err) => {
        console.error("Erro ao listar pedidos:", err);
      });
  };
  

  const excluirPedido = (id) => {
    const api = axios.create({
      baseURL: "http://localhost:3000"
    });

    api.delete(`/pedidos/${id}`)
      .then((response) => {
        console.log(response.data);
        // Atualiza a lista de pedidos após a exclusão
        obterDados();
      })
      .catch((err) => {
        console.error("Erro ao excluir pedido:", err);
      });
  };

  // o método useEffect é chamado quando a página é carregada
  useEffect(() => {
    obterDados();
  }, []);

    const mostraBotoes = (rowData) => {
      const { id } = rowData; // Extrai o ID do rowData
      return (
        <div>
          {/* Use o componente Link para criar um link de navegação para a página de edição */}
          <Link to={`/editarPed/${id}`}>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success no-outline" />

          </Link>
          <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => excluirPedido(id)} style={{ outline: 'none' }} />
        </div>
      );
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
        <div style={{
          boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
          padding: "20px",
          borderRadius: "10px",
        }}>
          <div className="container">
            <DataTable value={pedidos} tableStyle={{ minWidth: '50rem' }}>
              <Column field="id" header="ID"></Column>
              <Column field="cliente" header="Cliente"></Column>
              <Column field="produto" header="Produto"></Column>
              <Column field="quantidade" header="Quantidade"></Column>
              <Column header="" body={mostraBotoes}></Column>
            </DataTable>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ListarPedidos;
