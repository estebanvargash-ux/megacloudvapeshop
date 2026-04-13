// ==========================
// HEADER + ANIMACIONES
// ==========================

document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.header');
    const scrollIndicador = document.querySelector('.scroll-indicador');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-active');
            if (scrollIndicador) scrollIndicador.style.opacity = '0';
        } else {
            header.classList.remove('header-active');
            if (scrollIndicador) scrollIndicador.style.opacity = '1';
        }
    });

    // Animación productos
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.producto-card').forEach(el => {
        el.classList.add('fade-in-hidden');
        observer.observe(el);
    });

});