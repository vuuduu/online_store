import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { useState } from 'react';

import './elements.css';

const CHECKOUT_URL = 'http://localhost:3000/api/checkout';

const Cart = ({ cartItems, handleCartsChange, handleRemoveFromCart }) => {
    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        postCode: '',
        country: ''
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardType: '',
        cvv: '',
        expDate: ''
    });

    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    // UPDATE THE SHIPPING AND PAYMENT STATES
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('shipping')) {
            setShippingInfo(prevShippingInfo => ({
                ...prevShippingInfo,
                [name.split('-')[1]]: value
            }));
        } else if (name.startsWith('payment')) {
            setPaymentInfo(prevPaymentInfo => ({
                ...prevPaymentInfo,
                [name.split('-')[1]]: value
            }));
        }
    }

    const handleCheckout = (e) => {
        e.preventDefault();
        const { address, city, postalCode, country } = shippingInfo;
        const { cardNumber, cardType, cvv, expDate } = paymentInfo;

        // Check if all fields are filled.
        if (!address || !city || !postalCode || !country || !cardNumber || !cardType || !cvv || !expDate) {
            setErrorMsg('ALL FIELDS NEED ARE REQUIRED');
            setSuccessMsg(null);
            return;
        }

        // check for cart items
        if (cartItems.length === 0) {
            setErrorMsg('YOUR CART IS EMPTY!');
            setSuccessMsg(null);
            return;
        }

        checkoutCarts();
    }

    const checkoutCarts = async () => {
        const user = await JSON.parse(localStorage.getItem('user'));

        const checkoutData = {
            "userId": user.user_id,
            "address": shippingInfo.address,
            "payment": paymentInfo.cardType,
            "cars": cartItems.map((car) => car.id)
        };

        try {
            // send a post request to the server
            const response = await fetch(CHECKOUT_URL, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(checkoutData)
            });
            // check if the data is ok
            if (response.status === 201) {
                setErrorMsg(null);
                setSuccessMsg(`Successfully Checkout ${cartItems.length} rental cars`);

                // remove cars from cartItems
                handleCartsChange([]);
            } else {
                setErrorMsg('Failed to Log In');
                setSuccessMsg(null);
            }


        } catch (err) {
            setErrorMsg('Failed to Checkout');
            setSuccessMsg(null);
            console.error('There was a problem with Checkout:', err);
        }
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
                                <Form.Control
                                    type="text"
                                    name="shipping-address"
                                    value={shippingInfo.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter your address"
                                />
                            </Form.Group>
                            <Form.Group controlId="cityInput">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="shipping-city"
                                    value={shippingInfo.city}
                                    onChange={handleInputChange}
                                    placeholder="Enter your city"
                                />
                            </Form.Group>
                            <Form.Group controlId="postalCodeInput">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="shipping-postalCode"
                                    value={shippingInfo.postalCode}
                                    onChange={handleInputChange}
                                    placeholder="Enter your postal code"
                                />
                            </Form.Group>
                            <Form.Group controlId="countryInput">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="shipping-country"
                                    value={shippingInfo.country}
                                    onChange={handleInputChange}
                                    placeholder="Enter your country"
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="payment-info">
                        <div className="payment-header">Payment</div>
                        <div className="payment-details">
                            <Form.Group controlId="cardNumberInput">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="payment-cardNumber"
                                    value={paymentInfo.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter your card number"
                                />
                            </Form.Group>
                            <Form.Group controlId="cardTypeInput">
                                <Form.Label>Card Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="payment-cardType"
                                    value={paymentInfo.cardType}
                                    onChange={handleInputChange}
                                    placeholder="Enter your card type"
                                />
                            </Form.Group>
                            <Form.Group controlId="cvvInput">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="payment-cvv"
                                    value={paymentInfo.cvv}
                                    onChange={handleInputChange}
                                    placeholder="Enter your CVV"
                                />
                            </Form.Group>
                            <Form.Group controlId="expDateInput">
                                <Form.Label>Expiration Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="payment-expDate"
                                    value={paymentInfo.expDate}
                                    onChange={handleInputChange}
                                    placeholder="Enter your card expiration date"
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <Button variant="dark" type='submit'>Checkout</Button>
                </Form>

                {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
                {successMsg && <Alert variant='success'>{successMsg}</Alert>}
            </div>

            <div className="cart-details-right">
                <h3>Order Summary</h3>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cartItems.map((car, index) => (
                            <li key={index}>
                                {car.make} {car.body_style} - ${car.rental_price}
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