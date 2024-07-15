import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const LOGIN_URL = 'http://localhost:3000/api/login';

function Login(props) {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.formLoginUsername.value;
        const password = e.target.formLoginPassword.value

        try {
            // send a post request to the server
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            // check if the data is ok
            if (response.ok) {
                setErrorMsg(null);
                const user_data = await response.json();
                localStorage.setItem('user', JSON.stringify(user_data.user));
                navigate('/home');
            } else {
                setErrorMsg('Failed to Log In');
            }
        } catch (err) {
            setErrorMsg('Failed to Log In');
            console.error('There was a problem with logging in:', err);
        }
    }


    return (
        <div className='login-register-container'>
            <h3>Login to Rent-a-Car</h3>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formLoginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Login
                </Button>
            </Form>
            <div className='form-footer'>
                <p>New User?</p>
                <Button className="form-footer-btn" variant="link" onClick={() => props.handleAuthState("register")}>Register</Button>
            </div>
            {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
        </div>
    )
}

export default Login;