import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import ProfileSideBar from '../elements/ProfileSideBar';
import MainHomeContent from '../elements/MainHomeContent';

import './pages.css';

const Home = () => {
    const navigate = useNavigate();
    const [homeView, setHomeView] = useState('gallery');
    const [storedUser, setStoredUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
        } else {
            setStoredUser(user);
        }
    }, [navigate]);

    const handleViewChange = (view) => {
        setHomeView(view);
    }


    return (
        <div className='home-container'>
            <ProfileSideBar storedUser={storedUser} handleViewChange={handleViewChange} homeView={homeView} />

            <div className="main-content-container">
                <MainHomeContent handleViewChange={handleViewChange} homeView={homeView} />
            </div>
        </div>
    )
}

export default Home;