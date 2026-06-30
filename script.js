// ===== GLOBAL VARIABLES =====
let currentPage = 1;
const totalPages = 6;
let isAnimating = false;

// Data foto untuk halaman 5
const photoData = [
    {
        image: 'assets/images/foto adit(1).jpg',
        caption: 'ada hari ketika semua terasa berat, namun hari itu tetap kamu lewati'
    },
    {
        image: 'assets/images/foto adit(2).jpg',
        caption: 'ada hari ketika semua terasa berat, namun hari itu tetap kamu lewati'
    },
    {
        image: 'assets/images/foto adit(3).jpg',
        caption: 'ada hari ketika semua terasa berat, namun hari itu tetap kamu lewati'
    }
];

let photoIndex = 0;

// ===== AUDIO SETUP =====
function initAudio() {
    const audio = document.getElementById('bgMusic');
    if (audio) {
        audio.volume = 0.3;
        audio.play().catch(err => console.log('Audio autoplay prevented'));
    }
}

// ===== PAGE NAVIGATION =====
function goToPage(pageNum) {
    if (isAnimating || currentPage === pageNum) return;
    isAnimating = true;

    document.querySelector(`.page-${currentPage}`).classList.add('hidden');
    document.querySelector(`.page-${pageNum}`).classList.remove('hidden');

    currentPage = pageNum;

    setTimeout(() => {
        isAnimating = false;
        if (pageNum === 3) startNarrationAnimation();
        if (pageNum === 4) generateBubbles();
        if (pageNum === 5) generateFlower();
        if (pageNum === 6) startFinalAnimation();
    }, 100);
}

// ===== PAGE 1: INTERACTIVE GALAXY =====
function initGalaxy() {
    const canvas = document.getElementById('galaxyCanvas');
    const ctx = canvas.getContext('2d');
    let animationId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.hue = Math.random() * 60;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
            ctx.shadowBlur = 15;
            ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    let particles = [];
    for (let i = 0; i < 200; i++) {
        particles.push(new Particle());
    }

    let time = 0;
    function animate() {
        ctx.fillStyle = 'rgba(10, 0, 21, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.hue = (index * 360 / particles.length + time) % 360;
            particle.update();
            particle.draw();
        });

        time += 0.5;

        // Show love text and button after 2 rotations (4 seconds)
        if (time > 100) {
            document.getElementById('loveText').style.opacity = '1';
            document.getElementById('btn1').style.opacity = '1';
            cancelAnimationFrame(animationId);
            return;
        }

        animationId = requestAnimationFrame(animate);
    }

    animate();
}

// ===== PAGE 2: STARS CANVAS =====
function initStars() {
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.opacity = Math.random() * 0.5 + 0.5;
            this.twinkleSpeed = Math.random() * 0.03 + 0.01;
        }

        update(time) {
            this.opacity = Math.sin(time * this.twinkleSpeed) * 0.5 + 0.5;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff1493';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    let stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push(new Star());
    }

    let time = 0;
    function animate() {
        ctx.fillStyle = 'rgba(10, 0, 21, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.update(time);
            star.draw();
        });

        time++;
        requestAnimationFrame(animate);
    }

    animate();
}

// ===== PAGE 3: NARRATION ANIMATION =====
function startNarrationAnimation() {
    const narrationText = "Mungkin banyak orang yang melihatmu mengenakan toga hari ini. Tapi aku tahu, sebelum toga itu hadir ada lelah - takut - dan malam malam yang terasa panjang";
    const words = narrationText.split(' ');
    const narrationEl = document.getElementById('narration');
    narrationEl.innerHTML = '';

    let delay = 0;
    words.forEach((word, index) => {
        setTimeout(() => {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = word + ' ';
            span.style.animationDelay = `0s`;
            narrationEl.appendChild(span);
        }, delay);
        delay += 150;
    });

    setTimeout(() => {
        document.getElementById('btn3').style.opacity = '1';
    }, words.length * 150 + 500);
}

// ===== PAGE 4: NEON BUBBLES =====
function generateBubbles() {
    const messages = [
        "Aku bangga padamu",
        "Bangga bukan hanya karena gelarmu",
        "Melainkan karena kamu memilih",
        "Bertahan ketika menyerah",
        "Terasa lebih mudah"
    ];

    const container = document.getElementById('bubblesContainer');
    container.innerHTML = '';

    messages.forEach((msg, index) => {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.textContent = msg;
            container.appendChild(bubble);
        }, index * 300);
    });
}

// ===== PAGE 5: GROWING FLOWER =====
function generateFlower() {
    const container = document.getElementById('flowerContainer');
    container.innerHTML = '';

    // Create stem
    const stem = document.createElement('div');
    stem.className = 'flower-stem';
    container.appendChild(stem);

    // Create leaves with text
    const leafTexts = ['belajar', 'lelah', 'bangkit', 'bertahan', 'percaya'];
    leafTexts.forEach((text, index) => {
        const leaf = document.createElement('div');
        leaf.className = `leaf ${index < 3 ? 'left' : 'right'}`;
        leaf.style.animationDelay = `${index * 0.2}s`;
        
        const leafText = document.createElement('div');
        leafText.className = 'leaf-text';
        leafText.textContent = text;
        leafText.style.animationDelay = `${0.5 + index * 0.2}s`;
        
        leaf.appendChild(leafText);
        container.appendChild(leaf);
    });

    // Create first set of buds
    photoData.forEach((photo, index) => {
        setTimeout(() => {
            const bud = document.createElement('div');
            bud.className = 'flower-bud';
            bud.style.bottom = (240 - index * 50) + 'px';
            bud.style.animationDelay = `${index * 0.4}s`;
            bud.onclick = () => showPhotoModal(photo.image, photo.caption);
            container.appendChild(bud);
        }, index * 400);
    });

    // Create rain
    startRain();

    // Generate animals
    generateAnimals();

    // More buds after rain
    const prayerMessages = [
        "semoga mimpimu terus bertumbuh",
        "semoga langkahmu selalu menemukan jalan",
        "semoga hatimu tetap lembut ditengah kerasnya dunia",
        "semoga aku terus berjalan bersamamu"
    ];

    setTimeout(() => {
        prayerMessages.forEach((msg, index) => {
            setTimeout(() => {
                const bud = document.createElement('div');
                bud.className = 'flower-bud';
                bud.style.bottom = (240 - index * 50) + 'px';
                bud.style.animationDelay = `0s`;
                bud.onclick = () => showPhotoModal(null, msg);
                container.appendChild(bud);
            }, index * 400);
        });
    }, 3000);
}

