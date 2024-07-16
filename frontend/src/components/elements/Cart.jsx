import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './elements.css';

const Cart = ({ cartItems, handleRemoveFromCart }) => {
    const handleCheckout = (e) => {
        e.preventDefault();
        console.log(e);
    }

    return (
        <div className="cart-details">
            <div className="cart-details-left">
                <Form onSubmit={handleCheckout}>
                    <h1 className='cart-summary'>Cart Summary</h1>
                    <div className="shipping-info">
                        <div className="shipping-header">Shipping</div>
                        <div className="shipping-address">
                            <Form.Group controlId="addressInput">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter your address" />
                            </Form.Group>
                            <Form.Group controlId="cityInput">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="Enter your city" />
                            </Form.Group>
                            <Form.Group controlId="pcInput">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter your postal code" />
                            </Form.Group>
                            <Form.Group controlId="countryInput">
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" placeholder="Enter your country" />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="payment-info">
                        <div className="payment-header">Payment</div>
                        <div className="payment-details">
                            <Form.Group controlId="cardNumberInput">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter your number" />
                            </Form.Group>
                            <Form.Group controlId="cityInput">
                                <Form.Label>Card Type</Form.Label>
                                <Form.Control type="text" placeholder="Enter your card type" />
                            </Form.Group>
                            <Form.Group controlId="pcInput">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control type="text" placeholder="Enter your card cvv" />
                            </Form.Group>
                            <Form.Group controlId="countryInput">
                                <Form.Label>Expiration Data</Form.Label>
                                <Form.Control type="text" placeholder="Enter your card exp date" />
                            </Form.Group>
                        </div>
                    </div>

                    <Button variant="dark" type='submit'>Checkout</Button>
                </Form>
            </div>

            <div className="cart-details-right">
                <h3>Order Summary</h3>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                {item.make} {item.model} - ${item.rental_price}
                                <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Cart;