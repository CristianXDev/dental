// Navbar Scroll Effect (Transparent to Frosted Glass White)
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Interactive & Automated Infinite Carousel for Services
const serviceCards = document.querySelectorAll('.service-card');
const dots = document.querySelectorAll('.dot');
let currentIndex = 2; // Default starting index (Ortodoncia)
let autoSequenceTimer;

function setActiveService(index) {
    currentIndex = index;
    serviceCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (serviceCards[index]) {
        serviceCards[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function startAutoSequence() {
    stopAutoSequence();
    autoSequenceTimer = setInterval(() => {
        let nextIndex = (currentIndex + 1) % serviceCards.length;
        setActiveService(nextIndex);
}, 3000); // Sequence switches every 3 seconds
}

function stopAutoSequence() {
    if (autoSequenceTimer) {
        clearInterval(autoSequenceTimer);
    }
}

// Click interaction handlers
serviceCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        setActiveService(index);
startAutoSequence(); // Reset timer on manual click
});
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        setActiveService(index);
startAutoSequence(); // Reset timer on manual click
});
});

// Start infinite sequence loop on page load
startAutoSequence();


document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('reviewsTrack');
    if (!track) return;

    // Clonar tarjetas para efecto infinito suave
    const cards = Array.from(track.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    let speed = 0.8; // Velocidad del movimiento
    let scrollPos = 0;
    let isPaused = false;

    function animate() {
        if (!isPaused) {
            scrollPos += speed;
            // Cuando la primera mitad del track pasa completamente, resetea la posición
            if (scrollPos >= track.scrollWidth / 2) {
                scrollPos = 0;
            }
            track.style.transform = `translateX(-${scrollPos}px)`;
        }
        requestAnimationFrame(animate);
    }

    // Pausar al pasar el cursor encima
    track.addEventListener('mouseenter', () => isPaused = true);
    track.addEventListener('mouseleave', () => isPaused = false);

    // Iniciar animación
    animate();
});