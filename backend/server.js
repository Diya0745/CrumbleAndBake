const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Product = require("./models/product");
const Order = require("./models/order");
const Message = require("./models/message");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to CrumbleAndBake Backend 🍰");
});

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
});

app.post("/api/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Failed to add product" });
    }
});

app.put("/api/products/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(updatedProduct);

    } catch (error) {
        console.log("Failed to update product:", error);

        res.status(500).json({
            message: "Failed to update product"
        });
    }
});


app.delete("/api/products/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({
            id: req.params.id
        });

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.log("Failed to delete product:", error);

        res.status(500).json({
            message: "Failed to delete product"
        });
    }
});

app.post("/api/orders", async (req, res) => {
    try {
        const order = new Order(req.body);

        const savedOrder = await order.save();

        console.log("New order saved:", savedOrder);

        res.status(201).json({
            message: "Order saved successfully!",
            order: savedOrder
        });

    } catch (error) {
        console.log("Order save error:", error);

        res.status(500).json({
            message: "Failed to save order"
        });
    }
});

app.get("/api/orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        console.log("Failed to fetch orders:", error);

        res.status(500).json({
            message: "Failed to fetch orders"
        });
    }
});

app.put("/api/orders/:id/status", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json(updatedOrder);

    } catch (error) {
        console.log("Failed to update order status:", error);

        res.status(500).json({
            message: "Failed to update order status"
        });
    }
});

app.post("/api/messages", async (req, res) => {
    try {
        const message = new Message(req.body);

        const savedMessage = await message.save();

        console.log("New message saved:", savedMessage);

        res.status(201).json({
            message: "Message saved successfully!",
            data: savedMessage
        });

    } catch (error) {
        console.log("Message save error:", error);

        res.status(500).json({
            message: "Failed to save message"
        });
    }
});

app.get("/api/messages", async (req, res) => {
    try {
        const messages = await Message
            .find()
            .sort({ createdAt: -1 });

        res.json(messages);

    } catch (error) {
        console.log("Failed to fetch messages:", error);

        res.status(500).json({
            message: "Failed to fetch messages"
        });
    }
});


app.delete("/api/messages/:id", async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(
            req.params.id
        );

        if (!deletedMessage) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        res.json({
            message: "Message deleted successfully"
        });

    } catch (error) {
        console.log("Failed to delete message:", error);

        res.status(500).json({
            message: "Failed to delete message"
        });
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => console.log("MongoDB connection error:", err));
    
app.listen(3000, () => {
    console.log("CrumbleAndBake server is running on http://localhost:3000");
});