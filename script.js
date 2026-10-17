console.log("javascript connected");
const buttons = document.querySelectorAll(".buy-btn");
console.log("تعداد دکمه های خرید:", buttons.length);
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      
        window.location.href = "cart.html";
    
    });
});
