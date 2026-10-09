const ordersContainer = document.getElementById("orders-container");

async function loadOrders() {
    try {
        const response = await fetch("http://localhost:3000/api/orders");

        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }

        const orders = await response.json();

        if (orders.length === 0) {
            ordersContainer.innerHTML = `
                <p class="admin-empty">
                    No orders yet.
                </p>
            `;
            return;
        }

        ordersContainer.innerHTML = "";

        orders.forEach(function (order) {

            const items = order.items.map(function (item) {
                return `
                    <div class="admin-order-item">
                        <span>
                            ${item.name} × ${item.quantity}
                        </span>
                        <span>
                            ${item.price}
                        </span>
                    </div>
                `;
            }).join("");

            ordersContainer.innerHTML += `
                <div class="admin-order-card">

                    <div class="admin-order-top">
                        <div>
                            <span class="admin-order-label">ORDER</span>
                            <h3>#${order._id.slice(-6).toUpperCase()}</h3>
                        </div>

                        <span class="admin-order-date">
                            ${new Date(order.createdAt).toLocaleString()}
                        </span>
                    </div>

                    <div class="admin-order-customer">
                        <h4>Customer</h4>
                        <p>${order.customer.name}</p>
                        <p>${order.customer.email}</p>
                        <p>${order.customer.phone}</p>
                        <p>${order.customer.address}</p>
                    </div>

                    <div class="admin-order-items">
                        ${items}
                    </div>

                    <div class="admin-order-total">
                        <span>Total</span>
                        <strong>₹${order.total}</strong>
                    </div>

                    <div class="admin-order-status">
                        <label>Order Status</label>

                        <select onchange="updateOrderStatus('${order._id}', this.value)">
                            <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>
                                Pending
                            </option>

                            <option value="Confirmed" ${order.status === "Confirmed" ? "selected" : ""}>
                                Confirmed
                            </option>

                            <option value="Completed" ${order.status === "Completed" ? "selected" : ""}>
                                Completed
                            </option>
                        </select>
                    </div>

                </div>
            `;
        });

    } catch (error) {
        console.error("Order loading error:", error);

        ordersContainer.innerHTML = `
            <p class="admin-empty">
                Unable to load orders.
            </p>
        `;
    }
}

loadOrders();

const viewOrdersButton = document.getElementById("view-orders");
const manageProductsButton = document.getElementById("manage-products");
const viewMessagesButton = document.getElementById("view-messages");

if (viewOrdersButton) {
    viewOrdersButton.addEventListener("click", function () {
        document.getElementById("orders-section").scrollIntoView({
            behavior: "smooth"
        });
    });
}

if (manageProductsButton) {
    manageProductsButton.addEventListener("click", function () {
        document.getElementById("products-section").scrollIntoView({
            behavior: "smooth"
        });
    });
}

if (viewMessagesButton) {
    viewMessagesButton.addEventListener("click", function () {
        document.getElementById("messages-section").scrollIntoView({
            behavior: "smooth"
        });
    });
}

const productsContainer = document.getElementById("products-container");

async function loadAdminProducts() {
    try {
        const response = await fetch("http://localhost:3000/api/products");

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        if (products.length === 0) {
            productsContainer.innerHTML = `
                <p class="admin-empty">
                    No products found.
                </p>
            `;
            return;
        }

        productsContainer.innerHTML = "";

        products.forEach(function (product) {

            productsContainer.innerHTML += `
                <div class="admin-product-card">

                    <img src="${product.image}" alt="${product.name}">

                    <div class="admin-product-info">
                        <span>${product.category}</span>

                        <h3>${product.name}</h3>

                        <p>${product.description}</p>

                        <strong>₹${product.price}</strong>

                        <div class="admin-product-actions">
                            <button onclick="editProduct('${product.id}')">
                                Edit
                            </button>

                            <button onclick="deleteProduct('${product.id}')">
                                Delete
                            </button>
                        </div>
                    </div>

                </div>
            `;
        });

    } catch (error) {
        console.error("Product loading error:", error);

        productsContainer.innerHTML = `
            <p class="admin-empty">
                Unable to load products.
            </p>
        `;
    }
}

loadAdminProducts();

async function deleteProduct(productId) {
    const confirmed = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:3000/api/products/${productId}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete product");
        }

        alert("Product deleted successfully!");

        loadAdminProducts();

    } catch (error) {
        console.error("Delete product error:", error);

        alert("Unable to delete product.");
    }
}

