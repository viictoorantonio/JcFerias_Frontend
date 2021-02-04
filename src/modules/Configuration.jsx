import { Row, Col, Card, Button, Accordion } from 'react-bootstrap'
import { FaUsers } from 'react-icons/fa'

//Modal

function Configuration() {


    return (
        <>
            <Row>
                <Col>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} eventKey="0">
                                    <FaUsers /> Usuários
                                </Accordion.Toggle>
                            </Card.Header>

                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Click me!
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body>Hello! I'm another body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
            </Row>
        </>
    )
}

export default Configuration