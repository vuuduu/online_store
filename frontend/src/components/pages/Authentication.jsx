import Login from "./Login";
import Register from "./Register";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './pages.css'

const Authentication = () => {
    // check localStorage if user already exist
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            navigate('/home');
        }
    }, [navigate]);

    // Handle display of login or register 
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