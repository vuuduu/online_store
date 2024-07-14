import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

const REGISTER_URL = 'http://localhost:3000/api/register';

const Register = (props) => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        const username = e.target.formRegisterUsername.value;
        const password = e.target.formRegisterPassword.value;
        const name = e.target.formRegisterName.value;

        console.log(username, password, name);

        // send a POST request to register url
        try {
            const response = await fetch(REGISTER_URL, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    username,
                    password,
                    name
                })
            });

            // check if the response is 201 = Created
            if (response.status === 201) {
                setErrorMsg(null);
                const user_data = await response.json();
                localStorage.setItem('user', JSON.stringify(user_data.user));
                navigate('/home');
            } else {
                setErrorMsg("Failed to Register.");
            }

        } catch (err) {
            console.error('There was a problem with registering:', err);
            setErrorMsg("Failed to Register");
        }

    }

    return (
        <div className='login-register-container'>
            <h3>Register to Rent-a-Car</h3>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formRegisterUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRegisterPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRegisterName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <div className='form-footer'>
                <p>Existing User?</p>
                <Button className="form-footer-btn" variant="link" onClick={() => props.handleAuthState("login")}>Login</Button>
            </div>
            {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
        </div>
    )
}

export default Register