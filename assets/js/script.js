document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica do FAQ (Accordion) ---
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            // Fecha outros abertos (opcional, estilo sanfona única)
            faqToggles.forEach(other => {
                if (other !== toggle) {
                    other.setAttribute('aria-expanded', 'false');
                    other.nextElementSibling.style.maxHeight = null;
                }
            });

            // Alterna o atual
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            const content = toggle.nextElementSibling;
            
            toggle.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // --- Smooth Scroll para Links Internos ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Animação de Entrada (Fade In) ---
    // Adiciona classe .visible quando o elemento entra na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.card, .section-title, .hero-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // CSS injection via JS para lidar com a classe .visible criada acima
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
    `;
    document.head.appendChild(styleSheet);
});