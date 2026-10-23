
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
window.products = [
    {
        ID: 1,
        NAME : "ماهی گوپی",
        PRICE : 95000,
        Image : "images/OIP (10).webp",
        DESCRIPTION : "ماهی گوپی از ماهی های زینتی آب شیرین است که به دلیل تنوع رنگ و نگهداری نسبتا آسان محبوبیت زیادی دارد . برای نگهداری آن به آب تمیز تغذیه ای متعادل و محیطی مناسب نیاز است"
    },
    {
        ID: 2,
        NAME : "ماهی فایتر",
        PRICE : 550000,
        Image : "images/OIP (11).webp",
        DESCRIPTION : "ماهی فایتر یکی از ماهی های زینتی محبوب با رنگ های متنوع و باله های زیباست فایتر های نر معمولا با یکدیگر سازگار نیستند"
    },
    {
        ID: 3,
        NAME : "ماهی آنجل",
        PRICE : 550000,
        Image : "images/OIP (12).webp",
        DESCRIPTION : "ماهی آنجل از ماهی های آب شیرین است هنگام انتخاب هم تانکی رفتار و اندازه ماهی های دیگر را در نظر بگیرید"
    },
    {
        ID: 4,
        NAME : "ماهی نیون تترا",
        PRICE : 290000,
        Image : "images/OIP (13).webp",
        DESCRIPTION : "ماهی کوچک آب شیرین با رنگ ابی و قرمز درخشان است این ماهی بهتر است در گروه نکهداری شود و به آب پایدار محیط آرام و تغذیه متناسب با جثه خود نیاز دارد ماهی غیر تهاجمی برای هم تانکی انتخاب کنید"
    },
    {
        ID: 5,
        NAME : "ماهی دیسکس",
        PRICE : 1248000,
        Image : "images/OIP (14).webp",
        DESCRIPTION : "ماهی دیسکس بخاطر شکل گرد و زنگ های زیبایش شناخته می شود این ماهی به کیفیت پایدار آب دمای مناسب  تغذیه با کیفیت و مراقبت منظم نیاز دارد و برای افراد آشنا با نگهداری آکواریوم انتخاب مناسب تری است"
    },
    {
        ID: 6,
        NAME : "ماهی آروانا",
        PRICE : 9000000,
        Image : "images/download.webp",
        DESCRIPTION : "ماهی آروانا بدنی کشیده و ظاهری چشمگیر دارد و به فضای شنای زیاد نیازمند است و پیش از انتخاب آن باید اندازه نهایی ماهی ابعاد آکواریوم  فیلتراسیون قوی و شرایط قانونی نگهداری گونه مورد نظر را بررسی کنید" 
    }
]
const productContainer = document.getElementById("fishs");
window.products.forEach(function(product) {
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
    const button = document.createElement("button")
    button.textContent = "مشاهده محصول";
    button.className = "buy-btn";
    button.addEventListener("click", function() {
        window.location.href = "product.html?id=" + product.ID;
    });

    card.append(Image, price, title, button);
    productContainer.append(card);
});

