const products = [
    {
        id: 1,
        name: "Ноутбук ASUS",
        price: 25000,
        image: "https://placehold.co/600x400?text=Hello+World"
    },
    {
        id: 2,
        name: "Мишка Logitech",
        price: 1200,
        image: "https://placehold.co/600x400?text=Hello+World2"
    },
    {
        id: 3,
        name: "Клавіатура механічна",
        price: 2500,
        image: "https://placehold.co/600x400?text=Hello+World3"
    },
    {
        id: 4,
        name: "Навушники JBL",
        price: 3500,
        image: "https://placehold.co/600x400?text=Hello+World4"
    },
    {
        id: 5,
        name: "Монітор Samsung",
        price: 9000,
        image: "https://placehold.co/600x400?text=Hello+World5"
    }
];

function fetchProducts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products);
        }, 1500);
    });
}

let cart = [];

const productsGrid = document.querySelector(".products-grid");

async function initShop() {
    const loader = document.getElementById("loader");
    const container = document.querySelector(".products-grid");

    loader.classList.remove("hidden");
    container.innerHTML = "";

    try {
        const data = await fetchProducts();

        loader.classList.add("hidden");

        container.innerHTML = data.map((product) => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="product-price">${product.price} грн</p>
                <button class="btn btn-buy" data-id="${product.id}">
                    Купити
                </button>
            </div>
        `).join("");

    } catch (error) {
        loader.classList.add("hidden");

        container.innerHTML = `
            <p class="error">Помилка: ${error.message}</p>
        `;
    }
}

productsGrid.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-buy")) {
        const productId = Number(event.target.dataset.id);

        const selectedProduct = products.find(
            (p) => p.id === productId
        );

        addToCart(selectedProduct);
    }
});

function addToCart(product) {
    const existingItem = cart.find(
        (item) => item.id === product.id
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateUI();
}

function calculateTotal() {
    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}

function updateUI() {
    const cartCounter = document.querySelector(".cart-counter");

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    if (cartCounter) {
        cartCounter.textContent = totalItems;
    }

    console.log("Поточний кошик:", cart);
    console.log("Загальна сума:", calculateTotal(), "грн");
}
initShop();
updateUI();