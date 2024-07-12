import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1> The Best Place to Rent a Car </h1>
            <Button href="/checkout" variant="primary"> Check Me Out </Button>
        </>

    )
}

export default Home;