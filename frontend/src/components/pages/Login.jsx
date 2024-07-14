import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LOGIN_URL = 'http://localhost:3000/api/login';

function Login(props) {

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
                    username: username,
                    password: password
                })
            });

            console.log(response);
        } catch (err) {
            console.error('There was a problem with the login:', err);
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
        </div>
    )
}

export default Login;