import { useState } from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import stripePromise from '@/lib/stripe';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      description: 'Perfect for small businesses and startups',
      icon: Star,
      monthlyPrice: 99,
      yearlyPrice: 990,
      monthlyPriceId: 'price_1Rweuz0aNH02uRnnTQqkhFAF', // Real Stripe price ID
      yearlyPriceId: 'price_1Rweuz0aNH02uRnnr6MixpQL',
      features: [
        '5 Social Media Posts per month',
        '2 Short Reels/TikToks',
        'Basic Photo Editing',
        'Email Support',
        '1 Revision per project',
        'Standard Resolution'
      ],
      popular: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'professional',
      name: 'Professional Plan',
      description: 'Ideal for growing businesses and content creators',
      icon: Zap,
      monthlyPrice: 199,
      yearlyPrice: 1990,
      monthlyPriceId: 'price_1Rwev00aNH02uRnnq4WMcJ08', // Real Stripe price ID
      yearlyPriceId: 'price_1Rwev10aNH02uRnnD3kup5OB',
      features: [
        '15 Social Media Posts per month',
        '8 Short Reels/TikToks',
        'Advanced Photo & Video Editing',
        'Priority Support',
        '3 Revisions per project',
        '4K Resolution',
        'Brand Guidelines Creation',
        'Monthly Strategy Call'
      ],
      popular: true,
      color: 'from-orange to-orange/80'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      description: 'Complete solution for large businesses',
      icon: Crown,
      monthlyPrice: 399,
      yearlyPrice: 3990,
      monthlyPriceId: 'price_1Rwev20aNH02uRnnelsj9iuV', // Real Stripe price ID
      yearlyPriceId: 'price_1Rwev30aNH02uRnn2NMMvUSe',
      features: [
        'Unlimited Social Media Content',
        'Unlimited Video Production',
        'Custom Photography Sessions',
        'Dedicated Account Manager',
        'Unlimited Revisions',
        '8K Resolution',
        'Full Brand Package',
        'Weekly Strategy Calls',
        'Analytics & Reporting',
        'Rush Delivery Available'
      ],
      popular: false,
      color: 'from-black to-gray-800'
    }
  ];

  const handleSubscribe = async (priceId: string, planName: string) => {
    try {
      setLoading(priceId);
      
      // Call your backend to create checkout session
      const response = await fetch('http://localhost:3001/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          planName,
          billingPeriod: isYearly ? 'yearly' : 'monthly',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-white via-orange/5 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-black rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your{" "}
            <span className="text-gradient-brand">Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your brand with our professional visual content plans. 
            Choose monthly or yearly billing and save up to 20%.
          </p>

          {/* Billing Toggle */}
          <motion.div 
            className="inline-flex items-center bg-gray-100 p-2 rounded-full"
            whileHover={{ scale: 1.02 }}
          >
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                !isYearly 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative ${
                isYearly 
                  ? 'bg-gradient-to-r from-orange to-black text-white shadow-md' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Yearly
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1">
                Save 20%
              </Badge>
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              <Card className={`h-full border-2 transition-all duration-300 ${
                plan.popular 
                  ? 'border-orange shadow-2xl scale-105' 
                  : 'border-gray-200 hover:border-orange/50 hover:shadow-xl'
              }`}>
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-orange to-black text-white px-6 py-2 text-sm font-bold">
                      🔥 Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  {/* Plan Icon */}
                  <motion.div 
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl mb-4 mx-auto`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <plan.icon className="h-8 w-8 text-white" />
                  </motion.div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isYearly ? 'yearly' : 'monthly'}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <div className="flex items-baseline justify-center">
                          <span className="text-5xl font-bold text-black">
                            ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                          </span>
                          <span className="text-gray-600 ml-2">
                            /{isYearly ? 'year' : 'month'}
                          </span>
                        </div>
                        {isYearly && (
                          <div className="text-sm text-green-600 font-medium mt-1">
                            Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice)} per year
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </CardHeader>

                <CardContent className="px-6">
                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="px-6 pb-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button
                      className={`w-full py-4 font-semibold rounded-xl transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-orange to-black hover:from-orange/90 hover:to-black/90 text-white shadow-lg hover:shadow-xl'
                          : 'border-2 border-gray-300 bg-white text-black hover:border-orange hover:bg-orange hover:text-white'
                      }`}
                      onClick={() => handleSubscribe(
                        isYearly ? plan.yearlyPriceId : plan.monthlyPriceId,
                        plan.name
                      )}
                      disabled={loading === (isYearly ? plan.yearlyPriceId : plan.monthlyPriceId)}
                    >
                      {loading === (isYearly ? plan.yearlyPriceId : plan.monthlyPriceId) 
                        ? 'Processing...' 
                        : plan.popular ? 'Get Started Now' : 'Choose Plan'
                      }
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4">
            Need a custom solution? 
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="border-orange text-orange hover:bg-orange hover:text-white"
          >
            Contact Sales
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center space-x-8 text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Secure payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>30-day money back</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
