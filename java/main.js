/**
 * Script para Mega Cloud Vape Shop
 * Proporciona interactividad y efectos visuales.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Dinámico ---
    const header = document.querySelector('.header');
    const scrollIndicador = document.querySelector('.scroll-indicador');

    window.addEventListener('scroll', () => {
        // Si el usuario baja más de 50px, añadimos una clase de sombreado
        if (window.scrollY > 50) {
            header.classList.add('header-active');
            // Ocultamos el indicador de "Desliza"
            if(scrollIndicador) scrollIndicador.style.opacity = '0';
        } else {
            header.classList.remove('header-active');
            if(scrollIndicador) scrollIndicador.style.opacity = '1';
        }
    });

    // --- 2. Animación de entrada para Productos ---
    // Configuramos el observador
    const observerOptions = {
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadimos una clase que definiremos en CSS para la animación
                entry.target.classList.add('fade-in-visible');
                // Dejamos de observar una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos todas las tarjetas de productos y las registramos en el observador
    const productos = document.querySelectorAll('.producto-card');
    productos.forEach(prod => {
        prod.classList.add('fade-in-hidden'); // Estado inicial oculto
        observer.observe(prod);
    });
});
// Estado del carrito
let cart = JSON.parse(localStorage.getItem('mcvs_cart')) || [];

// 1. Función para agregar al carrito
function addToCart(name, price) {
    const item = { name, price, quantity: 1 };
    
    // Verificar si ya existe
    const existingItem = cart.find(product => product.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }
    
    updateCartUI();
    saveCart();
}

// 2. Actualizar la interfaz
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.quantity} x $${item.price}</p>
                </div>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            </div>
        `;
    });

    totalElement.innerText = `$${total}`;
}

// 3. Guardar en LocalStorage
function saveCart() {
    localStorage.setItem('mcvs_cart', JSON.stringify(cart));
}

// 4. Eliminar producto
window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartUI();
    saveCart();
};

// Eventos para abrir/cerrar (Asúmase que tienes un botón con ID 'open-cart')
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('active');
});
/**
 * Mega Cloud Vape Shop - Sistema Integral v1.0
 * Maneja: UI, Animaciones y Carrito de Compras
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- INICIALIZACIÓN DEL ESTADO ---
    let cart = JSON.parse(localStorage.getItem('mcvs_cart')) || [];

    // --- ELEMENTOS DEL DOM ---
    const header = document.querySelector('.header');
    const scrollIndicador = document.querySelector('.scroll-indicador');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // --- 1. LÓGICA DE UI Y SCROLL ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-active');
            if (scrollIndicador) scrollIndicador.style.opacity = '0';
        } else {
            header.classList.remove('header-active');
            if (scrollIndicador) scrollIndicador.style.opacity = '1';
        }
    });

    // --- 2. ANIMACIONES AL HACER SCROLL ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.producto-card').forEach(prod => {
        prod.classList.add('fade-in-hidden');
        observer.observe(prod);
    });

    // --- 3. LÓGICA DEL CARRITO ---

    // Abrir Carrito
    window.openCart = () => {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
    };

    // Cerrar Carrito
    const closeCart = () => {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
    };

    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Guardar en LocalStorage
    const saveCart = () => {
        localStorage.setItem('mcvs_cart', JSON.stringify(cart));
        updateCartUI();
    };

    // Agregar Producto
    window.addToCart = (name, price) => {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        saveCart();
        openCart(); // Opcional: abre el carro automáticamente al agregar
    };

    // Eliminar Producto
    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        saveCart();
    };

    // Actualizar Interfaz
    function updateCartUI() {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; padding:20px;">Tu carrito está vacío.</p>';
        }

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                    <div>
                        <h4 style="margin:0; font-size:1rem; color:#333;">${item.name}</h4>
                        <p style="margin:0; font-size:0.9rem; color:#666;">${item.quantity} x $${item.price.toLocaleString('es-CL')}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background:#ff4444; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">&times;</button>
                </div>
            `;
        });

        cartTotalElement.innerText = `$${total.toLocaleString('es-CL')}`;
    }

    // --- 4. FINALIZAR COMPRA (WHATSAPP) ---
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return alert("El carrito está vacío.");

            let mensaje = "¡Hola Mega Cloud! Me gustaría realizar el siguiente pedido:%0A%0A";
            let total = 0;

            cart.forEach(item => {
                mensaje += `• ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString('es-CL')}%0A`;
                total += item.price * item.quantity;
            });

            mensaje += `%0A*Total: $${total.toLocaleString('es-CL')}*%0A%0A¿Tienen disponibilidad?`;
            
            const whatsappUrl = `https://wa.me/56995733258?text=${mensaje}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Render inicial
    updateCartUI();
});