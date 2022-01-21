import {Router} from 'express'
import {getDeliveredQuantity,Stripe} from '../utils/service'
import { UV_FS_O_FILEMAP } from 'constants';

const router = Router()

router.get('/',async(req,res)=>{
    return res.sendFile('/home/tarak/node-stripe/src/views/homepay.html')
})

router.post('/create-checkout-session',async (req, res) => {
  let amount = 1000*(req.body?Number(req.body.quantity):1)
  try{
    const session = await Stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: amount,
          },
          quantity: req.body?req.body.quantity:1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    })
    return res.redirect(session.url?session.url:'')
  }catch(err:any){
      console.log(err.message)
  }
});
export default router