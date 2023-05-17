import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListarProdutos from './ModuloProdutos/ListarProdutos';
import NavBar from './NavBar/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IncluirProduto from './ModuloProdutos/IncluirProduto';
import Home from './ModuloProdutos/Home';
import FormEdicao from './ModuloProdutos/ProdutoEdicao';
import IncluirCliente from './ModuloProdutos/IncluirCliente';
import ListarClientes from './ModuloProdutos/ListarClientes';
import CadastroPedido from './ModuloProdutos/CadastrarPedido';
import ListarPedidos from './ModuloProdutos/ListarPedidos';
import ListagemPedidos from './ModuloProdutos/ListarPedidos';
import ProdEdicao from './ModuloProdutos/ProdutoEdicao';
import PedEdicao from './ModuloProdutos/PedidoEdicao';
import EditarPedido from './ModuloProdutos/PedidoEdicao';
import CliEdicao from './ModuloProdutos/ClienteEdicao';

function App() {
  return (
    <div className="App">

      <NavBar></NavBar>

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/ListarProduto' element={<ListarProdutos />} />
          <Route path='/IncluirProduto' element={<IncluirProduto />} />
          <Route path='/incluirCliente' element={<IncluirCliente />}/>
          <Route path='/listarCliente' element={<ListarClientes />}/>
          <Route path='/cadastrarPedidos' element={<CadastroPedido />}/>
          <Route path='/listarPedidos' element={<ListagemPedidos />}/>
          <Route path='/Sobre' />
          <Route path='/editarPro/:id' element={<ProdEdicao />} />
          <Route path='/editarPed/:id' element={<EditarPedido />} />
          <Route path='/editarCli/:id' element={<CliEdicao />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
