/* ================================================================
   PORTFÓLIO – Jean Luca
   script.js — JavaScript Vanilla (sem bibliotecas externas)
   ================================================================ */

/* ================================================================
   1. CURSOR-GLOW (auréola atmosférica)
      O cursor do sistema permanece visível normalmente.
      O cursor-glow é apenas um efeito de iluminação no fundo.
   ================================================================ */
const cursorGlow = document.getElementById('cursorGlow');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

// Captura posição do mouse
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// lerp = interpolação linear — suaviza o movimento
function lerp(a, b, t) {
    return a + (b - a) * t;
}

function animateGlow() {
    currentX = lerp(currentX, mouseX, 0.08);
    currentY = lerp(currentY, mouseY, 0.08);
    cursorGlow.style.transform =
        `translate(calc(${currentX}px - 50%), calc(${currentY}px - 50%))`;
    requestAnimationFrame(animateGlow);
}

animateGlow();

/* ================================================================
   2. SCROLL SPY — ativa o link do nav conforme a seção visível
      API: IntersectionObserver
   ================================================================ */
const sections  = document.querySelectorAll('.section');
const navLinks  = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const id = entry.target.getAttribute('id');
            const active = document.querySelector(`.nav-link[data-section="${id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
});

sections.forEach(s => observer.observe(s));