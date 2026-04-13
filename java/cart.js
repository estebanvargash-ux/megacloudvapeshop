// ==========================
// 🛒 CART SYSTEM MEGACLOUD
// ==========================

let cart = JSON.parse(localStorage.getItem('mcvs_cart')) || [];

// ==========================
// AGREGAR PRODUCTO
// ==========================
function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart();
    updateCartUI();

    // Hook comercial
    showFeedback(`${name} agregado 🔥`);
}

// ==========================
// ELIMINAR PRODUCTO
// ==========================
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

// ==========================
// ACTUALIZAR UI
// ==========================
function updateCartUI() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (!container) return;

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, i) => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.quantity} x $${item.price}</p>
                </div>
                <button onclick="removeFromCart(${i})">❌</button>
            </div>
        `;
    });

    totalEl.innerText = `$${total}`;
}

// ==========================
// GUARDAR
// ==========================
function saveCart() {
    localStorage.setItem('mcvs_cart', JSON.stringify(cart));
}

// ==========================
// WHATSAPP CHECKOUT
// ==========================
function sendToWhatsApp() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío 🤡");
        return;
    }

    let message = "Hola, quiero comprar:%0A%0A";

    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} - $${item.price * item.quantity}%0A`;
    });

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    message += `%0ATotal: $${total}`;

    window.open(`https://wa.me/56995733258?text=${message}`, '_blank');
}

// ==========================
// ABRIR / CERRAR
// ==========================
function initCartEvents() {
    const openBtn = document.getElementById('open-cart');
    const closeBtn = document.getElementById('close-cart');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            document.getElementById('cart-sidebar').classList.add('open');
            document.getElementById('cart-overlay').classList.add('active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('cart-sidebar').classList.remove('open');
            document.getElementById('cart-overlay').classList.remove('active');
        });
    }
}

// ==========================
// FEEDBACK UX
// ==========================
function showFeedback(msg) {
    const div = document.createElement('div');
    div.className = "cart-feedback";
    div.innerText = msg;

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 2000);
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    initCartEvents();
});