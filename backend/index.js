const app = require('express')()
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors= require('cors')

app.use(cors())

const razorpay = new Razorpay({
    key_id: 'rzp_test_QW4QKOZaNPmQJB',
    key_secret: 'viDY7GN23xncRN2FVejOST91',
  });

app.post('/razorpay', async (req, res) => {
    // res.json("CCL test razorpay running")
  const payment_capture = 1
  const amount= 5
  const currency = 'INR'

  const options={ 
    amount : (amount*100).toString(),
    currency, 
    receipt : shortid.generate(), 
    payment_capture
 }

    try {
        const response = await razorpay.orders.create(options)
        console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }

})

app.listen(4000, () => {
    console.log("server is running on port 4K")
})