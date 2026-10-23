
const CART_KEY = "mFishCart";
const ORDER_KEY = "mFishOrder";

let cart = loadCart();

function loadCart() {
    try {
        const savedCart = JSON.parse(
            localStorage.getItem(CART_KEY) || "[]"
        );

        if (!Array.isArray(savedCart)) return [];

        return savedCart.filter(function(product) {
            return product &&
                product.ID != null &&
                product.NAME != null &&
                Number.isFinite(Number(product.PRICE)) &&
                Number(product.PRICE) >= 0 &&
                Number.isInteger(product.quantity) &&
                product.quantity > 0;
        }).map(function(product) {
            return {
                ...product,
                ID: Number(product.ID),
                PRICE: Number(product.PRICE),
                quantity: product.quantity
            };
        });
    } catch (error) {
        console.error("خواندن سبد خرید ناموفق بود:", error);
        return [];
    }
}

function saveCart() {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error("ذخیره سبد خرید ناموفق بود:", error);
        showMessage("ذخیره سبد خرید انجام نشد.");
    }

    renderCart();
}

function formatPrice(price) {
    return Number(price).toLocaleString("fa-IR") + " تومان";
}

/* افزودن محصول یا افزایش تعداد آن */
function addToCart(product) {
    if (
        !product ||
        product.ID == null ||
        product.NAME == null ||
        !Number.isFinite(Number(product.PRICE)) ||
        Number(product.PRICE) < 0
    ) {
        console.error("اطلاعات محصول معتبر نیست.");
        return;
    }

    const existingProduct = cart.find(function(item) {
        return Number(item.ID) === Number(product.ID);
    });

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ID: Number(product.ID),
            NAME: String(product.NAME),
            PRICE: Number(product.PRICE),
            quantity: 1
        });
    }

    saveCart();
    showMessage(product.NAME + " به سبد خرید اضافه شد.");
}

/* تغییر تعداد محصول */
function changeQuantity(productId, amount) {
    const product = cart.find(function(item) {
        return Number(item.ID) === Number(productId);
    });

    if (!product) return;

    product.quantity += amount;

    if (product.quantity <= 0) {
        cart = cart.filter(function(item) {
            return Number(item.ID) !== Number(productId);
        });
    }

    saveCart();
}

/* حذف محصول */
function removeFromCart(productId) {
    cart = cart.filter(function(product) {
        return Number(product.ID) !== Number(productId);
    });

    saveCart();
}

/* خالی کردن کل سبد */
function clearCart() {
    cart = [];
    saveCart();
}

/* تعداد کل واحدهای محصولات */
function calculateCount() {
    return cart.reduce(function(sum, product) {
        return sum + product.quantity;
    }, 0);
}

/* جمع کل قیمت با احتساب تعداد */
function calculateTotal() {
    return cart.reduce(function(sum, product) {
        return sum + Number(product.PRICE) * product.quantity;
    }, 0);
}

function showMessage(message) {
    const element = document.getElementById("orderMessage");

    if (element) {
        element.textContent = message;
    }
}

/* نمایش سبد خرید */
function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    if (cartCount) {
        cartCount.textContent = calculateCount();
    }

    if (cartTotal) {
        cartTotal.textContent = formatPrice(calculateTotal());
    }

    const summaryName = document.getElementById("summeryName");
    const summaryPrice = document.getElementById("summeryPrice");

    if (summaryName) {
        summaryName.textContent = cart.length
            ? cart.map(function(product) {
                return product.NAME + " × " + product.quantity;
            }).join("، ")
            : "سبد خرید خالی است";
    }

    if (summaryPrice) {
        summaryPrice.textContent = formatPrice(calculateTotal());
    }

    if (!cartItems) return;

    cartItems.replaceChildren();

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "سبد خرید شما خالی است.";
        cartItems.appendChild(emptyMessage);
        return;
    }
    cart.forEach(function(product) {
        const item = document.createElement("div");
        item.className = "cart-item";

        const name = document.createElement("span");
        name.textContent = product.NAME;

        const price = document.createElement("span");
        price.textContent = formatPrice(product.PRICE);

        const quantity = document.createElement("span");
        quantity.textContent = "تعداد: " + product.quantity;

        const subtotal = document.createElement("span");
        subtotal.textContent = "جمع: " +
            formatPrice(product.PRICE * product.quantity);

        const decrease = document.createElement("button");
        decrease.type = "button";
        decrease.textContent = "−";
        decrease.setAttribute("aria-label", "کم کردن تعداد " + product.NAME);
        decrease.addEventListener("click", function() {
            changeQuantity(product.ID, -1);
        });

        const increase = document.createElement("button");
        increase.type = "button";
        increase.textContent = "+";
        increase.setAttribute("aria-label", "زیاد کردن تعداد " + product.NAME);
        increase.addEventListener("click", function() {
            changeQuantity(product.ID, 1);
        });

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "حذف";
        removeButton.addEventListener("click", function() {
            removeFromCart(product.ID);
        });

        item.append(
            name,
            price,
            decrease,
            quantity,
            increase,
            subtotal,
            removeButton
        );

        cartItems.appendChild(item);
    });
}

