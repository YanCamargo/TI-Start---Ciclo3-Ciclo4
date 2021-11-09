import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";

export const EditarCompra = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/compra/" + id, { id, data, ClienteId }, { headers })
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
        const getCompra = async () => {
            await axios.get(api + "/compras/" + id)
                .then((response) => {
                    setId(response.data.comp.id);
                    setData(response.data.comp.data);
                    setClienteId(response.data.comp.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getCompra()
    }, [id]);
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-cliente"
                            className="m-auto btn btn-outline-primary btn-sm">Clientes</Link>
                    </div>
                    <hr className="m-1"></hr>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                    {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                </div>
                <Form className="p-2" onSubmit={edtCompra}>
                    <FormGroup className="p-2">
                        <Label>
                            ID da Compra
                        </Label>
                        <Input
                            name="id"
                            placeholder="id da compra"
                            type="text"
                            defaultValue={id}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Data da Compra
                        </Label>
                        <Input
                            name="data"
                            placeholder="Data da Compra"
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