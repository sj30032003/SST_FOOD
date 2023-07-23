const express= require('express')
const router= express.Router();
const Order1 = require('../models/Order1');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
        try {
            await Order1.create({
                email: req.body.email,
                Date:req.body.order_date,
                order_data:req.body.order_data
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
})

router.post('/myOrderData', async (req, res) => {
    try {

        let eId = await Order1.find({ 'email': req.body.email })
       

        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }


});
module.exports= router;