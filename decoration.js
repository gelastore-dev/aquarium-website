const decorationContainer = document.getElementById("decoration-products");
fetch("https://express-day2-1.onrender.com/api/product")
.then(Response => Response.json())
.then(products => {
    const decorationProducts = 
    products.filter(product => product.category === "decoration");
    decorationContainer.innerHTML = "";
    decorationProducts.forEach(product => {
        const article = 
        document.createElement("article");
        article.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <img src="${product.image}"
        alt="${product.name}">
        <p
        class="price">${Number(product.price).toLocaleString("fa-IR")} تومان</p>
        <button type="button" class="buy-btn" onclick="buyDecoration(${product.id})">خرید</button>`;
        decorationContainer.appendChild(article);
    });
})
.catch(error => {
    console.error("خطا در دریافت غذاها", error);
    decorationContainer.innerHTML = "<p>دریافت محصولات با خطا مواجه شد</p>";
});