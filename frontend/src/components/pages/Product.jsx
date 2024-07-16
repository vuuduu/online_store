import { useState } from "react";

const Product = ({ car, handleGoBack, handleAddToCart }) => {
    const addToCart = () => {
        console.log(`${car.make} added to cart`);
        handleAddToCart(car);
        handleGoBack();
    };

    return (
        <div className="product-details">
            <h1>{car.make} {car.model}</h1>
            <p><strong>Body Style:</strong> {car.body_style}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Horsepower:</strong> {car.horsepower}</p>
            <p><strong>Rental Price:</strong> ${car.rental_price}</p>
            <p><strong>Engine:</strong> {car.engine}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Curb Weight:</strong> {car.curb_weight} lbs</p>
            <div className="button-products">
                <div className="btn-products" onClick={handleGoBack}>Go Back</div>
                <div className="btn-products" onClick={addToCart}>Add to Cart</div>
            </div>
        </div>
    );
};

export default Product;