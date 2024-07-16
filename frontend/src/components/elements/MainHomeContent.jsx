import ListItem from './ListItem';
import Product from '../pages/Product';
import Cart from './Cart';

import cartIcon from '../../assets/shopping-cart-icon.png';

import './elements.css';

const MainHomeContent = ({ homeView, carData, cart, selectedCar, handleViewChange, handleCarSelect, handleGoBack, handleAddToCart, handleRemoveFromCart, handleCartsChange }) => {
    const handleViewClick = (view) => {
        handleViewChange(view);
        handleGoBack();
    }

    return (
        <>
            <div className="main-content-top">
                <h3>Rent-A-Car</h3>
                <div className='main-content-right'>
                    <div className='history-tab' onClick={() => handleViewClick('history')}>History</div>
                    <div className='cart-tab'>
                        <img src={cartIcon} alt="Cart" className='cart-icon' onClick={() => handleViewClick('cart')} />
                    </div>
                </div>
            </div>
            {homeView === 'cart' ? (<Cart cartItems={cart} handleCartsChange={handleCartsChange} handleRemoveFromCart={handleRemoveFromCart}></Cart>) :
                <div className="main-content-products">
                    {!selectedCar ? (
                        <>
                            <div className="main-content-header">
                                <div className="main-content-title-filter">
                                    {homeView === 'gallery' && <h3>Gallery Listing</h3>}
                                    {homeView === 'suggested' && <h3>Suggest Listing</h3>}
                                    {homeView === 'history' && <h3>History Listing</h3>}
                                </div>
                            </div>
                            <ListItem carData={carData} handleCarSelect={handleCarSelect} />
                        </>
                    ) : (
                        <Product car={selectedCar} handleGoBack={handleGoBack} handleAddToCart={handleAddToCart} />
                    )}
                </div>
            }
        </>
    );
};

export default MainHomeContent;