console.log("javascript connected");
const buttons = document.querySelectorAll(".buy-btn");
console.log("تعداد دکمه های خرید:", buttons.length);
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const card = button.closest("article");
        const name =card.querySelector("h2").textContent.trim();
        const pricetext = card.querySelector(".price").textContent;
        const price = Number(pricetext.replace(/[^\d]/g, ""));
        const product = { name, price };
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "cart.html";
        const cartitems = document.querySelector("#cart-item");
        const carttotal = document.querySelector("#cart-total");
        if (cartitems && carttotal) {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            let total = 0;
            cartitems.innerHTML = "";
            cart.forEach(function(product) {
                const item = document.createElement("p");
                item.textContent = 
                    product.name + "_" + product.price + "تومان";
                cartitems.appendChild(item);
                total += product.price;

       
    
    });
    carttotal.textContent = total.tolocalestring("fa-IR");
}
