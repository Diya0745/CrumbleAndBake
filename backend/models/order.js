const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    items: [
        {
            id: String,
            name: String,
            price: String,
            quantity: Number
        }
    ],
    total: Number,
    customer: {
        name: String,
        email: String,
        phone: String,
        address: String
    },
    status: {
        type: String,
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);