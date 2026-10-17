console.log("javascript connected");
const buttons = document.querySelectorAll(".buy-btn");
console.log("تعداد دکمه های خرید:", buttons.length);
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const card = button.closest("article");
        const price = card.querySelector(".price").textContent;
        const name = card.querySelector("h2").textContent;
    
        
        
        window.location.href = "cart.html";
    
    });
});
