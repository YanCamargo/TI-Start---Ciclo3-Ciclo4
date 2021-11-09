import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";

export const ItemProduto = (props) => {
    //console.log(props.match.params.id);
    const [data, setData] = useState([]);
// eslint-disable-next-line
    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(api + "/produto/"+id+"/compras")
            .then((response) => {
                console.log(response.data.item);
                setData(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                // console.log("Erro: sem conexão com a API.")
            })
    };

    useEffect(() => {
        getItens();
        // eslint-disable-next-line
    }, [id]);

    return (
        <div>
            <Container>
                <div>
                    <h1>Compras do Produto</h1>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Compra</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ProdutoId}>
                                <td>{item.CompraId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-pedido/"+item.id}
                                    className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};