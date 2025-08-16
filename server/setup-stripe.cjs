require('dotenv').config({ path: '../.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createAllPrices() {
  console.log('🚀 Creating TrendLoop subscription plans in Stripe...\n');

  const plans = [
    // Starter Plans
    { name: 'TrendLoop Starter Monthly', amount: 99, interval: 'month' },
    { name: 'TrendLoop Starter Yearly', amount: 990, interval: 'year' },
    
    // Professional Plans  
    { name: 'TrendLoop Professional Monthly', amount: 199, interval: 'month' },
    { name: 'TrendLoop Professional Yearly', amount: 1990, interval: 'year' },
    
    // Enterprise Plans
    { name: 'TrendLoop Enterprise Monthly', amount: 399, interval: 'month' },
    { name: 'TrendLoop Enterprise Yearly', amount: 3990, interval: 'year' }
  ];

  const priceIds = {};

  for (const plan of plans) {
    try {
      console.log(`Creating ${plan.name}...`);
      
      // Create product
      const product = await stripe.products.create({
        name: plan.name,
        description: `${plan.name.includes('Starter') ? 'Perfect for small businesses' : 
                      plan.name.includes('Professional') ? 'Ideal for growing businesses' : 
                      'Complete solution for large organizations'}`
      });

      // Create price
      const price = await stripe.prices.create({
        unit_amount: plan.amount * 100, // Convert to cents
        currency: 'usd',
        recurring: { interval: plan.interval },
        product: product.id,
      });

      // Store the price ID with a cleaner key
      const keyName = plan.name
        .replace('TrendLoop ', '')
        .replace(' ', '_')
        .toLowerCase();
      
      priceIds[keyName] = price.id;
      
      console.log(`✅ ${plan.name}: ${price.id}`);
      
    } catch (error) {
      console.error(`❌ Error creating ${plan.name}:`, error.message);
    }
  }

  console.log('\n🎉 All plans created! Here are your price IDs:\n');
  console.log('Copy these into your Pricing.tsx component:\n');
  
  console.log('monthlyPriceId: {');
  console.log(`  starter: '${priceIds.starter_monthly}',`);
  console.log(`  professional: '${priceIds.professional_monthly}',`);
  console.log(`  enterprise: '${priceIds.enterprise_monthly}'`);
  console.log('},');
  
  console.log('\nyearlyPriceId: {');
  console.log(`  starter: '${priceIds.starter_yearly}',`);
  console.log(`  professional: '${priceIds.professional_yearly}',`);
  console.log(`  enterprise: '${priceIds.enterprise_yearly}'`);
  console.log('}');

  return priceIds;
}

// Run the script
createAllPrices()
  .then(() => {
    console.log('\n✨ Setup complete! You can now test payments.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Setup failed:', error);
    process.exit(1);
  });
