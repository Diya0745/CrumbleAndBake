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

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productCards = document.querySelectorAll(".product-card");

productCards.forEach(function (card) {

    const button = card.querySelector("button");

    button.addEventListener("click", function () {

        const productId = card.dataset.id;
        const productName = card.querySelector("h3").textContent;
        const productPrice = card.querySelector(".product-bottom span").textContent;

        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        };

        const existingProduct = cart.find(function (item) {
            return item.id === product.id;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Cart:", cart);

        displayCart();
    });
});


// DISPLAY CART

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    if (!cartItems || !cartTotal || !cartCount) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    cart.forEach(function (item) {

        const price = parseInt(item.price.replace("₹", ""));
        const itemTotal = price * item.quantity;

        total += itemTotal;
        itemCount += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <h3>${item.name}</h3>

                <p>₹${price} each</p>

                <div class="quantity-controls">

                    <button onclick="changeQuantity('${item.id}', -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity('${item.id}', 1)">
                        +
                    </button>

                </div>

                <p>Item total: ₹${itemTotal}</p>

                <button class="remove-button" onclick="removeFromCart('${item.id}')">
                    Remove
                </button>

            </div>
        `;
    });

    cartTotal.textContent = total;
    cartCount.textContent = itemCount;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }
}


// CHANGE QUANTITY

window.changeQuantity = function (productId, change) {

    const product = cart.find(function (item) {
        return item.id === productId;
    });

    if (product) {

        product.quantity += change;

        if (product.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
};


// REMOVE PRODUCT

window.removeFromCart = function (productId) {

    cart = cart.filter(function (item) {
        return item.id !== productId;
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
};

// OPEN / CLOSE CART

const cartButton = document.getElementById("cart-button");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");

if (cartButton && cartPanel && closeCart) {

    cartButton.addEventListener("click", function () {
        cartPanel.classList.add("active");
    });

    closeCart.addEventListener("click", function () {
        cartPanel.classList.remove("active");
    });

}

const checkoutButton = document.querySelector(".checkout-button");

if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

        window.location.href = "checkout.html";

    });

}

// MENU PAGE


// MENU PAGE

const menuContainer = document.getElementById("menu-products-container");

if (menuContainer) {

    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("category");

    // Show all products if no category is selected
    const categoryProducts = selectedCategory
        ? products.filter(function (product) {
            return product.category === selectedCategory;
        })
        : products;

    const menuTitle = document.getElementById("menu-title");
    const menuDescription = document.getElementById("menu-description");

    const categoryNames = {
        cakes: "Cakes",
        cookies: "Cookies",
        chocolates: "Chocolates",
        brownies: "Brownies",
        pastries: "Puffs & Pastries"
    };

    const categoryDescriptions = {
        cakes: "Freshly baked cakes for every celebration.",
        cookies: "Crunchy, soft and delicious cookies.",
        chocolates: "Sweet little bites of chocolate happiness.",
        brownies: "Soft, fudgy and rich chocolate brownies.",
        pastries: "Fresh, flaky and delicious pastries."
    };

    menuTitle.textContent = categoryNames[selectedCategory] || "Our Menu";

    menuDescription.textContent =
        categoryDescriptions[selectedCategory] ||
        "Discover something delicious.";

    menuContainer.innerHTML = "";

    categoryProducts.forEach(function (product) {

        menuContainer.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p>${product.description}</p>

                    <div class="product-bottom">

                        <span>₹${product.price}</span>

                        <button onclick="addProductToCart('${product.id}')">
                            Add to Cart
                        </button>

                    </div>

                </div>

            </div>
        `;
    });
}

function addProductToCart(productId) {

    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (!product) {
        return;
    }

    const existingProduct = cart.find(function (item) {
        return item.id === product.id;
    });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: "₹" + product.price,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

    console.log("Cart:", cart);
}

displayCart();

window.addEventListener("pageshow", function () {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    displayCart();
});

function displayCheckout() {

    const checkoutItems = document.getElementById("checkout-items");

    if (!checkoutItems) {
        return;
    }

    checkoutItems.innerHTML = "";

    let total = 0;

    cart.forEach(function (item) {

        const price = parseInt(item.price.replace("₹", ""));
        const itemTotal = price * item.quantity;

        total += itemTotal;

        checkoutItems.innerHTML += `
            <div class="checkout-item">

                <div>
                    <h3>${item.name}</h3>
                    <p>₹${price} × ${item.quantity}</p>
                </div>

                <strong>₹${itemTotal}</strong>

            </div>
        `;
    });

    document.getElementById("checkout-subtotal").textContent = total;
    document.getElementById("checkout-total").textContent = total;
}

displayCheckout();

const placeOrderButton = document.getElementById("place-order");
const orderSuccess = document.getElementById("order-success");

if (placeOrderButton && orderSuccess) {

    placeOrderButton.addEventListener("click", function () {

        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const email = document.getElementById("customer-email").value.trim();
        const address = document.getElementById("customer-address").value.trim();
        const city = document.getElementById("customer-city").value.trim();
        const pincode = document.getElementById("customer-pincode").value.trim();

        if (!name || !phone || !email || !address || !city || !pincode) {

            alert("Please fill in all delivery details.");

            return;
        }

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }

        const orderNumber =
            "CB-" + Math.floor(100000 + Math.random() * 900000);

        document.getElementById("order-number").textContent = orderNumber;

        localStorage.removeItem("cart");

        cart = [];

        orderSuccess.classList.add("active");

        document.querySelector(".checkout-container").style.display = "none";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}