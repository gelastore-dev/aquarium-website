
const foodContainer = document.getElementById("food-products");

fetch("https://express-day2-1.onrender.com/api/product/category/food")
    .then(response => {
        if (!response.ok) {
            throw new Error("خطا در دریافت غذاها");
        }
        return response.json();
    })
    .then(foodProducts => {

        foodContainer.innerHTML = "";

        foodProducts.forEach(product => {
            const article = document.createElement("article");

            article.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <img src="${product.image}" alt="${product.name}">
                <p class="price">
                    ${Number(product.price).toLocaleString("fa-IR")} تومان
                </p>
                <button type="button" class="buy-btn"
                    onclick="window.location.href='product.html?id=${product.id}'">
                    مشاهده محصول
                </button>
            `;

            foodContainer.appendChild(article);
        });
    })
    .catch(error => {
        console.error("خطا در دریافت غذاها:", error);
        foodContainer.innerHTML =
            "<p>دریافت محصولات با خطا مواجه شد</p>";
    });


async function buyFood(id) {
    try {
        const response = await fetch(
            "https://express-day2-1.onrender.com/api/product"
        );

        if (!response.ok) {
            throw new Error("خطا در دریافت محصولات");
        }

        const products = await response.json();

        const product = products.find(
            item => Number(item.id ?? item.ID) === Number(id)
        );

        if (!product) {
            alert("محصول غذا پیدا نشد.");
            return;
        }

        addToCart({
            ID: Number(product.id ?? product.ID),
            NAME: product.name ?? product.NAME,
            PRICE: Number(product.price ?? product.PRICE)
        });

        window.location.href = "order.html";

    } catch (error) {
        console.error(error);
        alert("خطا در افزودن محصول به سبد خرید.");
    }
}
