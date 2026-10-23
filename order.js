let cart = [];

function addToCart(product) {
    if (!product) {
        console.log("محصولی برای اضافه کردن پیدا نشد");
        return;
    }

    cart.push(product);
       renderCart();
}

function calculateTotal() {
    return cart.reduce(function(sum, product) {
        return sum + Number(product.PRICE);
    }, 0);
}
function formatPrice(price) {
    return Number(price).toLocaleString("fa-IR") + "تومان";
}
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
const selectedProduct = window.products?.find(function(product) {
    return product.ID === productId;
});

function removeFromCart(productId) {
    cart = cart.filter(function(product) {
        return Number(product.ID) !== Number(productId);
    });

    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartCount || !cartTotal) {
        console.error("بخش سبد خرید در HTML پیدا نشد.");
        return;
    }

    cartItems.replaceChildren();

    cart.forEach(function(product) {
        const item = document.createElement("div");
        const name = document.createElement("span");
        const price = document.createElement("span");
        const button = document.createElement("button");

        name.textContent = product.NAME + " — ";
        price.textContent = formatPrice(product.PRICE);

        button.textContent = "حذف";
        button.type = "button";

        button.addEventListener("click", function() {
            removeFromCart(product.ID);
        });

        item.append(name, price, button);
        cartItems.appendChild(item);
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = formatPrice(calculateTotal());

    document.getElementById("summeryName").textContent =
        cart.map(function(product) {
            return product.NAME;
        }).join("، ") || "سبد خرید خالی است";

    document.getElementById("summeryPrice").textContent =
        formatPrice(calculateTotal());
}
if (selectedProduct) {
    addToCart(selectedProduct);

    document.getElementById("orderProduct").textContent =
        selectedProduct.NAME;

    document.getElementById("orderPrice").textContent =
        formatPrice(selectedProduct.PRICE);
} else {
    document.getElementById("orderMessage").textContent =
        "محصول موردنظر پیدا نشد.";
}
const orderForm = document.getElementById("orderForm");
orderForm.addEventListener("submit", function(event) {
    event.preventDefault();
const name = document.getElementById("customerName").value.trim();
const phone = document.getElementById("customerPhone").value.trim();
const address = document.getElementById("customerAddress").value.trim();
if (name === "" || phone === "" || address === "") {
    document.getElementById("orderMessage").textContent = "لطفا همه فیلدها را پر کنید";
    return;
}
if (!/^[0-9]{10,11}$/.test(phone)) {
    document.getElementById("orderMessage").textContent = "لطفا شماره تماس معتبر وارد کنید"
    return;
}
if (!selectedProduct || cart.length === 0) {
    document.getElementById("orderMessage").textContent =
        "محصولی برای ثبت سفارش انتخاب نشده است.";
    return;
}
const order = {
    products: cart.map(function(product) {
        return {
            productId: product.ID,
            productName: product.NAME,
            price: Number(product.PRICE)
        };
    }),
    total: calculateTotal(),
    customerName: name,
    customerPhone: phone,
    customerAddress: address
};

localStorage.setItem("mFishOrder", JSON.stringify(order));
document.getElementById("orderMessage").textContent = "سفارش آزمایشی شما در این مرورگر ذخیره شد!";
const savedOrder = JSON.parse(
    localStorage.getItem("mFishOrder")
);
if (savedOrder) {
    document.getElementById("savedOrderSection").hidden = false;
    document.getElementById("savedCustomerName").textContent = savedOrder.customerName;
document.getElementById("savedProductName").textContent =
    savedOrder.products.map(function(product) {
        return product.productName;
    }).join("، ");

document.getElementById("savedProductPrice").textContent =
    formatPrice(savedOrder.total);

document.getElementById("summeryName").textContent =
    cart.map(function(product) {
        return product.NAME;
    }).join("، ");

document.getElementById("summeryPrice").textContent =
    formatPrice(calculateTotal());
});
