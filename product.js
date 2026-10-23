const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const selectedProduct = (window.products || []).find(function(product) {
    return product.ID === productId;
});

if (selectedProduct) {
    document.getElementById("productName").textContent =
        selectedProduct.NAME;

    document.getElementById("productPrice").textContent =
        selectedProduct.PRICE.toLocaleString("fa-IR") + " تومان";

    document.getElementById("productImage").src =
        selectedProduct.Image;

    document.getElementById("productDescription").textContent =
        selectedProduct.DESCRIPTION;

    document.getElementById("buybutton").addEventListener("click", function() {
        window.addToCart(selectedProduct);
        window.location.href = "order.html";
    });
} else {
    document.getElementById("productDetails").textContent =
        "محصول موردنظر پیدا نشد! لطفاً از صفحه ماهی‌ها دوباره انتخاب کن.";

    const backButton = document.createElement("a");
    backButton.href = "fish.html";
    backButton.textContent = "بازگشت به ماهی‌ها";
    document.getElementById("productDetails").appendChild(backButton);
}