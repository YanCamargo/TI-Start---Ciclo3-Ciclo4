import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Home} from './views/Home';
import {ListarCliente} from './views/Cliente/Listar';
import {ListarPedidos} from './views/Pedido/Listar';
import {ListarServicos} from './views/Servico/Listar';
import { ItemServico } from './views/Servico/Item'; 

import {Menu} from './components/Menu';
import { CadastrarServico } from './views/Servico/Cadastrar';
import { Pedidos } from './views/Cliente/Pedido';
import { CadastrarCliente } from './views/Cliente/Cadastrar';
import { EditarPedido } from './views/Cliente/EditarPedido';
import { CadastrarPedido } from './views/Pedido/Cadastrar';
import { ListarProdutos } from './views/Produto/Listar';
import { ItemProduto } from './views/Produto/Item';
import { CadastrarProduto } from './views/Produto/Cadastrar';
import { ListarCompras } from './views/Compra/Listar';
import { CadastrarCompra } from './views/Compra/Cadastrar';
import { Compras } from './views/Cliente/Compra';
import { EditarCompra } from './views/Cliente/EditarCompra';


function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/listar-cliente" component={ListarCliente}></Route>
          <Route path="/pedidos-cliente/:id" component={Pedidos}/>
          <Route exact path="/listar-pedido" component={ListarPedidos}></Route>
          <Route path="/listar-servico" component={ListarServicos}></Route>
          <Route path="/listar-pedido/:id" component={ItemServico}/>
          <Route path="/cadastrarservico" component={CadastrarServico}/>
          <Route path="/cadastrarcliente" component={CadastrarCliente}/>
          <Route path="/cadastrarpedido" component={CadastrarPedido}/>
          <Route path="/editar-pedidos/:id" component={EditarPedido}/>
          <Route exact path="/listar-produtos" component={ListarProdutos}></Route>
          <Route path="/listar-compra/:id" component={ItemProduto}/>
          <Route path="/cadastrarproduto" component={CadastrarProduto}/>
          <Route exact path="/listar-compra" component={ListarCompras}></Route>
          <Route path="/cadastrarcompra" component={CadastrarCompra}/>
          <Route path="/compras-cliente/:id" component={Compras}/>
          <Route path="/editar-compras/:id" component={EditarCompra}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
