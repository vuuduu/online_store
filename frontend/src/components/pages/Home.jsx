import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    // this page only accessible if user exist in localStorage
    let storedUser = '';
    const navigate = useNavigate();
    useEffect(() => {
        storedUser = localStorage.getItem('user');
        if (!storedUser) { navigate('/'); }
        else {
            storedUser = JSON.parse(storedUser);
            console.log(storedUser);
        }
    }, [navigate])


    return (
        <>
            <h1> Home Page </h1>
            <Button href="/checkout" variant="primary"> Check Me Out </Button>
        </>

    )
}

export default Home;