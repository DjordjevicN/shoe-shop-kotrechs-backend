const express = require("express")
const app = express()
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser")
const cors = require("cors")
const PORT = 4000
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cors())

app.post("/payment", cors(), async (req, res) => {
    let { amount, id } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            description: "Nike Shop by-Johnny",
            payment_method: id,
            confirm: true
        })
        res.json({
            message: "Payment successful",
            success: true
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: 'Something Wong',
            success: false
        })
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`listening on ${PORT}`)
})