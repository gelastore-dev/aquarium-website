
/* =====================================
   1. جستجوی دسته‌بندی‌ها
===================================== */

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

            const matches = title.textContent
                .trim()
                .toLowerCase()
                .includes(searchText);

            card.style.display = matches ? "" : "none";

            if (matches) visibleCount++;
        });

        if (searchMessage) {
            searchMessage.textContent =
                visibleCount === 0
                    ? "دسته‌بندی موردنظر پیدا نشد!"
                    : "";
        }
    });
}


/* =====================================
   2. آدرس API
===================================== */

const API_URL =
    "https://express-day2-1.onrender.com/api/product";


/* =====================================
   3. دریافت محصولات از سرور
===================================== */

async function getProducts() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("دریافت محصولات ناموفق بود!");
        }

        const data = await response.json();

        // بررسی ساختار اطلاعات دریافتی
        const products = Array.isArray(data)
            ? data
            : data.products;

        if (!Array.isArray(products)) {
            throw new Error("ساختار اطلاعات محصولات معتبر نیست!");
        }

        window.apiProducts = products;

        console.log("محصولات دریافت شدند:", products);

        return products;

    } catch (error) {

        console.error("خطا در دریافت محصولات:", error);

        return null;
    }
}


/* =====================================
   4. نمایش محصولات دریافتی از API
===================================== */

function displayProducts(products) {

    const productContainer = document.getElementById("fishs");

    if (!productContainer) return;

    productContainer.innerHTML = "";

    if (!products || products.length === 0) {

        productContainer.textContent =
            "در حال حاضر محصولی برای نمایش وجود ندارد.";

        return;
    }

    products.forEach(function (product) {

        const id = product.ID ?? product.id;
        const name = product.NAME ?? product.name;
        const price = product.PRICE ?? product.price;
        const imageUrl = product.Image ?? product.image;
        const description =
            product.DESCRIPTION ?? product.description ?? "";

        // ساخت کارت
        const card = document.createElement("div");
        card.className = "card";

        // تصویر
        const image = document.createElement("img");

        image.src = imageUrl || "images/default.webp";
        image.alt = name || "محصول";

        image.onerror = function () {
            this.style.display = "none";
        };

        // قیمت
        const priceElement = document.createElement("p");

        priceElement.className = "price";

        const numericPrice = Number(price);

        priceElement.textContent =
            Number.isFinite(numericPrice)
                ? numericPrice.toLocaleString("fa-IR") + " تومان"
                : "قیمت نامشخص";

        // نام محصول
        const title = document.createElement("h2");

        title.textContent = name || "محصول بدون نام";

        // توضیحات (در صورت وجود)
        const descriptionElement = document.createElement("p");

        descriptionElement.textContent = description;

        // دکمه مشاهده محصول
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = "مشاهده محصول";
        button.className = "buy-btn";

        button.addEventListener("click", function () {

            if (id == null) {
                alert("شناسه محصول معتبر نیست!");
                return;
            }

            window.location.href =
                "product.html?id=" + encodeURIComponent(id);
        });

        // اضافه کردن عناصر به کارت
        card.append(
            image,
            priceElement,
            title
        );

        if (description) {
            card.appendChild(descriptionElement);
        }

        card.appendChild(button);

        // اضافه کردن کارت به صفحه
        productContainer.appendChild(card);

    });
}


/* =====================================
   5. اجرای دریافت و نمایش محصولات
===================================== */

async function initProducts() {

    const productContainer = document.getElementById("fishs");

    if (!productContainer) return;

    productContainer.textContent = "در حال دریافت محصولات...";

    const products = await getProducts();

    if (products === null) {

        productContainer.textContent =
            "خطا در دریافت محصولات! لطفاً دوباره تلاش کنید.";

        return;
    }

    displayProducts(products);
}


/* =====================================
   6. تجهیزات، غذا و تزئینات
===================================== */

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


/* =====================================
   7. سیستم سبد خرید
===================================== */

window.addToCart = function (product) {

    if (
        !product ||
        product.ID == null ||
        !product.NAME ||
        !Number.isFinite(Number(product.PRICE))
    ) {

        alert("اطلاعات محصول معتبر نیست.");
        return;
    }

    let cart = [];

    try {

        cart = JSON.parse(
            localStorage.getItem("mFishCart") || "[]"
        );

        if (!Array.isArray(cart)) {
            cart = [];
        }

    } catch (error) {

        cart = [];
    }

    const existing = cart.find(function (item) {

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

        localStorage.setItem(
            "mFishCart",
            JSON.stringify(cart)
        );

    } catch (error) {

        alert("ذخیره سبد خرید انجام نشد.");
    }
};


/* =====================================
   8. خرید تجهیزات، غذا و تزئینات
===================================== */

function buyProduct(id) {

    const product = shopProducts[id];

    if (!product) {

        alert("محصول پیدا نشد!");
        return;
    }

    if (typeof window.addToCart !== "function") {

        alert("تابع سبد خرید پیدا نشد!");
        return;
    }

    window.addToCart(product);

    window.location.href = "order.html";
}

window.buyEquipment = buyProduct;
window.buyFood = buyProduct;
window.buyDecoration = buyProduct;


/* =====================================
   9. شروع برنامه
===================================== */

initProducts();
