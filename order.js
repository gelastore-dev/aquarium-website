
const CART_KEY = "mFishCart";
const ORDER_KEY = "mFishOrder";
const API_URL = "https://express-day2-1.onrender.com/api/orders";

let cart = loadCart();

/* خواندن سبد خرید */
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
                NAME: String(product.NAME),
                PRICE: Number(product.PRICE),
                quantity: product.quantity
            };
        });

    } catch (error) {
        console.error("خواندن سبد خرید ناموفق بود:", error);
        return [];
    }
}

/* ذخیره سبد خرید */
function saveCart() {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error("ذخیره سبد خرید ناموفق بود:", error);
        showMessage("ذخیره سبد خرید انجام نشد.");
    }

    renderCart();
}

/* فرمت قیمت */
function formatPrice(price) {
    return Number(price).toLocaleString("fa-IR") + " تومان";
}

/* نمایش پیام */
function showMessage(message) {
    const element = document.getElementById("orderMessage");

    if (element) {
        element.textContent = message;
    }
}

/* افزودن محصول به سبد خرید */
window.addToCart = function(product) {
    if (
        !product ||
        product.ID == null ||
        product.NAME == null ||
        !Number.isFinite(Number(product.PRICE)) ||
        Number(product.PRICE) < 0
    ) {
        console.error("اطلاعات محصول معتبر نیست:", product);
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
};

/* تغییر تعداد */
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

/* محاسبه تعداد */
function calculateCount() {
    return cart.reduce(function(sum, product) {
        return sum + product.quantity;
    }, 0);
}

/* محاسبه مبلغ کل */
function calculateTotal() {
    return cart.reduce(function(sum, product) {
        return sum + Number(product.PRICE) * product.quantity;
    }, 0);
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
        subtotal.textContent =
            "جمع: " +
            formatPrice(product.PRICE * product.quantity);

        const decrease = document.createElement("button");
        decrease.type = "button";
        decrease.textContent = "−";
        decrease.addEventListener("click", function() {
            changeQuantity(product.ID, -1);
        });

        const increase = document.createElement("button");
        increase.type = "button";
        increase.textContent = "+";
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

/* ثبت سفارش در سرور */
const orderForm = document.getElementById("orderForm");

if (orderForm) {
    orderForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const address = document.getElementById("customerAddress").value.trim();

        const normalizedPhone = phone
            .replace(/[۰-۹]/g, digit =>
                String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
            )
            .replace(/[٠-٩]/g, digit =>
                String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))
            );

        if (!name || !phone || !address) {
            showMessage("لطفاً تمام اطلاعات را وارد کنید.");
            return;
        }

        if (!/^[0-9]{10,11}$/.test(normalizedPhone)) {
            showMessage("شماره تماس معتبر نیست.");
            return;
        }

        if (cart.length === 0) {
            showMessage("سبد خرید شما خالی است.");
            return;
        }

        const submitButton = orderForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) submitButton.disabled = true;

        showMessage("در حال ارسال سفارش...");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    customerName: name,
                    customerPhone: normalizedPhone,
                    customerAddress: address,
                    products: cart.map(function(product) {
                        return {
                            productId: product.ID,
                            quantity: product.quantity
                        };
                    })
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "ثبت سفارش ناموفق بود."
                );
            }

            localStorage.setItem(
                ORDER_KEY,
                JSON.stringify(data.order)
            );

            cart = [];
            saveCart();

            showMessage(
                "سفارش با موفقیت ثبت شد. شماره سفارش: " +
                data.order.orderId
            );

            renderSavedOrder();

        } catch (error) {
            console.error("Order error:", error);
            showMessage(
                error.message || "ارتباط با سرور برقرار نشد."
            );

        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
}

/* نمایش آخرین سفارش */
function renderSavedOrder() {
    try {
        const savedOrder = JSON.parse(
            localStorage.getItem(ORDER_KEY) || "null"
        );

        if (!savedOrder) return;

        const section = document.getElementById("savedOrderSection");

        if (section) section.hidden = false;

        const customer = document.getElementById("savedCustomerName");
        const products = document.getElementById("savedProductName");
        const price = document.getElementById("savedProductPrice");

        if (customer) {
            customer.textContent = savedOrder.customerName || "";
        }

        if (products) {
            products.textContent = (savedOrder.products || [])
                .map(function(product) {
                    return product.productName + " × " + product.quantity;
                })
                .join("، ");
        }

        if (price) {
            price.textContent = formatPrice(savedOrder.total || 0);
        }

    } catch (error) {
        console.error("خواندن سفارش ذخیره‌شده ناموفق بود:", error);
    }
}

/* هماهنگی سبد خرید بین صفحات */
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
