require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Create checkout session endpoint
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, planName, billingPeriod } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.VITE_APP_URL || 'http://localhost:5173'}?success=true&plan=${encodeURIComponent(planName)}`,
      cancel_url: `${process.env.VITE_APP_URL || 'http://localhost:5173'}?canceled=true`,
      metadata: {
        planName,
        billingPeriod,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create price endpoint (for testing)
app.post('/create-price', async (req, res) => {
  try {
    const { productName, amount, currency = 'usd', interval = 'month' } = req.body;

    // First create a product
    const product = await stripe.products.create({
      name: productName,
    });

    // Then create a price for the product
    const price = await stripe.prices.create({
      unit_amount: amount * 100, // Convert to cents
      currency: currency,
      recurring: { interval: interval },
      product: product.id,
    });

    res.json({ 
      productId: product.id, 
      priceId: price.id,
      amount: amount,
      currency: currency,
      interval: interval
    });
  } catch (error) {
    console.error('Error creating price:', error);
    res.status(500).json({ error: error.message });
  }
});

// List all prices (for debugging)
app.get('/prices', async (req, res) => {
  try {
    const prices = await stripe.prices.list({
      limit: 100,
      expand: ['data.product'],
    });
    res.json(prices);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint for Stripe events
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment successful:', session);
      // Handle successful payment here
      break;
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      console.log('Invoice payment succeeded:', invoice);
      // Handle successful recurring payment
      break;
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      console.log('Invoice payment failed:', failedInvoice);
      // Handle failed payment
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
