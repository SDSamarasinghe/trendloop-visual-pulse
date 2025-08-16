import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key (starts with pk_test_)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export default stripePromise;

// Stripe API configuration
export const stripeConfig = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  apiVersion: '2023-10-16' as const,
};
