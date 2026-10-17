console.log("javascript connected");
const buttons = document.querySelectorAll(".buy-btn");
console.log("تعداد دکمه های خرید:", buttons.length);
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const card = button.closest("article");
        if (!card) return;
        const name =card.querySelector("h2").textContent.trim();
        const priceText = card.querySelector(".price").textContent;
        const price = Number(priceText.replace(/[^\d]/g, ""));
        const product = { name, price };
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "cart.html";
        const cartItems = document.querySelector("#cart-item");
        const cartTotal = document.querySelector("#cart-total");
        if (cartItems && cartTotal) {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            let total = 0;
            cartItems.innerHTML = "";
            cart.forEach(function(product) {
                const item = document.createElement("p");
                item.textContent = 
                    product.name + "_" + product.price + "تومان";
                cartItems.appendChild(item);
                total += product.price;
             });
    cartTotal.textContent = total.tolocalestring("fa-IR");
}
