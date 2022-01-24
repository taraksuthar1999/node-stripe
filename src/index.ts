import express from 'express'
import dotenv from 'dotenv'
import paymentRouter from './routes/payment.route'
import bodyParser from 'body-parser'
import {getDeliveredQuantity,Stripe} from './utils/service'
const app = express()
dotenv.config();
const port = process.env.PORT||3090

app.post('/webhook',bodyParser.raw({ type: "application/json" }),async(request, response) => {
  const endpointSecret = "whsec_eOcIUONdzUfhkNz0Q2ikfET9m0lwrI5V";
  const sig = request.headers['stripe-signature']?request.headers['stripe-signature']:'';
  let event
  let paymentIntent:any
  try {
    event = Stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  
      switch (event.type) {
        case 'payment_intent.canceled':
          paymentIntent = event.data.object;
          // Then define and call a function to handle the event payment_intent.canceled
          break;
        case 'payment_intent.created':
          paymentIntent = event.data.object;
          
          // Then define and call a function to handle the event payment_intent.created
          break;
        case 'payment_intent.succeeded':
          paymentIntent = event.data.object;
          console.log('payment success',paymentIntent)
          let qty = Number(paymentIntent.amount_received/1000)
          const deliveredQuantity:number = getDeliveredQuantity(qty)
          if(deliveredQuantity<qty){
            console.log('----------------------initiate refund---------------------------------')
            console.log('refund amount',deliveredQuantity*1000)
              const refund = await Stripe.refunds.create({
                payment_intent: paymentIntent.id,
                amount: deliveredQuantity*1000,
              });
              console.log('refund success',refund)

          }
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

  // Return a 200 response to acknowledge receipt of the event
    response.send();
  } catch (err:any) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/payment',paymentRouter)
app.listen(port,()=>{
    console.log(`server started on ${port}`)
})

