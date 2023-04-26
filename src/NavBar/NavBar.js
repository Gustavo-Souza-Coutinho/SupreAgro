import React from "react";
import "./navbar.css";
import logo3 from "D:/Projeto_Integrador/src/assets/logo3.png";

function NavBar() {
  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption !== "") {
      window.location.href = selectedOption;
    }
  };

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <details open>
        <nav className="menu">
          <img src={logo3} alt="Logo 3" className="logo" onClick={handleLogoClick} />
          <div className="links">
            <div className="combo-box">
              <label htmlFor="home-select"></label>
              <select id="home-select" onChange={handleOptionChange}>
                <option value="">Usuarios</option>
                <option value="/cadastrarUsuarios">Cadastrar Usuarios</option>
                <option value="/listarUsuarios">Listar Usuarios</option>
              </select>
            </div>
            <div className="combo-box">
              <label htmlFor="home-select"></label>
              <select id="home-select" onChange={handleOptionChange}>
                <option value="">Clientes</option>
                <option value="/cadastrarCliente">Cadastrar Cliente</option>
                <option value="/listarCliente">Listar Clientes</option>
              </select>
            </div>
            <div className="combo-box">
              <label htmlFor="home-select"></label>
              <select id="home-select" onChange={handleOptionChange}>
                <option value="">Produtos</option>
                <option value="/IncluirProduto">Incluir Produto</option>
                <option value="/ListarProduto">Listar Produtos</option>
              </select>
            </div>
            <div className="combo-box">
              <label htmlFor="home-select"></label>
              <select id="home-select" onChange={handleOptionChange}>
                <option value="">Rotas</option>
                <option value="/cadastrarRota">Cadastrar Rotas</option>
                <option value="/cadastrarProduto">Cadastrar Vendedor</option>
                <option value="/listarRotas">Listar Rotas</option>
                <option value="/listarVendedor">Listar Vendedor</option>
              </select>
            </div>
            <div className="combo-box">
              <label htmlFor="home-select"></label>
              <select id="home-select" onChange={handleOptionChange}>
                <option value="">Pedidos</option>
                <option value="/cadastrarPedidos">Cadastrar Pedidos</option>
                <option value="/listarPedidos">Listar Pedidos</option>
              </select>
            </div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Pesquisar" className="search-input" />
          </div>
        </nav>
      </details>
    </div>
  );
}

export default NavBar;
