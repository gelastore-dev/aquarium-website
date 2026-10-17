console.log("javascript connected");
const buttons = document.querySelectorAll(".buy-btn");
console.log("تعداد دکمه های خرید:", buttons.length);
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const card = button.closest("article");
        const price = card.querySelector(".price").textContent;
        const name = card.querySelector("h2").textContent;
        const product = {
            name : name,
            price : price,
        };
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        const savedproduct = localStorage.getItem("cart");
        if (savedproduct) {
            const savedproductdata = JSON.parse(savedproduct);
            console.log("نام محصول :", savedproductdata.name);
            console.log("قیمت محصول :", savedproductdata.price);
        }
        
        
        window.location.href = "cart.html";
    
    });
});
