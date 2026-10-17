const buttons =document.querySelectorAll(".buy-btn");
buttons.forEach(function(buttons) {
    buttons.addEventListener("click", function() {
        window.location.href = "cart.html";
    });
});
    