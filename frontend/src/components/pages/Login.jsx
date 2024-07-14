import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login(props) {

    return (
        <div className='login-register-container'>
            <h3>Login to Rent-a-Car</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formLoginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <div className='form-footer'>
                <p>New User?</p>
                <Button className="form-footer-btn" variant="link" onClick={() => props.handleAuthState("register")}>Register</Button>
            </div>
        </div>
    )
}

export default Login;