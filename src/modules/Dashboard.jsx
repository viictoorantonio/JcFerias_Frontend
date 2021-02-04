import { Row, Col, Card } from 'react-bootstrap'
import { FaChartBar } from 'react-icons/fa'


//Charts components
import BarsLine from '../components/charts/BarsLine'

function Dashboard(){

    return (
        <Row>
            
            <Col>
                <Card>
                    
                    <Card.Title>
                        <FaChartBar /> Perfomace geral
                    </Card.Title>
                    
                    <Card.Body style={{ minHeight: '30rem' }}>
                        <BarsLine  />
                    </Card.Body>
                    
                </Card>
            </Col>

        </Row>
    )
}

export default Dashboard