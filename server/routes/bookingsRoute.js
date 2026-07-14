const router = require("express").Router();
const stripe = require('stripe')(process.env.stripe_key);
const authMiddleware = require("../middlewares/authMiddleware");

// make payment
router.post("/make-payment", authMiddleware, async (req, res) => {
    try {
        const { token, amount } = req.body;

        // create a customer
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        // create a charge
        const charge = await stripe.charges.create({
            amount: amount,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description
        })
    } catch (error) {