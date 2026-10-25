// Función para actualizar la navbar
function updateNavbar() {
    document.getElementById('mainNavbar')?.classList.toggle('scrolled', window.scrollY > 40);
}

// Ejecutar al cargar y al hacer scroll
window.addEventListener('scroll', updateNavbar);
window.addEventListener('DOMContentLoaded', updateNavbar);

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

// Interactive & Automated Before / After Image Sliders
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.comparison-card');

    cards.forEach((card, cardIndex) => {
        const slider = card.querySelector('.img-comparison-container');
        const beforeImg = slider.querySelector('.before-img');
        const handle = slider.querySelector('.slider-handle');
        
        let isDown = false;
        let autoPlayTimer = null;
        let isAutoPlaying = true;

        function setSliderPosition(percentage) {
            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;

            beforeImg.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        }

        function updateSliderByClientX(clientX) {
            const rect = slider.getBoundingClientRect();
            let positionX = clientX - rect.left;
            let percentage = (positionX / rect.width) * 100;
            setSliderPosition(percentage);
        }

        // --- EFECTO AUTOMÁTICO SECUENCIAL (ABRIR Y CERRAR) ---
        function startAutoAnimation() {
            if (!isAutoPlaying) return;

            // Secuencia de animación fluida usando porcentajes
            setTimeout(() => { if(isAutoPlaying) setSliderPosition(30); }, 1000);  // Se desplaza un poco
            setTimeout(() => { if(isAutoPlaying) setSliderPosition(80); }, 2500);  // Revela el "Después"
            setTimeout(() => { if(isAutoPlaying) setSliderPosition(50); }, 4000);  // Regresa al centro (50%)
        }

        // Iniciar bucle automático escalonado por tarjeta para que no se muevan al mismo tiempo exacto
        let delay = cardIndex * 1500; // Retardo escalonado de 1.5s entre cada tarjeta
        setTimeout(() => {
            startAutoAnimation();
            autoPlayTimer = setInterval(startAutoAnimation, 5500); // Repetir cada 5.5 segundos
        }, delay);

        // Pausar automatización si el usuario interactúa con el mouse
        card.addEventListener('mouseenter', () => {
            isAutoPlaying = false;
            if (autoPlayTimer) clearInterval(autoPlayTimer);
        });

        // Reanudar cuando el mouse sale (opcional)
        card.addEventListener('mouseleave', () => {
            // Opcional: puedes dejarlo estático una vez que el usuario lo toque
        });

        // --- INTERACCIÓN MANUAL (Mouse y Táctil) ---
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            isAutoPlaying = false;
            updateSliderByClientX(e.clientX);
        });

        window.addEventListener('mouseup', () => {
            isDown = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            updateSliderByClientX(e.clientX);
        });

        // Táctil para móviles
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            isAutoPlaying = false;
            updateSliderByClientX(e.touches[0].clientX);
        });

        window.addEventListener('touchend', () => {
            isDown = false;
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            updateSliderByClientX(e.touches[0].clientX);
        });
    });
});