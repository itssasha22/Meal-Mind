# Stripe Integration Setup Guide

This guide helps you complete the Stripe payment integration for Visa and Mastercard.

## Frontend Setup (Already Done)

✅ Stripe Elements integrated in `src/components/Payment.jsx`

- Loads Stripe.js v3
- Creates card input element
- Handles payment method creation
- Shows PayPal / Visa / Mastercard selector

## Backend Setup (Required)

You need to create a backend endpoint at `/api/create-payment-intent` that:

1. Receives a POST request with amount (999 cents = $9.99)
2. Creates a Stripe PaymentIntent using your **Secret Key**
3. Returns the client secret to the frontend

### Option A: Node.js/Express Backend

```javascript
// routes/payments.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 999, // $9.99 in cents
      currency: 'usd',
      description: 'NutriPlate Premium Access',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
```

Then in your main server:

```javascript
const paymentRoutes = require('./routes/payments');
app.use('/api', paymentRoutes);
```

### Option B: Python/Flask Backend

```python
# app.py
import stripe
import os
from flask import Flask, jsonify, request

app = Flask(__name__)
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

@app.route('/api/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        intent = stripe.PaymentIntent.create(
            amount=999,  # $9.99 in cents
            currency='usd',
            description='NutriPlate Premium Access',
        )
        return jsonify({'clientSecret': intent.client_secret})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
```

## Environment Variables

Set these in your backend `.env` file:

```bash
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
```

## Get Your Stripe Keys

1. Create a free Stripe account: https://dashboard.stripe.com
2. Go to **Developers > API Keys**
3. Copy your **Publishable Key** (starts with `pk_test_`)
4. Copy your **Secret Key** (starts with `sk_test_`)

## Update Frontend Publishable Key

In `src/components/Payment.jsx`, update this line with YOUR publishable key:

```javascript
const stripeInstance = StripeClass('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
```

## Update Payment Handler (Optional)

Currently, the frontend creates a payment method but doesn't send it to the backend. To enable real payments, update `handleStripePayment` to call your endpoint:

```javascript
// Replace the mock setTimeout with:
const response = await fetch('/api/create-payment-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 999 }),
});

const { clientSecret } = await response.json();

const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: pm.id,
});

if (error) {
  setStatus(`Payment failed: ${error.message}`);
} else {
  setStatus(`Payment completed! Transaction ID: ${paymentIntent.id}`);
}
```

## Testing

Use Stripe test card numbers:

- **Visa**: 4242 4242 4242 4242
- **Mastercard**: 5555 5555 5555 4444
- **Expiry**: Any future date (e.g., 12/25)
- **CVV**: Any 3 digits (e.g., 123)

## Live Mode

Once you're ready for production:

1. Upgrade your Stripe account (verify identity)
2. Switch to live keys (starts with `pk_live_` and `sk_live_`)
3. Update your frontend and backend with live keys
4. Remove test cards from your payment method options

## Support

- Stripe Docs: https://stripe.com/docs
- React Stripe: https://stripe.com/docs/stripe-js/react
