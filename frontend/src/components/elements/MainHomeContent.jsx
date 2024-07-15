const MainHomeContent = (props) => {
    return (
        <>
            <div className="main-content-top">
                <div>Rent-A-Car</div>
                <div className='main-content-right'>
                    <div>History</div>
                    <div>Carts</div>
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