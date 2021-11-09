import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";

export const ListarProdutos = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getProdutos = async () => {
        await axios.get(api + "/listaprodutos")
            .then((response) => {
                console.log(response.data.produtos);
                setData(response.data.produtos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                // console.log("Erro: sem conexão com a API.")
            })
    };

    const apagarProduto = async(id) =>{
        const headers={
            'Content-Type':'application/json'
        }
        await axios.get(api+"/excluirproduto/"+id, {headers})
        .then((response)=>{
            console.log(response.data.error);
            getProdutos();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Não foi possível conectar-se a API'
            });
        });
    };

    useEffect(() => {
        getProdutos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações dos produtos</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarproduto"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(produto => (
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.descricao}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-compra/" + produto.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                    onClick={()=> apagarProduto(produto.id)}>Excluir</span>
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Container>
        </div>
    );
};