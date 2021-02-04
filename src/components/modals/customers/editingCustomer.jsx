import { useEffect, useState } from 'react'

import { Modal, Button, Form, Col, Alert, Tooltip, OverlayTrigger, Accordion, Card } from 'react-bootstrap'
import { FaUser, FaTrash, FaLock } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import axios from 'axios'

//Service
import api from '../../../services/api'

function EditingCustomer(props) {

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [rg, setRg] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cep, setCep] = useState('')
    const [cidade, setCidade] = useState('')
    const [endereco, setEndreco] = useState('')
    const [estado, setEstado] = useState('')
    const [bairro, setBairro] = useState('')
    const [comple, setComple] = useState('')

    //Alerts
    const [alertShow, setAlertShow] = useState(false)
    const [alertVariant, setAlertVariant] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    function setAlertFalse() {
        setTimeout(() => {
            setAlertShow(false)
        }, 5000)
    }

    function getCustomerEdit() {

        setNome('')
        setCpf('')
        setRg('')
        setDataNascimento('')
        setEmail('')
        setTelefone('')
        setCep('')
        setCidade('')
        setEstado('')
        setEndreco('')
        setBairro('')
        setComple('')

        if (props.infos.cpf !== undefined) {
            api({
                method: 'GET',
                url: `/pessoas/search/${props.infos.cpf}`
            }).then(res => {
                setNome(res.data.result[0].nome)
                setCpf(res.data.result[0].cpf)
                setRg(res.data.result[0].rg)
                setDataNascimento(res.data.result[0].nascimento)
                setEmail(res.data.result[0].email)
                setTelefone(res.data.result[0].telefone)
                setCep(res.data.result[0].cep)
                setCidade(res.data.result[0].cidade)
                setEstado(res.data.result[0].uf)
                setEndreco(res.data.result[0].logradouro)
                setBairro(res.data.result[0].bairro)
                setComple(res.data.result[0].complemento)
            })
        }
    }

    function searchCep(cepActual) {
        if (cepActual.length > 7) {
            axios.get(`https://viacep.com.br/ws/${cepActual}/json/`).then(res => {
                if (!res.data.erro) {
                    setEndreco(res.data.logradouro)
                    setCidade(res.data.localidade)
                    setEstado(res.data.uf)
                    setBairro(res.data.bairro)
                } else {
                    setAlertShow(true)
                    setAlertVariant('danger')
                    setAlertMessage('CEP inválido, tente novamente.')
                }
            }).catch(err => {
                setAlertShow(true)
                setAlertVariant('danger')
                setAlertMessage('Houve algum erro ao buscar pelo CEP.')
            })
        }
    }

    function submitUpdateCustomer(event) {
        event.preventDefault()

        api({
            method: 'PATCH',
            url: `/pessoas/update`,
            data: {
                'id_grupo': 2,
                'nome': nome,
                'cpf': cpf,
                'rg': rg,
                'nascimento': dataNascimento,
                'email': email,
                'telefone': telefone,
                'cep': cep,
                'cidade': cidade,
                'logradouro': endereco,
                'uf': estado,
                'bairro': bairro,
                'complemento': comple
            }
        }).then(res => {
            setAlertShow(true)
            setAlertVariant('success')
            setAlertMessage('Dados atualizado com sucesso.')
        })
    }

    function deleteCustomer() {
        api({
            method: 'DELETE',
            url: `/pessoas/delete/${props.infos.cpf}`
        }).then(res => {
            setAlertShow(true)
            setAlertVariant('success')
            setAlertMessage(res.data.message)

            setTimeout(() => {
                props.onHide()
            }, 2000)

        }).catch((err, res) => {
            setAlertShow(true)
            setAlertVariant('danger')
            setAlertMessage(res.data.message)
        })
    }

    useEffect(() => {
        getCustomerEdit()
    }, [props.infos])

    return (
        <>

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <FaUser /> {props.infos.nome}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={submitUpdateCustomer}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>CPF:</Form.Label>
                                <InputMask mask="999.999.999-99" maskChar="" value={cpf} className="form-control" type="text" disabled />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>RG:</Form.Label>
                                <InputMask mask="9999999" maskChar="" value={rg} className="form-control" type="text" placeholder="Digite o RG" disabled />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Data de nascimento:</Form.Label>
                                <Form.Control value={dataNascimento} type="date"  />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>E-mail:</Form.Label>
                                <Form.Control type="email" placeholder="Digite o e-mail"
                                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Telefone:</Form.Label>
                                <InputMask mask="(99) 99999-9999" maskChar="" value={telefone} minLength="13" className="form-control" type="text" placeholder="Digite o telefone" onChange={(e) => setTelefone(e.target.value)} required />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>CEP:</Form.Label>
                                <InputMask mask="99999-999" maskChar="" value={cep} className="form-control" type="text" placeholder="Digite o CEP" required onChange={(e) => {
                                    setCep(e.target.value.replace('-', ''))
                                    searchCep(e.target.value.replace('-', ''))
                                }} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Cidade:</Form.Label>
                                <Form.Control type="text" value={cidade} placeholder="Digite a cidade" onChange={(e) => setCidade(e.target.value)} required />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Endereço:</Form.Label>
                            <Form.Control value={endereco} placeholder="Praça da Sé 11" onChange={(e) => setEndreco(e.target.value)} required />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Bairro:</Form.Label>
                                <Form.Control value={bairro} placeholder="Digite o bairro" onChange={(e) => setBairro(e.target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Estado:</Form.Label>
                                <Form.Control value={estado} maxLength="2" placeholder="Digite o estado. Exemplo: GO" onChange={(e) => setEstado(e.target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Complemento:</Form.Label>
                                <Form.Control value={comple} onChange={(e) => setComple(e.target.value)} />
                            </Form.Group>
                        </Form.Row>

                        <Accordion style={{ marginBottom: 10 }}>

                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} eventKey="0">
                                        <FaLock /> Permissões
                                </Accordion.Toggle>
                                </Card.Header>

                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>

                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Resetar senha:</Form.Label>
                                                <Form.Control type="password" placeholder="Digite a nova senha" />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Grupo de permissões:</Form.Label>

                                                <Form.Control as="select">
                                                    <option>Cliente</option>
                                                    <option>Corretor</option>
                                                    <option>Proprietário</option>
                                                    <option>Agencia</option>
                                                    <option>Supervisor</option>
                                                    <option>Administrador</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                        </Accordion>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <OverlayTrigger overlay={<Tooltip>Deletar pessoa</Tooltip>} >
                                <Button variant="danger" onClick={deleteCustomer}><FaTrash /></Button>
                            </OverlayTrigger>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                                <Button variant="danger" onClick={props.onHide}>Fechar</Button>
                                <Button variant="success" type="submit" >Atualizar</Button>
                            </div>
                        </div>

                    </Form>
                </Modal.Body>
            </Modal>

            <div style={{ position: 'fixed', right: '1.5rem', bottom: '0.5rem', zIndex: 3000 }}>
                {alertShow && (
                    <Alert variant={alertVariant}>
                        {setAlertFalse()}
                        {alertMessage}
                    </Alert>
                )}
            </div>

        </>
    )
}

export default EditingCustomer