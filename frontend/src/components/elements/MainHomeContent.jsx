import cartIcon from '../../assets/shopping-cart-icon.png';

const MainHomeContent = (props) => {
    const handleHistoryTab = () => {
        // props.handleViewChange('history');
    }

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
                {props.homeView === 'gallery' && <h1>Gallery</h1>}
                {props.homeView === 'suggest' && <h1>Suggest</h1>}
            </div>
        </>
    )
}

export default MainHomeContent;