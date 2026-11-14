const PRODUCT_API_URL = "https://express-day2-1.onrender.com/api/product";

async function loadProduct() {
    try {
        const params = new URLSearchParams(window.location.search);
        const productId = Number(params.get("id"));

        if (!Number.isInteger(productId) || productId <= 0) {
            throw new Error("شناسه محصول معتبر نیست.");
        }

        const response = await fetch(PRODUCT_API_URL);

        if (!response.ok) {
            throw new Error("خطا در دریافت محصولات");
        }

        const products = await response.json();

        const product = products.find(function(item) {
            return Number(item.id) === productId;
        });

        if (!product) {
            document.getElementById("productDetails").textContent =
                "محصول مورد نظر یافت نشد!";
            return;
        }

        /* نمایش اطلاعات محصول */
        document.getElementById("productName").textContent =
            product.name;

        document.getElementById("productPrice").textContent =
            Number(product.price).toLocaleString("fa-IR") + " تومان";

        document.getElementById("productImage").src =
            product.image;

        document.getElementById("productDescription").textContent =
            product.description || "توضیحاتی برای این محصول ثبت نشده است.";

        /* تبدیل اطلاعات به ساختار سبد خرید */
        const selectedProduct = {
            ID: Number(product.id),
            NAME: String(product.name),
            PRICE: Number(product.price),
            quantity: 1
        };

        /* دکمه خرید */
        const buyButton = document.getElementById("buybutton");

        buyButton.addEventListener("click", function() {

            if (typeof window.addToCart !== "function") {
                console.error("تابع addToCart پیدا نشد.");
                alert("امکان افزودن محصول به سبد خرید وجود ندارد.");
                return;
            }

            window.addToCart(selectedProduct);

            window.location.href = "order.html";
        });

    } catch (error) {
        console.error("Product Error:", error);

        document.getElementById("productDetails").textContent =
            "دریافت اطلاعات محصول با مشکل مواجه شد.";
    }
}

loadProduct();
