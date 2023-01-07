import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_key);

const Payment = () => {
    const booking = useLoaderData();
    const { treatment, price } = booking;
    //console.log('booking data', bookings)
    return (
        <div>
            <h2 className="text-xl">Make payment for {treatment}</h2>
            <p>Amount : ${price}</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    booking={booking} />
            </Elements>
        </div>
    );
};

export default Payment;