function startRain() {
    const rainContainer = document.querySelector('.page-5');
    const rainDiv = rainContainer.querySelector('.rain');
    
    if (!rainDiv) {
        const newRain = document.createElement('div');
        newRain.className = 'rain';
        rainContainer.querySelector('.flower-scene').appendChild(newRain);
    }

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            raindrop.style.left = Math.random() * 100 + '%';
            raindrop.style.top = Math.random() * 50 - 50 + 'px';
            raindrop.style.animationDelay = Math.random() * 0.5 + 's';
            rainContainer.querySelector('.rain').appendChild(raindrop);
        }, i * 50);
    }
}

function generateAnimals() {
    const container = document.getElementById('animalsContainer');
    container.innerHTML = '';

    // Rabbit
    const rabbit = document.createElement('div');
    rabbit.className = 'animal rabbit';
    rabbit.innerHTML = `
        <svg viewBox="0 0 40 40">
            <circle cx="10" cy="15" r="5" fill="#f4a460"/>
            <circle cx="30" cy="15" r="5" fill="#f4a460"/>
            <circle cx="20" cy="25" r="8" fill="#d2b48c"/>
            <circle cx="15" cy="5" r="3" fill="#f4a460"/>
            <circle cx="25" cy="5" r="3" fill="#f4a460"/>
        </svg>
    `;
    rabbit.style.animationDelay = '0s';
    container.appendChild(rabbit);

    // Butterfly
    const butterfly = document.createElement('div');
    butterfly.className = 'animal butterfly';
    butterfly.innerHTML = `
        <svg viewBox="0 0 50 50">
            <ellipse cx="25" cy="25" rx="3" ry="15" fill="#ff69b4"/>
            <circle cx="15" cy="15" r="8" fill="#ff1493"/>
            <circle cx="35" cy="15" r="8" fill="#ff1493"/>
            <circle cx="15" cy="35" r="7" fill="#ff69b4"/>
            <circle cx="35" cy="35" r="7" fill="#ff69b4"/>
        </svg>
    `;
    butterfly.style.animationDelay = '1s';
    container.appendChild(butterfly);

    // Bird
    const bird = document.createElement('div');
    bird.className = 'animal bird';
    bird.innerHTML = `
        <svg viewBox="0 0 50 40">
            <ellipse cx="25" cy="20" rx="8" ry="6" fill="#ffa500"/>
            <circle cx="15" cy="15" r="4" fill="#000"/>
            <path d="M 33 18 L 45 15 L 40 20 Z" fill="#ffa500"/>
            <path d="M 33 22 L 45 25 L 40 20 Z" fill="#ffa500"/>
        </svg>
    `;
    bird.style.animationDelay = '2s';
    container.appendChild(bird);
}

function showPhotoModal(imagePath, caption) {
    let modal = document.getElementById('photoModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'photoModal';
        modal.className = 'photo-modal';
        modal.innerHTML = `
            <div class="photo-modal-content">
                <img id="modalImage" src="" alt="Photo">
                <p id="modalCaption"></p>
                <button class="btn-close-modal">Tutup</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.querySelector('.btn-close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    if (imagePath) {
        document.getElementById('modalImage').src = imagePath;
        document.getElementById('modalImage').style.display = 'block';
    } else {
        document.getElementById('modalImage').style.display = 'none';
    }
    
    document.getElementById('modalCaption').textContent = caption;
    modal.classList.add('active');
}

// ===== PAGE 6: FINAL ANIMATION =====
function startFinalAnimation() {
    createFallingPetals();
}

function createFallingPetals() {
    const container = document.getElementById('fallingPetals');
    
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'petal-fall';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 2 + 3) + 's';
        container.appendChild(petal);

        setTimeout(() => petal.remove(), 5000);
    }, 300);
}

// ===== EVENT LISTENERS =====
document.getElementById('btn1').addEventListener('click', () => goToPage(2));
document.getElementById('btn2').addEventListener('click', () => goToPage(3));
document.getElementById('btn3').addEventListener('click', () => goToPage(4));
document.getElementById('btn4').addEventListener('click', () => goToPage(5));
document.getElementById('btn5').addEventListener('click', () => goToPage(6));

// ===== WINDOW RESIZE =====
window.addEventListener('resize', () => {
    if (currentPage === 1) {
        const canvas = document.getElementById('galaxyCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initGalaxy();
    
    // Listen for page 2 visibility
    const observer = new MutationObserver(() => {
        const page2 = document.querySelector('.page-2');
        if (!page2.classList.contains('hidden') && !page2.dataset.initialized) {
            initStars();
            page2.dataset.initialized = 'true';
        }
    });

    observer.observe(document.querySelector('.page-2'), { attributes: true });
});
