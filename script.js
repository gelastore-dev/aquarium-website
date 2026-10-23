/* جست‌وجوی دسته‌بندی‌ها */
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

            const matches = title.textContent.trim().toLowerCase()
                .includes(searchText);

            card.style.display = matches ? "" : "none";
            if (matches) visibleCount++;
        });

        if (searchMessage) {
            searchMessage.textContent =
                visibleCount === 0 ? "دسته‌بندی موردنظر پیدا نشد!" : "";
        }
    });
}

/* اطلاعات محصولات ماهی */
window.products = [
    {
        ID: 1,
        NAME: "ماهی گوپی",
        PRICE: 95000,
        Image: "images/OIP (10).webp",
        DESCRIPTION: "ماهی گوپی از ماهی‌های زینتی آب شیرین است و نگهداری نسبتاً آسانی دارد."
    },
    {
        ID: 2,
        NAME: "ماهی فایتر",
        PRICE: 550000,
        Image: "images/OIP (11).webp",
        DESCRIPTION: "ماهی فایتر با رنگ‌های متنوع و باله‌های زیبا شناخته می‌شود."
    },
    {
        ID: 3,
        NAME: "ماهی آنجل",
        PRICE: 550000,
        Image: "images/OIP (12).webp",
        DESCRIPTION: "ماهی آنجل از ماهی‌های محبوب آب شیرین است."
    },
    {
        ID: 4,
        NAME: "ماهی نیون تترا",
        PRICE: 290000,
        Image: "images/OIP (13).webp",
        DESCRIPTION: "ماهی کوچک آب شیرین با رنگ آبی و قرمز درخشان."
    },
    {
        ID: 5,
        NAME: "ماهی دیسکس",
        PRICE: 1248000,
        Image: "images/OIP (14).webp",
        DESCRIPTION: "ماهی دیسکس به کیفیت پایدار آب و مراقبت منظم نیاز دارد."
    },
    {
        ID: 6,
        NAME: "ماهی آروانا",
        PRICE: 9000000,
        Image: "images/download.webp",
        DESCRIPTION: "ماهی آروانا به فضای شنای زیاد و فیلتراسیون قوی نیاز دارد."
    }
];

/* نمایش کارت‌های ماهی */
const productContainer = document.getElementById("fishs");

if (productContainer) {
    window.products.forEach(function (product) {
        const card = document.createElement("div");
        card.className = "card";

        const image = document.createElement("img");
        image.src = product.Image;
        image.alt = product.NAME;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent =
            product.PRICE.toLocaleString("fa-IR") + " تومان";

        const title = document.createElement("h2");
        title.textContent = product.NAME;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "مشاهده محصول";
        button.className = "buy-btn";

        button.addEventListener("click", function () {
            window.location.href = "product.html?id=" + product.ID;
        });

        card.append(image, price, title, button);
        productContainer.appendChild(card);
    });
}

/* تجهیزات، غذا و تزئینات */
const shopProducts = {
    101: { ID: 101, NAME: "فیلتر آکواریوم", PRICE: 1190000 },
    102: { ID: 102, NAME: "بخاری آکواریوم", PRICE: 1270000 },
    103: { ID: 103, NAME: "پمپ هوا", PRICE: 6300000 },
    104: { ID: 104, NAME: "دماسنج آکواریوم", PRICE: 1600000 },
    105: { ID: 105, NAME: "LED آکواریوم", PRICE: 1450000 },
    106: { ID: 106, NAME: "سیفون و نظافت آکواریوم", PRICE: 1721000 },

    201: { ID: 201, NAME: "غذای پولکی", PRICE: 410000 },
    202: { ID: 202, NAME: "غذای گرانولی", PRICE: 635000 },
    203: { ID: 203, NAME: "کرم خونی خشک", PRICE: 290000 },
    204: { ID: 204, NAME: "قرص جلبک", PRICE: 1200000 },

    301: { ID: 301, NAME: "گیاه مصنوعی آکواریوم", PRICE: 250000 },
    302: { ID: 302, NAME: "سنگ و شن تزیینی", PRICE: 689000 },
    303: { ID: 303, NAME: "چوب تزیینی", PRICE: 1580000 },
    304: { ID: 304, NAME: "مرجان مصنوعی", PRICE: 690000 }
};

/* خرید همه محصولات */
function buyProduct(id) {
    const product = shopProducts[id];

    if (!product) {
        alert("محصول پیدا نشد!");
        return;
    }

    if (typeof window.addToCart !== "function") {
        alert("تابع addToCart پیدا نشد. کد سبد خرید را بررسی کن.");
        return;
    }

    window.addToCart(product);
    window.location.href = "order.html";
}

window.buyEquipment = buyProduct;
window.buyFood = buyProduct;
window.buyDecoration = buyProduct;
window.addToCart = function(product) {
    if (!product || product.ID == null ||
        !product.NAME || !Number.isFinite(Number(product.PRICE))) {
        alert("اطلاعات محصول معتبر نیست.");
        return;
    }

    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem("mFishCart") || "[]");
        if (!Array.isArray(cart)) cart = [];
    } catch (error) {
        cart = [];
    }

    const existing = cart.find(function(item) {
        return Number(item.ID) === Number(product.ID);
    });

    if (existing) {
        existing.quantity = Number(existing.quantity || 1) + 1;
    } else {
        cart.push({
            ID: Number(product.ID),
            NAME: String(product.NAME),
            PRICE: Number(product.PRICE),
            quantity: 1
        });
    }

    try {
        localStorage.setItem("mFishCart", JSON.stringify(cart));
    } catch (error) {
        alert("ذخیره سبد خرید انجام نشد.");
        return;
    }
};