# 🚀 Deployment Guide - TrendLoop Visual Pulse

Your app is now configured for easy deployment with integrated Stripe payments! No need for separate backend hosting.

## 📋 Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Add Stripe integration"
   git push
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables:
     ```
     STRIPE_SECRET_KEY=sk_live_your_live_key_here
     VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
     ```

3. **That's it!** Your API routes will work at:
   - `https://yourapp.vercel.app/api/create-checkout-session`

### Option 2: Netlify

1. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `dist` folder OR connect to GitHub
   - Add environment variables in Site Settings

2. **API routes work at:**
   - `https://yourapp.netlify.app/.netlify/functions/create-checkout-session`

### Option 3: Wix (Static Hosting)

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Upload to Wix:**
   - In Wix Editor, go to Settings → Custom Code
   - Upload your `dist` folder contents
   - **Important:** Wix doesn't support serverless functions

3. **For Stripe integration on Wix:**
   - Use Wix's built-in payment system, OR
   - Deploy backend separately (Vercel/Netlify for API only)
   - Update API calls to point to external backend

4. **Alternative approach:**
   - Host frontend on Wix
   - Deploy API functions to Vercel/Netlify
   - Update Pricing component to call external API:
     ```javascript
     const response = await fetch('https://yourapi.vercel.app/api/create-checkout-session', {
       // ... rest of code
     });
     ```

### Option 4: Traditional Hosting (cPanel, etc.)

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder** to your web hosting

3. **For API routes**, you'll need to:
   - Upload the `server` folder to your hosting
   - Install Node.js on your server
   - Run the backend separately

## 🔑 Environment Variables for Production

**Important:** Update these for live payments:

```env
# Live Stripe Keys (NOT test keys)
STRIPE_SECRET_KEY=sk_live_your_actual_live_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_live_key

# Your production domain
VITE_APP_URL=https://trend-loop.netlify.app

# For Wix deployments with external API
VITE_API_BASE_URL=https://yourapi.vercel.app
```

## 🧪 Testing in Production

1. **First deploy with TEST keys** to verify everything works
2. **Test a payment** using test card `4242 4242 4242 4242`
3. **Switch to LIVE keys** only when ready for real payments

## 📝 Quick Start Commands

```bash
# Development (with proxy)
npm run start:all

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 How It Works

### Development
- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3001` 
- API calls proxied automatically

### Production
- Frontend and API routes served from same domain
- No CORS issues
- Serverless functions handle payments
- Automatic scaling

## ✅ Deployment Checklist

- [ ] Environment variables set correctly
- [ ] Test payment flow works
- [ ] Live Stripe keys configured
- [ ] Domain SSL certificate active
- [ ] Webhook endpoints configured (optional)

## 🔧 Troubleshooting

**API not working after deployment?**
- Check environment variables are set
- Verify Stripe keys are correct
- Check function logs in hosting dashboard

**CORS errors?**
- Make sure you're using the same domain for frontend and API
- Check headers in serverless functions

**Wix limitations?**
- Wix doesn't support serverless functions
- Deploy API separately (Vercel/Netlify)
- Use external API endpoints for Stripe integration
- Consider Wix's native payment system as alternative

**Payments failing?**
- Verify you're using live keys for production
- Check Stripe Dashboard for error logs
- Ensure products/prices exist in live mode

---

🎉 **Your app is now production-ready with integrated Stripe payments!**
