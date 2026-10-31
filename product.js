const apiUrl = "https://express-day2-1.onrender.com/api/product";
async function loadProduct() {
    try {
        const params = new
        URLSearchParams(window.location.search);
        const productId =
        Number(params.get("id"));
        const response = await fetch(apiUrl);
        if(!response.ok) {
            throw new Error("خطا در دریافت محصولات");
        }
        const products = await response.json();
        const Product = 
        products.find(function(item) {
            return Number(item.id) === productId;
        });
if (!Product) {
    document.getElementById("productDetails").textContent =
        "محصول مورد نظر یافت نشد!";
        return;}
        document.getElementById("productName").textContent = Product.name;

    document.getElementById("productPrice").textContent =
        Number(Product.price).toLocaleString("fa-IR") + " تومان";

    document.getElementById("productImage").src =
        Product.image;

    document.getElementById("productDescription").textContent =
        Product.description || "توضیحاتی برای این محصول ثبت نشده است.";
    const selectedProduct = {
        ...Product,
        ID: Product.id,
        NAME: Product.name,
        PRICE: Product.price,
        Image: Product.image,
        DESCRIPTION: Product.description
    };
    document.getElementById("buybutton").addEventListener("click", function() {
        window.addToCart(selectedProduct);
        window.location.href = "order.html";
    });
} catch (error) {
    console.error("Product Error:", error);
    document.getElementById("productDetails").textContent = "دریافت اطلاعات با مشکل مواجه است";
}
}
loadProduct();