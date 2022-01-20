import express,{Router} from 'express'
import dotenv from 'dotenv'
import paymentRouter from './routes/payment.route'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
dotenv.config();
const port = process.env.PORT||3090
app.use('/payment',paymentRouter)
app.listen(port,()=>{
    console.log(`server started on ${port}`)
})

