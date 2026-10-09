const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/product");

const products = [
    {
        id: "1",
        name: "Chocolate Truffle Cake",
        category: "cakes",
        price: 699,
        image: "assets/images/chocolate-cake.jpg",
        description: "Rich chocolate cake with creamy chocolate frosting."
    },
    {
        id: "2",
        name: "Chocolate Chip Cookies",
        category: "cookies",
        price: 299,
        image: "assets/images/cookies.jpg",
        description: "Freshly baked cookies loaded with chocolate chips."
    },
    {
        id: "3",
        name: "Classic Chocolate Brownie",
        category: "brownies",
        price: 249,
        image: "assets/images/brownie.jpg",
        description: "Soft, fudgy and packed with rich chocolate flavour."
    },
    {
        id: "4",
        name: "Red Velvet Cake",
        category: "cakes",
        price: 749,
        image: "assets/images/red-velvet-cake.jpg",
        description: "Soft red velvet sponge layered with smooth cream cheese frosting."
    },
    {
        id: "5",
        name: "Black Forest Cake",
        category: "cakes",
        price: 649,
        image: "assets/images/black-forest-cake.jpg",
        description: "Classic chocolate sponge with cherries and creamy chocolate layers."
    },
    {
        id: "6",
        name: "Butterscotch Cake",
        category: "cakes",
        price: 599,
        image: "assets/images/butterscotch-cake.jpg",
        description: "Light vanilla cake with crunchy butterscotch and creamy frosting."
    },
    {
        id: "7",
        name: "Strawberry Cream Cake",
        category: "cakes",
        price: 699,
        image: "assets/images/strawberry-cake.jpg",
        description: "Fresh strawberry-flavoured cake with smooth whipped cream."
    },
    {
        id: "8",
        name: "Double Chocolate Cookies",
        category: "cookies",
        price: 349,
        image: "assets/images/double-chocolate-cookies.jpg",
        description: "Soft chocolate cookies packed with delicious chocolate chunks."
    },
    {
        id: "9",
        name: "Oatmeal Raisin Cookies",
        category: "cookies",
        price: 299,
        image: "assets/images/oatmeal-cookies.jpg",
        description: "Chewy oatmeal cookies with sweet raisins in every bite."
    },
    {
        id: "10",
        name: "Butter Cookies",
        category: "cookies",
        price: 249,
        image: "assets/images/butter-cookies.jpg",
        description: "Classic buttery cookies with a delicate, melt-in-your-mouth texture."
    },
    {
        id: "11",
        name: "Red Velvet Cookies",
        category: "cookies",
        price: 329,
        image: "assets/images/red-velvet-cookies.jpg",
        description: "Soft red velvet cookies with a rich and creamy flavour."
    },
    {
        id: "12",
        name: "Walnut Brownie",
        category: "brownies",
        price: 299,
        image: "assets/images/walnut-brownie.jpg",
        description: "Rich fudgy brownie loaded with crunchy walnuts."
    },
    {
        id: "13",
        name: "Fudge Brownie",
        category: "brownies",
        price: 279,
        image: "assets/images/fudge-brownie.jpg",
        description: "Dense, gooey and intensely chocolatey classic fudge brownie."
    },
    {
        id: "14",
        name: "Triple Chocolate Brownie",
        category: "brownies",
        price: 329,
        image: "assets/images/triple-chocolate-brownie.jpg",
        description: "A rich brownie made with three delicious kinds of chocolate."
    },
    {
        id: "15",
        name: "Caramel Brownie",
        category: "brownies",
        price: 319,
        image: "assets/images/caramel-brownie.jpg",
        description: "Fudgy chocolate brownie finished with a smooth caramel drizzle."
    },
    {
        id: "16",
        name: "Classic Milk Chocolate",
        category: "chocolates",
        price: 199,
        image: "assets/images/milk-chocolate.jpg",
        description: "Smooth and creamy milk chocolate made for every chocolate lover."
    },
    {
        id: "17",
        name: "Dark Chocolate Bites",
        category: "chocolates",
        price: 249,
        image: "assets/images/dark-chocolate.jpg",
        description: "Rich dark chocolate bites with an intense cocoa flavour."
    },
    {
        id: "18",
        name: "Hazelnut Chocolate",
        category: "chocolates",
        price: 299,
        image: "assets/images/hazelnut-chocolate.jpg",
        description: "Creamy chocolate combined with crunchy roasted hazelnuts."
    },
    {
        id: "19",
        name: "Chocolate Truffle Box",
        category: "chocolates",
        price: 349,
        image: "assets/images/chocolate-truffles.jpg",
        description: "A delightful box of soft, rich chocolate truffles."
    },
    {
        id: "20",
        name: "Veg Puff",
        category: "pastries",
        price: 60,
        image: "assets/images/veg-puff.jpg",
        description: "Flaky golden pastry filled with a savoury vegetable filling."
    },
    {
        id: "21",
        name: "Paneer Puff",
        category: "pastries",
        price: 80,
        image: "assets/images/paneer-puff.jpg",
        description: "Crispy puff pastry filled with a delicious spiced paneer filling."
    },
    {
        id: "22",
        name: "Chocolate Croissant",
        category: "pastries",
        price: 120,
        image: "assets/images/chocolate-croissant.jpg",
        description: "Buttery, flaky pastry filled with smooth chocolate."
    },
    {
        id: "23",
        name: "Cream Pastry",
        category: "pastries",
        price: 100,
        image: "assets/images/cream-pastry.jpg",
        description: "Soft pastry layered with light, creamy frosting."
    }
];

async function seedProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected!");

        await Product.deleteMany({});

        await Product.insertMany(products);

        console.log("23 products added successfully!");

        await mongoose.connection.close();
    } catch (error) {
        console.log("Error:", error);
    }
}

seedProducts();