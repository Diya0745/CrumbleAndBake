let products = [];

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

async function loadProducts() {
    try {
        const response = await fetch("http://localhost:3000/api/products");

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        products = await response.json();

        renderMenu();

    } catch (error) {
        console.error("Failed to load products:", error);
    }
}

function renderMenu() {
    const menuContainer = document.getElementById("menu-products-container");

    if (!menuContainer) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("category");

    const categoryProducts = selectedCategory
        ? products.filter(function (product) {
            return product.category.toLowerCase() === selectedCategory.toLowerCase();
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

    menuTitle.textContent =
        categoryNames[selectedCategory] || "Our Menu";

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

loadProducts();

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

    placeOrderButton.addEventListener("click", async function () {

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

        const total = cart.reduce(function (sum, item) {
            const price = parseInt(item.price.replace("₹", ""));
            return sum + price * item.quantity;
        }, 0);

        const orderData = {
            items: cart,
            total: total,
            customer: {
                name: name,
                email: email,
                phone: phone,
                address: address + ", " + city + " - " + pincode
            }
        };

        try {
            const response = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error("Failed to place order");
            }

            const data = await response.json();

            console.log("Order saved:", data);

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

        } catch (error) {
            console.error("Order error:", error);
            alert("Something went wrong while placing your order. Please try again.");
        }

    });

}

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = contactForm.querySelector("input[type='text']").value.trim();
        const email = contactForm.querySelector("input[type='email']").value.trim();
        const message = contactForm.querySelector("textarea").value.trim();

        if (!name || !email || !message) {
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            document.getElementById("contact-success").style.display = "block";

            contactForm.reset();

        } catch (error) {
            console.error("Message error:", error);

            alert("Something went wrong. Please try again.");
        }
    });
}