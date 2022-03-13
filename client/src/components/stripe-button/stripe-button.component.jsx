import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HzOoVKixQBL1iGal7mW320sgO321uzz9VDNhpXOemtf8a0kHoJ3toS5vEJWCv22vy2gRiBQihmLksBpnBLY3cYx009KWoCMBm';

    const onToken = token => { 
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(res => {
            alert('Payment successful!')
        }).catch(err => {
            console.log('Payment failed: ', JSON.parse(err))
            alert('There was an issue with your payment!')
        })
    }
    
    return (
        <StripeCheckout 
            label='Pay Now'
            name='Crown Clothing Ltd.'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;