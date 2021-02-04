import { Container } from 'react-bootstrap'

//Modules
import Dashboard from '../modules/Dashboard'
import Accommodation from '../modules/Accommodation'
import Customers from '../modules/Customers'
import Configuration from '../modules/Configuration'

//Components
import Sidebar from '../components/Sidebar'

//Styles
import '../assets/styles/home.css'

function Home() {

    const module = localStorage.getItem('module')

    function renderModule(param) {
        switch (param) {
            case 'Dashboard':
                {document.title = 'JC Férias - Dashboard'}
                return <Dashboard />
            case 'Accommodation':
                {document.title = 'JC Férias - Acomodações'}
                return <Accommodation />
            case 'People':
                {document.title = 'JC Férias - Pessoas'}
                return <Customers />
            case 'Configuration':
                {document.title = 'JC Férias - Configurações'}
                return <Configuration />
            default:
                return <Dashboard />
        }
    }

    return (
        <>

            <Sidebar />

            <Container style={{ paddingLeft: '4rem' }}>
                {renderModule(module)}
            </Container>

        </>
    )
}

export default Home