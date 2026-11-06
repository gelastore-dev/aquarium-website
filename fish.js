
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

        // استفاده از کلاس CSS قبلی
        const fishGrid = document.createElement("div");
        fishGrid.className = "fish-item";

        fishProducts.forEach(product => {
            fishGrid.innerHTML += `
                <article>
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
                </article>
            `;
        });

        container.appendChild(fishGrid);

    } catch (error) {
        console.error("Fish Error:", error);
        document.getElementById("productList").textContent =
            "دریافت اطلاعات با مشکل مواجه شد";
    }
}

loadFish();
