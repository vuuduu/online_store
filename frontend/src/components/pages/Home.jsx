import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import ProfileSideBar from '../elements/ProfileSideBar';
import MainHomeContent from '../elements/MainHomeContent';

import './pages.css';

const GALLERY_VIEW = 'gallery';
const SUGGEST_VIEW = 'suggested';
const HISTORY_VIEW = 'history';


const Home = () => {
    const navigate = useNavigate();
    const [homeView, setHomeView] = useState('gallery');
    const [carData, setcarData] = useState([]);
    const [storedUser, setStoredUser] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [cart, setCart] = useState([]);

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
        var fetchURL = '';
        if (homeView === GALLERY_VIEW) {
            fetchURL = `http://localhost:3000/api/${homeView}`;
        } else if (homeView === HISTORY_VIEW || homeView === SUGGEST_VIEW) {
            fetchURL = `http://localhost:3000/api/${homeView}/${storedUser.user_id}`;
        }

        console.log("FETCH: ", fetchURL);

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

    // HANDLE CAR PRODUCT PAGE
    const handleCarSelect = (car) => {
        setSelectedCar(car);
    }

    const handleGoBack = () => {
        setSelectedCar(null);
    }

    // CART HANDLING
    const handleAddToCart = (car) => {
        setCart([...cart, car]);
    }

    const handleRemoveFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1); // start at the delete item index and delete 1 item. 
        setCart(newCart);
    }

    const handleCartsChange = (cartInput) => {
        setCart(cartInput);
    }

    return (
        <div className='home-container'>
            <ProfileSideBar storedUser={storedUser} handleViewChange={handleViewChange} homeView={homeView} handleLogout={handleLogout} handleGoBack={handleGoBack} />
            <div className="main-content-container">
                <MainHomeContent
                    homeView={homeView}  // be able to update home view (history, gallery, or suggest)
                    carData={carData}   // list of viewing car data
                    cart={cart}         // list of cart items
                    selectedCar={selectedCar} // current car select. Can be null if non selected
                    handleViewChange={handleViewChange}
                    handleCarSelect={handleCarSelect}
                    handleGoBack={handleGoBack}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleCartsChange={handleCartsChange} />
            </div>
        </div>
    )
}

export default Home;