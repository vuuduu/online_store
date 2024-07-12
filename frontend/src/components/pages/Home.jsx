import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1> Home Page </h1>
            <Button href="/checkout" variant="primary"> Check Me Out </Button>
        </>

    )
}

export default Home;