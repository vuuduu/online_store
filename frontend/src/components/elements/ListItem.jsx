const ListItem = (props) => {
    return (
        <>

            <div className='car-header'>
                <div className="car-item">Make</div>
                <div className="car-item">Body Style</div>
                <div className="car-item">Year</div>
                <div className="car-item">Rental Price</div>
            </div>
            {props.carData.map(car => (
                <div className='car-group'>
                    <div className="car-item">{car.make}</div>
                    <div className="car-item">{car.body_style}</div>
                    <div className="car-item">{car.year}</div>
                    <div className="car-item">${car.rental_price}</div>
                </div>
            ))}
        </>
    )
}

export default ListItem;