async function editProduct(productId) {

    const name = prompt("Enter product name:");
    if (name === null) return;

    const price = prompt("Enter product price:");
    if (price === null) return;

    const category = prompt(
        "Enter category (cakes, cookies, chocolates, brownies, pastries):"
    );
    if (category === null) return;

    const image = prompt("Enter image path:");
    if (image === null) return;

    const description = prompt("Enter product description:");
    if (description === null) return;

    const updatedProduct = {
        name: name.trim(),
        price: Number(price),
        category: category.trim().toLowerCase(),
        image: image.trim(),
        description: description.trim()
    };

    if (
        !updatedProduct.name ||
        !updatedProduct.price ||
        !updatedProduct.category ||
        !updatedProduct.image ||
        !updatedProduct.description
    ) {
        alert("Please enter valid product details.");
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:3000/api/products/${productId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct)
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update product");
        }

        alert("Product updated successfully!");

        loadAdminProducts();

    } catch (error) {

        console.error("Update product error:", error);

        alert("Unable to update product.");
    }
}

const addProductButton = document.getElementById("add-product-button");

if (addProductButton) {

    addProductButton.addEventListener("click", async function () {

        const name = document.getElementById("product-name").value.trim();
        const category = document.getElementById("product-category").value;
        const price = document.getElementById("product-price").value;
        const image = document.getElementById("product-image").value.trim();
        const description = document.getElementById("product-description").value.trim();

        if (!name || !category || !price || !image || !description) {
            alert("Please fill in all product details.");
            return;
        }

        const newProduct = {
            id: Date.now().toString(),
            name: name,
            category: category,
            price: Number(price),
            image: image,
            description: description
        };

        try {

            const response = await fetch(
                "http://localhost:3000/api/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newProduct)
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add product");
            }

            alert("Product added successfully!");

            document.getElementById("product-name").value = "";
            document.getElementById("product-category").value = "";
            document.getElementById("product-price").value = "";
            document.getElementById("product-image").value = "";
            document.getElementById("product-description").value = "";

            loadAdminProducts();

        } catch (error) {

            console.error("Add product error:", error);

            alert("Unable to add product.");
        }
    });
}

const messagesContainer = document.getElementById("messages-container");

async function loadMessages() {
    try {
        const response = await fetch("http://localhost:3000/api/messages");

        if (!response.ok) {
            throw new Error("Failed to fetch messages");
        }

        const messages = await response.json();

        if (messages.length === 0) {
            messagesContainer.innerHTML = `
                <p class="admin-empty">
                    No messages yet.
                </p>
            `;
            return;
        }

        messagesContainer.innerHTML = "";

        messages.forEach(function (message) {

            messagesContainer.innerHTML += `
                <div class="admin-message-card">

                    <div class="admin-message-top">
                        <div>
                            <span class="admin-message-label">MESSAGE</span>
                            <h3>${message.name}</h3>
                        </div>

                        <span class="admin-message-date">
                            ${new Date(message.createdAt).toLocaleString()}
                        </span>
                    </div>

                    <div class="admin-message-info">
                        <p>
                            <strong>Email:</strong>
                            ${message.email}
                        </p>
                    </div>

                    
                    <div class="admin-message-content">
                        <p>${message.message}</p>
                    </div>

                    <div class="admin-message-actions">
                        <button onclick="deleteMessage('${message._id}')">
                            Delete Message
                        </button>
                    </div>

                </div>
            `;
        });

    } catch (error) {
        console.error("Message loading error:", error);

        messagesContainer.innerHTML = `
            <p class="admin-empty">
                Unable to load messages.
            </p>
        `;
    }
}

loadMessages();

async function updateOrderStatus(orderId, status) {

    try {

        const response = await fetch(
            `http://localhost:3000/api/orders/${orderId}/status`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: status
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update order status");
        }

        alert("Order status updated successfully!");

        loadOrders();

    } catch (error) {

        console.error("Status update error:", error);

        alert("Unable to update order status.");
    }
}


async function deleteMessage(messageId) {
    const confirmed = confirm(
        "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
        const response = await fetch(
            `http://localhost:3000/api/messages/${messageId}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete message");
        }

        alert("Message deleted successfully!");

        loadMessages();

    } catch (error) {
        console.error("Delete message error:", error);
        alert("Unable to delete message. Please try again.");
    }
}