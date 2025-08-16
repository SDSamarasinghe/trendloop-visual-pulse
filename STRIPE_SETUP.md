# Stripe Integration Setup Guide

## 🚀 Quick Start Guide

### 1. Create Stripe Account
1. Go to [https://stripe.com](https://stripe.com)
2. Click "Start now" to create an account
3. Complete the registration process

### 2. Get API Keys
1. Log into your Stripe Dashboard
2. Go to "Developers" → "API keys"
3. Copy your **Publishable key** (starts with `pk_test_`)
4. Copy your **Secret key** (starts with `sk_test_`)

### 3. Update Environment Variables
Edit the `.env` file in your project root:

```env
# Replace these with your actual Stripe keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
```

### 4. Create Products and Prices in Stripe

You have two options:

#### Option A: Manual Setup (Recommended for beginners)
1. In Stripe Dashboard, go to "Products"
2. Click "Add product"
3. Create these 6 products with prices:

**Starter Plan:**
- Monthly: $99/month (recurring)
- Yearly: $990/year (recurring)

**Professional Plan:**
- Monthly: $199/month (recurring) 
- Yearly: $1990/year (recurring)

**Enterprise Plan:**
- Monthly: $399/month (recurring)
- Yearly: $3990/year (recurring)

4. Copy the Price IDs and update the `Pricing.tsx` component:
```tsx
monthlyPriceId: 'price_1234567890abcdef', // Replace with actual IDs
yearlyPriceId: 'price_0987654321fedcba',
```

#### Option B: Automated Setup (Advanced)
Use our backend endpoint to create prices:

```bash
# Start the server first
npm run server

# Then create prices using curl:
curl -X POST http://localhost:3001/create-price \
  -H "Content-Type: application/json" \
  -d '{"productName":"Starter Plan Monthly","amount":99,"interval":"month"}'
```

### 5. Running the Application

#### Start both frontend and backend:
```bash
npm run start:all
```

#### Or start them separately:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend  
npm run server
```

### 6. Testing Payments

1. Visit http://localhost:5173
2. Go to the pricing section
3. Click any "Choose Plan" button
4. Use Stripe test card numbers:
   - **Success:** 4242 4242 4242 4242
   - **Decline:** 4000 0000 0000 0002
   - Use any future date for expiry
   - Use any 3-digit CVC

### 7. View Test Transactions
- Go to Stripe Dashboard → "Payments"
- All test transactions will appear here

## 🔧 Troubleshooting

### Common Issues:

1. **"Server not running" error:**
   - Make sure to run `npm run server` first
   - Check if port 3001 is available

2. **Stripe keys not working:**
   - Ensure you're using TEST keys (pk_test_ and sk_test_)
   - Check that .env file is in project root
   - Restart the server after updating .env

3. **Price ID errors:**
   - Verify price IDs in Stripe Dashboard match your code
   - Make sure prices are set to "recurring" not "one-time"

### Support Commands:

```bash
# Check server health
curl http://localhost:3001/health

# List all prices
curl http://localhost:3001/prices

# View server logs
npm run server:dev  # Uses nodemon for auto-restart
```

## 🚨 Important Notes

- **Never commit real API keys to git**
- Always use test keys during development
- Test mode transactions don't charge real money
- Switch to live keys only when ready for production

## Next Steps

1. Complete the setup above
2. Test a few transactions
3. Customize the pricing plans
4. Add webhook handling for subscription events
5. Implement user dashboard for subscription management
