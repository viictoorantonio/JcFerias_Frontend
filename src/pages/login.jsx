import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'

//Services
import api from '../services/api'

import Logo from '../assets/images/logo.png'

import '../assets/styles/login.css'

function Login() {

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function authentication(e) {
        e.preventDefault()

        api({
            method: 'POST',
            url: '/auth/login',
            data: { email: email, password: password }
        }).then(res => {
            history.push('/home')
            localStorage.setItem('token', res.data.token)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Container fluid="lg" className="content">

            <img src={Logo} alt="JC Férias" className="logo" />

            <div className="content-incluse">

                <Form onSubmit={authentication}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Endereço de e-mail:</Form.Label>
                        <Form.Control type="email" placeholder="Endereço de e-mail" onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            Os dados compartilhados e inserido neste sistema segue um padrão de criptografia.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <a href="/" >Esqueceu a senha?</a>

                    <Button className="shadowBtn" variant="primary" type="submit" size="lg" block>
                        Acessar
                    </Button>
                </Form>

            </div>

        </Container>
    )
}

export default Login