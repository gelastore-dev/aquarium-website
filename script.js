const buttons =document.querySelectorAll(".buy-btn");
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const card = buttons.closest("article");
        const price = card.querySelector(".price").textContent;
        const name = card.querySelector("h2").textContent;
        window.location.href = "cart.html";
        console.log("محصول:", name, "قیمت :", price);
    
    });
});
