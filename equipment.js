
const equipmentContainer = document.getElementById("equipment-products");

console.log("NEW EQUIPMENT JS LOADED");
console.log("equipment container:", equipmentContainer);

fetch("https://express-day2-1.onrender.com/api/product/category/equipment")
    .then(response => {
        if (!response.ok) {
            throw new Error("خطا در دریافت تجهیزات");
        }
        return response.json();
    })
    .then(equipmentProducts => {

        equipmentContainer.innerHTML = "";

        equipmentProducts.forEach(product => {
            const article = document.createElement("article");

            article.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <img src="${product.image}" alt="${product.name}">
                <p class="price">
                    ${Number(product.price).toLocaleString("fa-IR")} تومان
                </p>
                <button type="button" class="buy-btn"
                    onclick="buyEquipment(${Number(product.id)})">
                    خرید
                </button>
            `;

            equipmentContainer.appendChild(article);
        });
    })
    .catch(error => {
        console.error("خطا در دریافت تجهیزات:", error);
        equipmentContainer.innerHTML =
            "<p>دریافت محصولات با خطا مواجه شد</p>";
    });


window.buyEquipment = async function(id) {
    try {
        const response = await fetch(
            "https://express-day2-1.onrender.com/api/product"
        );

        if (!response.ok) {
            throw new Error("خطا در دریافت اطلاعات محصول");
        }

        const products = await response.json();

        const product = products.find(
            item => Number(item.id) === Number(id)
        );

        if (!product) {
            alert("محصول تجهیزات پیدا نشد.");
            return;
        }

        addToCart({
            ID: Number(product.id),
            NAME: product.name,
            PRICE: Number(product.price)
        });

        window.location.href = "order.html";

    } catch (error) {
        console.error("خطای خرید تجهیزات:", error);
        alert("خطا در افزودن محصول به سبد خرید.");
    }
};
