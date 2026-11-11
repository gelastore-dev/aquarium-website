
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", function () {
        const isOpen = mainNav.classList.toggle("active");
        

        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "بستن منو" : "باز کردن منو"
        );
    });
}

// شمارنده سبد خرید
function updateHeaderCartCount() {
    const countElement = document.getElementById("headerCartCount");

    if (!countElement) return;

    try {
        const cart = JSON.parse(
            localStorage.getItem("mFishCart") || "[]"
        );

        const count = Array.isArray(cart)
            ? cart.reduce(function (sum, item) {
                return sum + Math.max(0, Number(item.quantity) || 0);
            }, 0)
            : 0;

        countElement.textContent = count.toLocaleString("fa-IR");
    } catch (error) {
        countElement.textContent = "۰";
    }
}

updateHeaderCartCount();

window.addEventListener("storage", updateHeaderCartCount);

window.addEventListener("pageshow", updateHeaderCartCount);
