import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";

export const ListarCliente = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getClientes = async () => {
        await axios.get(api + "/listaclientes")
            .then((response) => {
                // console.log(response.data.clientes);
                setData(response.data.clientes);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                });
                // console.log("Erro: sem conexão com a API.")
            });
    };

    const apagarCliente = async(id) =>{
        const headers={
            'Content-Type':'application/json'
        }

        await axios.get(api+"/excluircliente/"+id, {headers})
        .then((response)=>{
            console.log(response.data.error);
            getClientes();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Não foi possível conectar-se a API'
            });
        });
    }
 
    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações dos clientes</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarcliente"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data de nascimento</th>
                            <th>Cliente desde</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(clientes => (
                            <tr key={clientes.id}>
                                <td>{clientes.id}</td>
                                <td>{clientes.nome}</td>
                                <td>{clientes.nascimento}</td>
                                <td>{clientes.createdAt}</td>
                                <td className="text-center/">
                                    <Link to={"/pedidos-cliente/" + clientes.id}
                                        className="btn btn-outline-success btn-sm">
                                        Consultar Pedidos
                                    </Link>
                                    <Link to={"/compras-cliente/" + clientes.id}
                                        className="btn btn-outline-success btn-sm">
                                        Consultar Compras
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                    onClick={()=> apagarCliente(clientes.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};