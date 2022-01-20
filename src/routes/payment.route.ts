import {Router} from 'express'
import stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config();
const secret = process.env.STRIPE_SECRET_KEY || ''
console.log('secret',secret)
const Stripe = new stripe(secret,{
    apiVersion: '2020-08-27',
  })
const router = Router()

router.get('/',async(req,res)=>{
    return res.sendFile('/home/tarak/node-stripe/src/views/homepay.html')
})
router.get('/buy',async(req,res)=>{
    return res.sendFile('/home/tarak/node-stripe/src/views/homebuy.html')
})
router.get('/checkout',(_,res)=>{
    return res.sendFile('/home/tarak/node-stripe/src/views/checkout.html')
})
router.get('/pay',async(req,res)=>{
    // let amount = 1000*(req.body.quantity?Number(req.body.quantity):0)
    // console.log('amount',amount)
    const {client_secret} =await Stripe.paymentIntents.create({
        amount:4000,
        currency: 'usd',
        payment_method_types:['card']
    })

    return res.json(client_secret)
})

router.post('/create-checkout-session', async (req, res) => {
    const session = await Stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });
  
    return res.redirect(session.url?session.url:'');
  });
export default router