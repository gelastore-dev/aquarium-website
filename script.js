
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