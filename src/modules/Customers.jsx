import { useEffect, useState } from 'react'

import { Row, Col, Card, Button, FormControl, Form, ListGroup, Tooltip, OverlayTrigger, Spinner } from 'react-bootstrap'
import { FaEdit, FaPlus, FaSearch } from 'react-icons/fa'

//Modal
import CreateCustomer from '../components/modals/customers/createCustomer'
import EditingCustomer from '../components/modals/customers/editingCustomer'

//Service 
import api from '../services/api'

function Customers() {

    const [showCreateCustomer, setShowCreateCustomer] = useState(false)
    const [showEditingCustomer, setShowEditingCustomer] = useState(false)
    const [customerEditingInfos, setCustomerEditingInfos] = useState('')

    const [customerSearch, setCustomerSearch] = useState('')

    const [customers, setCustomers] = useState([])

    function searchCustomer(e) {
        e.preventDefault()

        if(customerSearch !== ''){
            api({
                method: 'GET',
                url: `/pessoas/search/${customerSearch}`
            }).then(res => {
                let c = []

                for(let customer of res.data.result){
                    c.push(customer)
                }

                setCustomers(c)
            }).catch(err => {
                console.log(err)
            })
        } else { 
            getCustomers()
        }
    }

    function getCustomers() {
        api({
            method: 'GET',
            url: '/pessoas'
        }).then(res => {
            console.log(res.data)
            setCustomers(res.data.result)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getCustomers()
    }, [])

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <h4>Pessoas</h4>
                                </Col>

                                <Col style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                                    <OverlayTrigger overlay={<Tooltip>Adicionar nova pessoa</Tooltip>} >
                                        <Button onClick={() => setShowCreateCustomer(true)}> <FaPlus /> </Button>
                                    </OverlayTrigger>

                                    <Form onSubmit={searchCustomer} inline>
                                        <FormControl type="text" placeholder="Pesquise por CPF" onChange={(e) => {
                                            let cpfModify = e.target.value.replaceAll('.', '')
                                            cpfModify = cpfModify.replace('-', '')
                                            setCustomerSearch(cpfModify)
                                        }} className="mr-sm-2" />
                                        <Button type="submit"><FaSearch /></Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body>
                            <ListGroup>

                                {customers.length > 0 ? (
                                    <>
                                        {customers.map((customer) => (
                                            <ListGroup.Item key={customer.cpf} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>
                                                    {customer.nome}
                                                    <p className="text-muted" style={{ marginBottom: 0 }}>CPF: {customer.cpf[0]+customer.cpf[1]+customer.cpf[2]+'.'+customer.cpf[3]+customer.cpf[4]+customer.cpf[5]+'.'+customer.cpf[6]+customer.cpf[7]+customer.cpf[8]+'-'+customer.cpf[9]+customer.cpf[10]}</p>
                                                </div>

                                                <Button onClick={() => {
                                                    setShowEditingCustomer(true)
                                                    setCustomerEditingInfos(customer)
                                                }}><FaEdit /></Button>
                                            </ListGroup.Item>
                                        ))}
                                    </> 
                                ) : (
                                    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}>
                                        <Spinner animation="border" variant="primary" />
                                    </div>
                                    )}

                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <CreateCustomer
                show={showCreateCustomer}
                onHide={() => { 
                    setShowCreateCustomer(false)
                    getCustomers()
                }}
            />

            <EditingCustomer
                show={showEditingCustomer}
                onHide={() => { 
                    setShowEditingCustomer(false)
                    getCustomers()
                }}
                infos={customerEditingInfos}
            />
        </>
    )
}

export default Customers