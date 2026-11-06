const equipmentContainer = document.getElementById("equipment-products");
console.log("equipment container:", equipmentContainer);
fetch("https://express-day2-1.onrender.com/api/product")
.then(Response => Response.json())
.then(products => {
    const equipmentProducts = products.filter(product => product.category === "equipment");
    equipmentContainer.innerHTML = "";
    equipmentProducts.forEach(product => {
        const article = document.createElement("article");
        article.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <img src="${product.image}"
         alt="${product.name}">
        <p
        class="price">${Number(product.price).toLocaleString("fa-IR")} تومان</p>
        <button class="buy-btn" onclick="buyEquipment(${product.id})">خرید</button>`;
        equipmentContainer.appendChild(article);

    });
})
.catch(error => {
    console.error("خطا در دریافت تجهیزات:",error);
    equipmentContainer.innerHTML= "<p>دریافت محصولات با خطا مواجه شد</p>"
});
