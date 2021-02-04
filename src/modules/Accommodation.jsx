import { Row, Col, CardGroup, Card, Button, Badge, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { FaUsers, FaBed, FaBath, FaMapMarked, FaFilter } from 'react-icons/fa'

//Styles
import '../assets/styles/modules/accommodation.css'

function Accommodation() {

    return (
        <>
            <Row>
                <Col>

                    <Card>

                        <Card.Title>
                            <FaFilter /> Filtros
                        </Card.Title>

                        <Card.Body>

                        </Card.Body>

                    </Card>

                </Col>
            </Row>

            <Row>
                <CardGroup>

                    <Card>
                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" />

                        <Card.Body>

                            <Card.Title>
                                AS 805 C - Águas Da Serra - JC TEMPORADA{' '}
                                <Badge variant="info"><FaUsers /> 4</Badge>{' '}
                                <Badge variant="info"><FaBed /> 3</Badge>{' '}
                                <Badge variant="info"><FaBath /> 2</Badge>{' '}
                            </Card.Title>

                            <Card.Text>
                                <FaMapMarked /> Avenida Elias Bufaiçal, Gleba 01, s/n, Suite 526, 75696-320 Jardim Belvedere, CALDAS NOVAS GOIÁS, Brasil

                                <div className="tools">
                                    <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-2">
                                        <ToggleButton variant="danger" value={1}>Temporada</ToggleButton>
                                        <ToggleButton variant="danger" value={2}>Venda</ToggleButton>
                                        <ToggleButton variant="danger" value={3}>Locação</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </Card.Text>

                        </Card.Body>

                        <Card.Footer>
                            <small className="text-muted">Última atualização 3 min atrás</small>
                            <Button variant="primary" type="submit">Detalhes</Button>
                        </Card.Footer>
                    </Card>

                    <Card>
                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" />

                        <Card.Body>

                            <Card.Title>
                                AS 805 C - Águas Da Serra - JC TEMPORADA{' '}
                                <Badge variant="info"><FaUsers /> 4</Badge>{' '}
                                <Badge variant="info"><FaBed /> 3</Badge>{' '}
                                <Badge variant="info"><FaBath /> 2</Badge>{' '}
                            </Card.Title>

                            <Card.Text>
                                <FaMapMarked /> Avenida Elias Bufaiçal, Gleba 01, s/n, Suite 526, 75696-320 Jardim Belvedere, CALDAS NOVAS GOIÁS, Brasil

                                <div className="tools">
                                    <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-2">
                                        <ToggleButton variant="danger" value={1}>Temporada</ToggleButton>
                                        <ToggleButton variant="danger" value={2}>Venda</ToggleButton>
                                        <ToggleButton variant="danger" value={3}>Locação</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </Card.Text>

                        </Card.Body>

                        <Card.Footer>
                            <small className="text-muted">Última atualização 3 min atrás</small>
                            <Button variant="primary" type="submit">Detalhes</Button>
                        </Card.Footer>
                    </Card>

                    <Card>
                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" />

                        <Card.Body>

                            <Card.Title>
                                AS 805 C - Águas Da Serra - JC TEMPORADA{' '}
                                <Badge variant="info"><FaUsers /> 4</Badge>{' '}
                                <Badge variant="info"><FaBed /> 3</Badge>{' '}
                                <Badge variant="info"><FaBath /> 2</Badge>{' '}
                            </Card.Title>

                            <Card.Text>
                                <FaMapMarked /> Avenida Elias Bufaiçal, Gleba 01, s/n, Suite 526, 75696-320 Jardim Belvedere, CALDAS NOVAS GOIÁS, Brasil

                                <div className="tools">
                                    <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-2">
                                        <ToggleButton variant="danger" value={1}>Temporada</ToggleButton>
                                        <ToggleButton variant="danger" value={2}>Venda</ToggleButton>
                                        <ToggleButton variant="danger" value={3}>Locação</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </Card.Text>

                        </Card.Body>

                        <Card.Footer>
                            <small className="text-muted">Última atualização 3 min atrás</small>
                            <Button variant="primary" type="submit">Detalhes</Button>
                        </Card.Footer>
                    </Card>

                </CardGroup>
            </Row>
        </>
    )
}

export default Accommodation