import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const Compras = (props) => {
    // console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id);

    const getCompras = async () => {
        await axios.get(api + "/cliente/" + id + "/compras")
            .then((response) => {
                console.log(response.data.comp);
                setData(response.data.comp);
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
    };

    useEffect(() => {
        getCompras();// eslint-disable-next-line
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <h1>Visualizar Compras do Cliente</h1>
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
                        {data.map(comp => (
                            <tr key={comp.id}>
                                <td>{comp.id}</td>
                                <td>{comp.data}</td>
                                <td>{comp.ClienteId}</td>
                                <td className=" text-center/">
                                    <Link to={"/listar-cliente/" + comp.id}
                                        className="btn btn-outline-success btn-sm">
                                        Voltar
                                    </Link>
                                    <Link to={"/editar-compras/"+comp.id}
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