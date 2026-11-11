
const decorationContainer = document.getElementById("decoration-products");

fetch("https://express-day2-1.onrender.com/api/product")
    .then(response => {
        if (!response.ok) {
            throw new Error("خطا در دریافت محصولات");
        }

        return response.json();
    })
    .then(products => {

        const decorationProducts = products.filter(
            product => product.category === "decoration"
        );

        decorationContainer.innerHTML = "";

        decorationProducts.forEach(product => {
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

            decorationContainer.appendChild(article);
        });

        // جستجو و فیلتر قیمت
        const searchInput = document.getElementById("searchInput");
        const priceFilter = document.getElementById("priceFilter");

        function filterDecoration() {
            const searchText = searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";

            const selectedPrice = priceFilter
                ? priceFilter.value
                : "all";

            decorationContainer.querySelectorAll("article").forEach(article => {
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
            searchInput.addEventListener("input", filterDecoration);
        }

        if (priceFilter) {
            priceFilter.addEventListener("change", filterDecoration);
        }
    })
    .catch(error => {
        console.error("خطا در دریافت دکوراسیون:", error);

        decorationContainer.innerHTML =
            "<p>دریافت محصولات با خطا مواجه شد</p>";
    });
