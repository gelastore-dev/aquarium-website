
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

            article.dataset.name = product.name.toLowerCase();
            article.dataset.price = Number(product.price);

            article.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description || ""}</p>
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

        // جستجو و فیلتر قیمت
        const searchInput = document.getElementById("searchInput");
        const priceFilter = document.getElementById("priceFilter");

        function filterFood() {
            const searchText = searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";

            const selectedPrice = priceFilter
                ? priceFilter.value
                : "all";

            foodContainer.querySelectorAll("article").forEach(article => {
                const name = article.dataset.name;
                const price = Number(article.dataset.price);

                const matchesSearch = name.includes(searchText);

                let matchesPrice = true;

                if (selectedPrice === "500000") {
                    matchesPrice = price < 500000;
                } else if (selectedPrice === "1000000") {
                    matchesPrice = price < 1000000;
                } else if (selectedPrice === "1000001") {
                    matchesPrice = price > 1000000;
                }

                article.hidden = !(matchesSearch && matchesPrice);
            });
        }

        if (searchInput) {
            searchInput.addEventListener("input", filterFood);
        }

        if (priceFilter) {
            priceFilter.addEventListener("change", filterFood);
        }
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
