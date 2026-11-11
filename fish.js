
const apiUrl = "https://express-day2-1.onrender.com/api/product";

async function loadFish() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("خطا در دریافت محصولات");
        }

        const products = await response.json();

        const fishProducts = products.filter(product =>
            product.category === "fish"
        );

        const container = document.getElementById("productList");
        container.innerHTML = "";

        const fishGrid = document.createElement("div");
        fishGrid.className = "fish-item";

        fishProducts.forEach(product => {
            const article = document.createElement("article");

            article.dataset.name = product.name.toLowerCase();
            article.dataset.price = Number(product.price);

            article.innerHTML = `
                <h2>${product.name}</h2>

                <img src="${product.image}" alt="${product.name}">

                <p>${product.description || ""}</p>

                <p>
                    قیمت:
                    ${Number(product.price).toLocaleString("fa-IR")}
                    تومان
                </p>

                <button class="buy-button"
                    onclick="window.location.href='product.html?id=${product.id}'">
                    مشاهده محصول
                </button>
            `;

            fishGrid.appendChild(article);
        });

        container.appendChild(fishGrid);

        // فعال‌سازی جستجو و فیلتر قیمت
        const searchInput = document.getElementById("searchInput");
        const priceFilter = document.getElementById("priceFilter");

        function filterFish() {
            const searchText = searchInput.value.trim().toLowerCase();
            const selectedPrice = priceFilter.value;

            fishGrid.querySelectorAll("article").forEach(article => {
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
            searchInput.addEventListener("input", filterFish);
        }

        if (priceFilter) {
            priceFilter.addEventListener("change", filterFish);
        }

    } catch (error) {
        console.error("Fish Error:", error);

        document.getElementById("productList").textContent =
            "دریافت اطلاعات با مشکل مواجه شد";
    }
}

loadFish();
