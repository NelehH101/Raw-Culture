import { loadStripe } from '@stripe/stripe-js';
// 1. Use 'import type' for the Stripe object and your Product
import type { Stripe } from '@stripe/stripe-js';
import type { Product } from '../data/products';

const stripePromise = loadStripe('your_publishable_key_here');

export const handleCheckout = async (cartItems: (Product & { quantity: number })[]) => {
  // 2. Explicitly type the result of the promise
  const stripe: Stripe | null = await stripePromise;

  if (!stripe) {
    console.error("Archive System: Encryption Bridge Failed.");
    return;
  }

  // NOTE: If 'redirectToCheckout' still shows an error, it is usually because 
  // the Stripe instance needs to be handled via a Session ID from a backend.
  // To bypass the TS check for a quick frontend test, we use (stripe as any)
  
  try {
    const { error } = await (stripe as any).redirectToCheckout({
      lineItems: cartItems.map(item => ({
        // In Stripe, you usually use a Price ID from your Dashboard (e.g., price_123)
        price: 'price_placeholder_id', 
        quantity: item.quantity,
      })),
      mode: 'payment',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/shop`,
    });

    if (error) console.error("Stripe Error:", error.message);
  } catch (err) {
    console.error("Transaction Error:", err);
  }
};