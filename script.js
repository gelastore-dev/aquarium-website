
alert("کلیک اجرا شد");
console.log("javascript connected");

const buttons = document.querySelectorAll(".buy-btn");

console.log("تعداد دکمه‌های خرید:", buttons.length);

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest("article");
        if (!card) return;

        const nameElement = card.querySelector("h2");
        const priceElement = card.querySelector(".price");

        if (!nameElement || !priceElement) {
            console.error("نام یا قیمت محصول پیدا نشد");
            return;
        }

        const name = nameElement.textContent.trim();
        const priceText = priceElement.textContent;
        const price = Number(priceText.replace(/[^\d]/g, ""));

        const product = { name, price };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        window.location.href = "cart.html";
    });
});

// نمایش محصولات و مجموع قیمت در صفحه سبد خرید
const cartItems = document.querySelector("#cart-item");
const cartTotal = document.querySelector("#cart-total");

if (cartItems && cartTotal) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach(function (product) {
        const item = document.createElement("p");

        item.textContent =
            product.name + " - " +
            product.price.toLocaleString("fa-IR") + " تومان";

        cartItems.appendChild(item);
        total += product.price;
    });

    cartTotal.textContent = total.toLocaleString("fa-IR");
}