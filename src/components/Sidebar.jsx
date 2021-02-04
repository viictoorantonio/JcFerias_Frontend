import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, FormControl, Button } from 'react-bootstrap'
import { FaCogs, FaBed, FaCalendarTimes, FaUsers, FaMoneyBill, FaChartBar, FaPercent, FaAngleLeft, FaAngleRight, FaSearch, FaHome } from 'react-icons/fa'

//Styles
import '../assets/styles/components/sidebar.css'

//Images
import Logo from '../assets/images/logo.png'

function Sidebar() {

    const history = useHistory()

    function pathnameSubscribe(path){
        localStorage.setItem('module', path.target.dataset.name)
        history.push('/home')
        setShow(false)
    }

    const [show, setShow] = useState(false)

    return (
        <>
            {show ? (
                <>
                    <aside className="shadowForceDiv">
                        <div onClick={() => setShow(false)} className="header-aside">
                            <p id="arrowLeft" onClick={() => setShow(false)} ><FaAngleLeft onClick={() => setShow(false)} /></p>
                        </div>

                        <div className="component-aside">
                            <a onClick={pathnameSubscribe} data-name="Dashboard"> <FaHome/> Início</a>
                            <a onClick={pathnameSubscribe} data-name="Accommodation"> <FaBed/> Acomodação</a>
                            <a onClick={pathnameSubscribe}> <FaCalendarTimes/> Caledario geral</a>
                            <a onClick={pathnameSubscribe}> <FaPercent/> Ofertas e promoções</a>
                            <a onClick={pathnameSubscribe}> <FaMoneyBill/> Financeiro</a>
                            <a onClick={pathnameSubscribe}> <FaChartBar/> Estatística</a>
                            <a onClick={pathnameSubscribe} data-name="People"> <FaUsers/> Pessoas</a>
                            <a onClick={pathnameSubscribe} data-name="Configuration"> <FaCogs/> Configurações</a>
                        </div>

                        <img src={Logo} alt="JC Férias" className="logo"/>

                    </aside>

                    <header className="openSideHeader shadowDiv">

                        <Form inline>
                            <FormControl type="text" placeholder="Pesquisar" className="mr-sm-2" />
                            <Button variant="primary"> <FaSearch /> </Button>
                        </Form>

                    </header>
                </>
            ) : (
                    <>
                        <aside className="leave shadowForceDiv">
                            <div onClick={() => setShow(true)} className="header-aside">
                                <p id="arrowRight" onClick={() => setShow(true)} ><FaAngleRight onClick={() => setShow(true)} /></p>
                            </div>
                        </aside>

                        <header className="shadowDiv">

                            <Form inline>
                                <FormControl type="text" placeholder="Pesquisar" className="mr-sm-2" />
                                <Button variant="primary" > <FaSearch /> </Button>
                            </Form>

                        </header>
                    </>
                )}
        </>
    )
}
export default Sidebar