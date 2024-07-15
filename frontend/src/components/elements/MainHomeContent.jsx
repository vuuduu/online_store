import ListItem from './ListItem';

import cartIcon from '../../assets/shopping-cart-icon.png';

import './elements.css';

const MainHomeContent = (props) => {
    console.log(props.carData);

    return (
        <>
            <div className="main-content-top">
                <div>Rent-A-Car</div>
                <div className='main-content-right'>
                    <div className='history-tab' onClick={() => handleHistoryTab}>History</div>
                    <div className='cart-tab'>
                        <img src={cartIcon} alt="Cart" className='cart-icon' />
                    </div>
                </div>
            </div>
            <div className="main-content-products">
                <div className="main-content-header">
                    <div className="main-content-title-filter">
                        {props.homeView === 'gallery' && <h3>Gallery Listing</h3>}
                        {props.homeView === 'suggest' && <h3>Suggest Listing</h3>}
                        {props.homeView === 'history' && <h3>History Listing</h3>}
                    </div>
                </div>
                <ListItem carData={props.carData} />
            </div>
        </>
    )
}

export default MainHomeContent;