const buttons = document.querySelectorAll("#buy-btn");
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        button.classList.toggle("highlight");
    });
});
    