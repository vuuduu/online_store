import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import ProfileSideBar from '../elements/ProfileSideBar';
import MainHomeContent from '../elements/MainHomeContent';

import './pages.css';

const Home = () => {
    const navigate = useNavigate();
    const [homeView, setHomeView] = useState('gallery');
    const [carData, setcarData] = useState([]);
    const [storedUser, setStoredUser] = useState(null);

    useEffect(() => { // check for the existing user w/in user storage
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
        } else {
            setStoredUser(user);
        }
    }, [navigate]);

    useEffect(() => { // fetch data for main content viewing
        console.log(homeView);
        fetchData();
    }, [homeView]);

    // fetch function
    const fetchData = async () => { // update parameter 
        // const fetchURL = `http://localhost:3000/api/${homeView}`;
        const fetchURL = 'http://localhost:3000/api/allCars';
        const fetchData = await fetch(fetchURL).then(res => res.json());
        setcarData(fetchData);
    }

    const handleViewChange = (view) => {
        setHomeView(view);
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <div className='home-container'>
            <ProfileSideBar storedUser={storedUser} handleViewChange={handleViewChange} homeView={homeView} handleLogout={handleLogout} />

            <div className="main-content-container">
                <MainHomeContent handleViewChange={handleViewChange} homeView={homeView} carData={carData} />
            </div>
        </div>
    )
}

export default Home;