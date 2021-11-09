import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";

export const ListarPedidos = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos = async () => {
        await axios.get(api + "/listapedidos")
            .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                // console.log("Erro: sem conexão com a API.")
            })
    };

    const apagarPedido = async(id) =>{
        const headers={
            'Content-Type':'application/json'
        }
        await axios.get(api+"/excluirpedido/"+id, {headers})
        .then((response)=>{
            console.log(response.data.error);
            getPedidos();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Não foi possível conectar-se a API'
            });
        });
    };


    useEffect(() => {
        getPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações dos Pedidos</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarpedido"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>ClienteId</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.data}</td>
                                <td>{item.ClienteId}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-servico/" + item.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                    onClick={()=> apagarPedido(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};