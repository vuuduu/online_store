const ListItem = ({ carData, handleCarSelect }) => {
    return (
        <>
            <div className='car-header'>
                <div className="car-item">Make</div>
                <div className="car-item">Body Style</div>
                <div className="car-item">Year</div>
                <div className="car-item">Rental Price</div>
            </div>
            {carData.map(car => (
                <div className='car-group' key={car.id} onClick={() => handleCarSelect(car)}>
                    <div className="car-item">{car.make}</div>
                    <div className="car-item">{car.body_style}</div>
                    <div className="car-item">{car.year}</div>
                    <div className="car-item">${car.rental_price}</div>
                </div>
            ))}
        </>
    );
};

export default ListItem;