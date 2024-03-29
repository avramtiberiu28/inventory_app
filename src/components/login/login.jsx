import { useState } from "react";
import Axios from "axios";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useAuth } from './AuthContext'; // Asigurați-vă că ați importat corect hook-ul de autentificare
import {Navigate} from 'react-router-dom'

export default function Login() {
    //const API_URL = import.meta.env.VITE_API_URL;
    const { login, isLoggedIn } = useAuth(); // Folosirea hook-ului de autentificare
    

    if(isLoggedIn){
        return (<Navigate to='/home'/>)
    }
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mesaj, setMesaj] = useState('');

    const handleLogin = async () => {
        try {
            const response = await Axios.post(`http://${API_URL}:3002/login`, {
                username: username,
                password: password
            });
            if (response.length !== 0) {
                const rezultat = response.data;
                login(rezultat.token, rezultat.nr_tableta); // Utilizarea token-ului returnat de server pentru autentificare
            } 
            else{
                setMesaj('Numărul de tabletă sau parola sunt incorecte!');
            }
        } 
        catch (error) {
            console.error('Eroare la cerere:', error);
            setMesaj('A apărut o eroare la autentificare. Vă rugăm să încercați din nou.');
        }
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleLogin();
        }
    };


    return (
        <div className="login-box w-full">
            <div className="login-logo">
                <center>
                    <b>FRAHER</b>
                    <br />
                    <small>Inventar Isaccei 115</small>
                    <br />
                    <small>{moment().format('DD-MM-YYYY')}</small>
                </center>
            </div>
            <div className="login-box-body">
                <p className="login-box-msg">Loghează-te pentru a începe sesiunea</p>
                <Form>
                    <Form.Group className="has-feedback my-5" controlId="username">
                        <Form.Control type="text" inputMode="numeric" placeholder="Număr tabletă" onChange={(e) => setUsername(e.target.value)} autoFocus />
                        <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                    </Form.Group>
                    <Form.Group className="has-feedback my-5" controlId="password">
                        <Form.Control type="password" inputMode="numeric" placeholder="Parolă" onChange={(e) => setPassword(e.target.value)} />
                        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                    </Form.Group>
                    <Row>
                        <Col sm={4}>
                            <Button className="btn btn-block btn-flat btn-login-custom" onClick={handleLogin}>Login</Button>
                        </Col>
                    </Row>
                </Form>
                <br />
                {mesaj && (
                    <div className="information-box round">
                        <div className="callout callout-danger">
                            {mesaj}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