/* پشتیبانی از صفحه‌ای که محصول را با ?id= دریافت می‌کند */
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const selectedProduct = Number.isFinite(productId) && productId > 0
    ? window.products?.find(function(product) {
        return Number(product.ID) === productId;
    })
    : null;

if (selectedProduct) {
    const orderProduct = document.getElementById("orderProduct");
    const orderPrice = document.getElementById("orderPrice");

    if (orderProduct) orderProduct.textContent = selectedProduct.NAME;
    if (orderPrice) orderPrice.textContent = formatPrice(selectedProduct.PRICE);

    // محصول موجود دوباره به طور خودکار اضافه نمی‌شود.
    const alreadyInCart = cart.some(function(product) {
        return Number(product.ID) === Number(selectedProduct.ID);
    });

    if (!alreadyInCart) {
        addToCart(selectedProduct);
    }
} else if (params.has("id")) {
    showMessage("محصول موردنظر پیدا نشد.");
}

const orderForm = document.getElementById("orderForm");

if (orderForm) {
    orderForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("customerName")?.value.trim() || "";
        const phone = document.getElementById("customerPhone")?.value.trim() || "";
        const address = document.getElementById("customerAddress")?.value.trim() || "";

        const normalizedPhone = phone.replace(/[۰-۹]/g, function(digit) {
            return String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit));
        }).replace(/[٠-٩]/g, function(digit) {
            return String("٠١٢٣٤٥٦٧٨٩".indexOf(digit));
        });

        if (!name || !phone || !address) {
            showMessage("لطفاً همه فیلدها را پر کنید.");
            return;
        }

        if (!/^[0-9]{10,11}$/.test(normalizedPhone)) {
            showMessage("لطفاً شماره تماس معتبر وارد کنید.");
            return;
        }

        if (cart.length === 0) {
            showMessage("سبد خرید شما خالی است.");
            return;
        }

        const order = {
            products: cart.map(function(product) {
                return {
                    productId: product.ID,
                    productName: product.NAME,
                    price: product.PRICE,
                    quantity: product.quantity
                };
            }),
            total: calculateTotal(),
            customerName: name,
            customerPhone: normalizedPhone,
            customerAddress: address,
            createdAt: new Date().toISOString()
        };

        try {
            localStorage.setItem(ORDER_KEY, JSON.stringify(order));
            showMessage("سفارش آزمایشی در این مرورگر ذخیره شد.");
            renderSavedOrder();
        } catch (error) {
            showMessage("ذخیره سفارش ناموفق بود.");
            console.error(error);
        }
    });
}


function renderSavedOrder() {
    try {
        const savedOrder = JSON.parse(localStorage.getItem(ORDER_KEY) || "null");
        if (!savedOrder) return;

        const section = document.getElementById("savedOrderSection");
        if (section) section.hidden = false;

        const customer = document.getElementById("savedCustomerName");
        const products = document.getElementById("savedProductName");
        const price = document.getElementById("savedProductPrice");

        if (customer) customer.textContent = savedOrder.customerName;

        if (products) {
            products.textContent = savedOrder.products.map(function(product) {
                return product.productName + " × " + product.quantity;
            }).join("، ");
        }

        if (price) price.textContent = formatPrice(savedOrder.total);
    } catch (error) {
        console.error("خواندن سفارش ذخیره‌شده ناموفق بود:", error);
    }
}


window.addEventListener("storage", function(event) {
    if (event.key === CART_KEY) {
        cart = loadCart();
        renderCart();
    }
});

window.addEventListener("pageshow", function() {
    cart = loadCart();
    renderCart();
});

renderCart();
renderSavedOrder();


function buyEquipment(id) {
    const products = {
        101: { ID: 101, NAME: "فیلتر آکواریوم", PRICE: 1190000 },
        102: { ID: 102, NAME: "بخاری آکواریوم", PRICE: 1270000 },
        103: { ID: 103, NAME: "پمپ هوا", PRICE: 6300000 },
        104: { ID: 104, NAME: "دماسنج آکواریوم", PRICE: 1600000 },
        105: { ID: 105, NAME: "LED آکواریوم", PRICE: 1450000 },
        106: { ID: 106, NAME: "سیفون و نظافت آکواریوم", PRICE: 1721000 }
    };

    const product = products[id];
    if (!product) return;

    addToCart(product);
    window.location.href = "order.html";
}

function buyFood(id) {
    const products = {
        201: { ID: 201, NAME: "غذای پولکی", PRICE: 410000 },
        202: { ID: 202, NAME: "غذای گرانولی", PRICE: 635000 },
        203: { ID: 203, NAME: "کرم خونی خشک", PRICE: 290000 },
        204: { ID: 204, NAME: "قرص جلبک", PRICE: 1200000 }
    };

    const product = products[id];
    if (!product) return;

    addToCart(product);
    window.location.href = "order.html";
}

function buyDecoration(id) {
    const products = {
        301: { ID: 301, NAME: "گیاه مصنوعی آکواریوم", PRICE: 250000 },
        302: { ID: 302, NAME: "سنگ و شن تزیینی", PRICE: 689000 },
        303: { ID: 303, NAME: "چوب تزیینی", PRICE: 1580000 },
        304: { ID: 304, NAME: "مرجان مصنوعی", PRICE: 690000 }
    };

    const product = products[id];
    if (!product) return;

    addToCart(product);
    window.location.href = "order.html";
}
