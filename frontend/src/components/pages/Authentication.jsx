import Login from "./Login";
import Register from "./Register";
import { useState } from "react";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './pages.css'

const Authentication = () => {
    const [authState, setAuthState] = useState("login");

    const handleAuthState = (updateAuth) => {
        setAuthState(updateAuth);
    }

    return (
        <div className="auth-container">
            {
                authState === 'login' ? <Login handleAuthState={handleAuthState} /> : <Register handleAuthState={handleAuthState} />
            }
        </div>
    )
}

export default Authentication;