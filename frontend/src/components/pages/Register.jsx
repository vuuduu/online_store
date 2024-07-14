import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = (props) => {

    const handleRegister = (e) => {
        e.preventDefault();
        const username = e.target.formRegisterUsername.value;
        const password = e.target.formRegisterPassword.value;
        const name = e.target.formRegisterName;

        console.log(username, password, name);

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
        </div>
    )
}

export default Register