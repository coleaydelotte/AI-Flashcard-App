import { loadStripe } from "@stripe/stripe-js";
let stripePromise;
const getStripe = () => {
    if (!stripePromise) {
        const apiKey = process.env.NEXT_PUBLIC_STRIPE_API_KEY;
        stripePromise = loadStripe(apiKey);
    }
    return stripePromise;
}

export default getStripe;