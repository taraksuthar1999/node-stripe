import stripe from 'stripe'
import dotenv from 'dotenv'
export const getDeliveredQuantity = (quantity:number):number=>quantity/5 
dotenv.config();
 const secret = process.env.STRIPE_SECRET_KEY || ''
export const Stripe = new stripe(secret,{
    apiVersion: '2020-08-27',
})