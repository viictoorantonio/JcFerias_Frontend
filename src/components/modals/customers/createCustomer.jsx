import { useState } from 'react'

import { Modal, Button, Form, Col, Alert } from 'react-bootstrap'
import { FaUsers } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import axios from 'axios'

//Service
import api from '../../../services/api'

function CreateCustomer(props) {

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

    function searchCep(cepActual) {
        setEndreco('')
        setCidade('')
        setEstado('')
        setBairro('')

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

    function submitCreateCustomer(event) {
        event.preventDefault()
        
        api({
            method: 'POST',
            url: '/pessoas/create',
            data: {
                'nome': nome,
                'cpf': cpf,
                'rg': rg,
                'nascimento': dataNascimento,
                'email': email,
                'telefone': telefone,
                'cep': cep,
                'cidade': cidade,
                'logradouro': endereco,
                'bairro': bairro,
                'uf': estado,
                'complemento': comple
            }
        }).then(res => {
                setAlertShow(true)
                setAlertVariant('success')
                setAlertMessage(res.data.message)

                setTimeout(() => {
                    props.onHide()
                    
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
                }, 1000)

        }).catch((err, res) => {
            setAlertShow(true)
            setAlertVariant('danger')
            setAlertMessage(res.data.message)
        })
    }

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
                        <FaUsers /> Adicionar pessoa
                </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={submitCreateCustomer}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome" onChange={(e) => setNome(e.target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>CPF:</Form.Label>
                                <InputMask mask="999.999.999-99" maskChar="" minLength="13" className="form-control" type="text" placeholder="Digite o CPF" onChange={(e) => {
                                    let cpfModify = e.target.value.replaceAll('.', '')
                                    cpfModify = cpfModify.replace('-', '')
                                    setCpf(cpfModify)
                                }} required />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>RG:</Form.Label>
                                <InputMask mask="9999999" maskChar="" value={rg} className="form-control" type="text" placeholder="Digite o RG" onChange={(e) => setRg(e.target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Data de nascimento:</Form.Label>
                                <Form.Control type="date" onChange={(e) => setDataNascimento(e.target.value)} required />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>E-mail:</Form.Label>
                                <Form.Control type="email" placeholder="Digite o e-mail" onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Telefone:</Form.Label>
                                <InputMask mask="(99) 99999-9999" maskChar="" minLength="13" className="form-control" type="text" placeholder="Digite o telefone" onChange={(e) => setTelefone(e.target.value)} required />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>CEP:</Form.Label>
                                <InputMask mask="99999-999" maskChar="" className="form-control" type="text" placeholder="Digite o CEP" required onChange={(e) => {
                                    setCep(e.target.value.replace('-', ''))
                                    searchCep(e.target.value.replace('-', ''))
                                }} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Cidade:</Form.Label>
                                <Form.Control type="text" defaultValue={cidade} placeholder="Digite a cidade" onChange={(e) => setCidade(e.target.value)} required />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Endereço:</Form.Label>
                            <Form.Control defaultValue={endereco} placeholder="Praça da Sé 11" onChange={(e) => setEndreco(e.target.value)} required />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Bairro:</Form.Label>
                                <Form.Control defaultValue={bairro} placeholder="Digite o bairro" onChange={(e) => setBairro(e.target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Estado:</Form.Label>
                                <Form.Control defaultValue={estado} maxLength="2" placeholder="Digite o estado. Exemplo: GO" onChange={(e) => setEstado(e.target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Complemento:</Form.Label>
                                <Form.Control onChange={(e) => setComple(e.target.value)} required />
                            </Form.Group>
                        </Form.Row>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>

                            <Button variant="danger" onClick={props.onHide}>Fechar</Button>
                            <Button variant="success" type="submit" >Salvar</Button>
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

export default CreateCustomer