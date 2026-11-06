const foodContainer = document.getElementById("food-products");
fetch("https://express-day2-1.onrender.com/api/product")
.then(Response => Response.json())
.then(products => {
    const foodProducts = 
    products.filter(product => product.category === "food");
    foodContainer.innerHTML = "";
    foodProducts.forEach(product => {
        const article = 
        document.createElement("article");
        article.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <img src="${product.image}"
        alt="${product.name}">
        <p
        class="price">${Number(product.price).toLocaleString("fa-IR")} تومان</p>
        <button type="button" class="buy-btn" onclick="buyFood(${product.id})">خرید</button>`;
        foodContainer.appendChild(article);
    });
})
.catch(error => {
    console.error("خطا در دریافت غذاها", error);
    foodContainer.innerHTML = "<p>دریافت محصولات با خطا مواجه شد</p>";
});
