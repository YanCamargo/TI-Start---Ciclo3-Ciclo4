import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";

export const EditarPedido = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/pedido/" + id, { id, data, ClienteId }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alteração feita com sucesso.'
                })
                console.log(response.data.type);
                console.log(response.data.message);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível acessar a API.'
                });
            });
    };


    useEffect(() => {
        const getPedido = async () => {
            await axios.get(api + "/pedidos/" + id)
                .then((response) => {
                    setId(response.data.ped.id);
                    setData(response.data.ped.data);
                    setClienteId(response.data.ped.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getPedido()
    }, [id]);
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-cliente"
                            className="m-auto btn btn-outline-primary btn-sm">Clientes</Link>
                    </div>
                    <hr className="m-1"></hr>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                    {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                </div>
                <Form className="p-2" onSubmit={edtPedido}>
                    <FormGroup className="p-2">
                        <Label>
                            ID do Pedido
                        </Label>
                        <Input
                            name="id"
                            placeholder="id do pedido"
                            type="text"
                            defaultValue={id}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Data do Pedido
                        </Label>
                        <Input
                            name="data"
                            placeholder="Data do Pedido"
                            type="text"
                            value={data}
                            onChange={e => { setData(e.target.value) }}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            ID do Cliente
                        </Label>
                        <Input
                            name="ClienteId"
                            placeholder="Id do Cliente"
                            type="text"
                            defaultValue={ClienteId}
                        />
                    </FormGroup>
                    {status.formSave ?
                        <Button type="submit" outline color="warning" disabled>Salvando...
                            <Spinner size="sm" color="success" /></Button> :
                        <Button type="submit" outline color="warning">Alterar</Button>}
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>
            </Container>
        </div>
    )

}