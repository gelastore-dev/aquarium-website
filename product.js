const parms = new URLSearchParams(window.location.search);
const productId = Number(parms.get("id"));

console.log(productId);
console.log(window.products);
const selectedProduct = window.products.find(function(product) {
    return product.ID === productId;
});
console.log(selectedProduct.DESCRIPTION);
document.getElementById("productName").textContent = selectedProduct.NAME;
document.getElementById("productPrice").textContent =selectedProduct.PRICE + "تومان";
document.getElementById("productImage").src = selectedProduct.Image;
document.getElementById("productDescription").textContent = selectedProduct.DESCRIPTION;
document.getElementById("buybutton").addEventListener("click", function() {
    window.location.href = "order.html?id=" + selectedProduct.ID;
});