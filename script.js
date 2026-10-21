
const searchInput = document.querySelector("#searchInput");
const cards = document.querySelectorAll(".category-card");
const searchMessage = document.querySelector("#searchMessage");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach(function (card) {
            const title = card.querySelector("h3");

            if (!title) return;

            const categoryName = title.textContent
                .trim()
                .toLowerCase();

            if (categoryName.includes(searchText)) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (searchMessage) {
            searchMessage.textContent =
                visibleCount === 0
                    ? "دسته‌بندی موردنظر پیدا نشد!"
                    : "";
        }
    });
}
const products = [
    {
        NAME : "ماهی گوپی",
        PRICE : 95000,
        Image : "images/OIP (10).webp"
    },
    {
        NAME : "ماهی فایتر",
        PRICE : 550000,
        Image : "images/OIP (11).webp"
    },
    {
        NAME : "ماهی آنجل",
        PRICE : 550000,
        Image : "images/OIP (12).webp"
    },
    {
        NAME : "ماهی نیون تترا",
        PRICE : 290000,
        Image : "images/OIP (13).webp"
    },
    {
        NAME : "ماهی دیسکس",
        PRICE : 1248000,
        Image : "images/OIP (14).webp"
    },
    {
        NAME : "ماهی آروانا",
        PRICE : 9000000,
        Image : "images/download.webp"
    }
]
const productContainer = document.getElementById("fishs");
products.forEach(function(product) {
    const card = document.createElement("div")
    card.className = "card";
    const Image = document.createElement("img")
        Image.src = product.Image;
        Image.alt = product.NAME;
    const price = document.createElement("p")
        price.className = "price"
        price.textContent = product.PRICE.toLocaleString("fa-IR") + "تومان";
    const title = document.createElement("h2")
        title.textContent = product.NAME;

    card.append(Image, price, title);
    productContainer.append(card);
});
