import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const Pedidos = (props) => {
    // console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id);

    const getPedidos = async () => {
        await axios.get(api + "/cliente/" + id + "/pedidos")
            .then((response) => {
                console.log(response.data.ped);
                setData(response.data.ped);
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
    };

    useEffect(() => {
        getPedidos();// eslint-disable-next-line
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <h1>Visualizar Pedidos do Cliente</h1>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Data</th>
                            <th>Cliente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ped => (
                            <tr key={ped.id}>
                                <td>{ped.id}</td>
                                <td>{ped.data}</td>
                                <td>{ped.ClienteId}</td>
                                <td className=" text-center/">
                                    <Link to={"/listar-cliente/" + ped.id}
                                        className="btn btn-outline-success btn-sm">
                                        Voltar
                                    </Link>
                                    <Link to={"/editar-pedidos/"+ped.id}
                                        className="btn btn-outline-warning btn-sm">
                                        Editar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}