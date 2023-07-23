const mongoose = require('mongoose')

const { Schema } = mongoose;

const Order1Schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    Date:{
        type:Date
    },
    order_data: {
        type: Array,
        required: true,
    },

});

module.exports = mongoose.model('order1', Order1Schema)