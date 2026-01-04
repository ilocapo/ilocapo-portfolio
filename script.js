// ===== SMOOTH SCROLLING & NAVIGATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll pour les liens
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Fermer le menu mobile
                navLinks.classList.remove('active');
                
                // Update active nav
                updateActiveNav(this.getAttribute('href'));
            }
        });
    });

    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Active nav on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        updateActiveNav('#' + current);
    });

    function updateActiveNav(hash) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    }
});

// ===== ANIMATED COUNTERS =====
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
};

// Observer pour les animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Animer les compteurs quand le hero est visible
            if (entry.target.classList.contains('hero')) {
                animateCounters();
            }
            
            // Animer les barres de compétences
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observer les sections
document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
document.querySelector('.hero')?.let(el => observer.observe(el));
document.querySelector('.skills')?.let(el => observer.observe(el));

// Fix pour l'observer
if (document.querySelector('.hero')) {
    observer.observe(document.querySelector('.hero'));
}
if (document.querySelector('.skills')) {
    observer.observe(document.querySelector('.skills'));
}

// ===== HERO DATA VISUALIZATION =====
const canvas = document.getElementById('dataVisualization');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class DataPoint {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 3 + 1;
            this.connections = [];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 217, 255, 0.8)';
            ctx.fill();
        }
    }

    // Créer des points de données
    const dataPoints = [];
    for (let i = 0; i < 50; i++) {
        dataPoints.push(new DataPoint(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }

    function animate() {
        ctx.fillStyle = 'rgba(5, 8, 22, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dessiner les connexions
        for (let i = 0; i < dataPoints.length; i++) {
            for (let j = i + 1; j < dataPoints.length; j++) {
                const dx = dataPoints[i].x - dataPoints[j].x;
                const dy = dataPoints[i].y - dataPoints[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(dataPoints[i].x, dataPoints[i].y);
                    ctx.lineTo(dataPoints[j].x, dataPoints[j].y);
                    ctx.strokeStyle = `rgba(0, 217, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Mettre à jour et dessiner les points
        dataPoints.forEach(point => {
            point.update();
            point.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ===== PROJECT FILTERS =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== SKILLS CHART =====
const createSkillsChart = () => {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) {
        console.log('Canvas skillsChart introuvable');
        return;
    }

    if (typeof Chart === 'undefined') {
        console.log('Chart.js non chargé');
        return;
    }

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Data Analysis', 'IA & ML', 'Big Data', 'DevOps', 'Full Stack'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    'rgba(0, 217, 255, 0.8)',
                    'rgba(131, 56, 236, 0.8)',
                    'rgba(255, 0, 110, 0.8)',
                    'rgba(6, 255, 165, 0.8)',
                    'rgba(255, 190, 11, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 217, 255, 1)',
                    'rgba(131, 56, 236, 1)',
                    'rgba(255, 0, 110, 1)',
                    'rgba(6, 255, 165, 1)',
                    'rgba(255, 190, 11, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0e0',
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(21, 27, 61, 0.9)',
                    titleColor: '#00d9ff',
                    bodyColor: '#e0e0e0',
                    borderColor: '#00d9ff',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
    
    console.log('Graphique des compétences créé avec succès');
};

// Attendre que Chart.js ET le DOM soient chargés
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si Chart.js est déjà chargé
    if (typeof Chart !== 'undefined') {
        createSkillsChart();
    } else {
        // Sinon attendre que le script Chart.js se charge
        window.addEventListener('load', () => {
            setTimeout(createSkillsChart, 100);
        });
    }
});

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 100);
    });
}

// ===== GLITCH EFFECT =====
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    setInterval(() => {
        glitchText.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0, 217, 255, 0.7),
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(255, 0, 110, 0.7)
        `;
        
        setTimeout(() => {
            glitchText.style.textShadow = 'none';
        }, 50);
    }, 3000);
}

// ===== TERMINAL ANIMATION =====
const terminalCommands = [
    'import pandas as pd',
    'from emefa import skills, experience',
    'analyst = DataAnalyst(name="Emefa Capo")',
    'analyst.search_internship()'
];

const terminalOutputs = [
    '>>> Searching for opportunities...',
    '✓ Ready to analyze your data!'
];

let commandIndex = 0;
let outputIndex = 0;

function typeCommand(element, text, callback) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 50);
}

// ===== RESPONSIVE MOBILE ADJUSTMENTS =====
function handleResize() {
    const width = window.innerWidth;
    
    if (width <= 768) {
        // Ajuster le canvas pour mobile
        if (canvas) {
            canvas.width = width - 40;
            canvas.height = 300;
        }
    }
}

window.addEventListener('resize', handleResize);
handleResize();

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== SCROLL TO TOP =====
let scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.classList.add('scroll-to-top');
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    border: none;
    border-radius: 50%;
    color: var(--bg-darker);
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    z-index: 999;
    box-shadow: 0 4px 20px rgba(0, 217, 255, 0.3);
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollButton.style.opacity = '1';
        scrollButton.style.visibility = 'visible';
    } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.visibility = 'hidden';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== PARTICLES EFFECT ON HOVER =====
document.querySelectorAll('.project-card, .stat-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        createParticles(e.pageX, e.pageY);
    });
});

function createParticles(x, y) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 2;
        
        let posX = 0;
        let posY = 0;
        
        const animate = () => {
            posX += Math.cos(angle) * velocity;
            posY += Math.sin(angle) * velocity;
            
            particle.style.transform = `translate(${posX}px, ${posY}px)`;
            particle.style.opacity = 1 - (Math.abs(posX) + Math.abs(posY)) / 100;
            
            if (Math.abs(posX) < 50 && Math.abs(posY) < 50) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Salut! Tu cherches quelque chose?', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cJe suis Emefa Capo, Data Analyst passionnée par l\'IA et le Big Data!', 'color: #8338ec; font-size: 14px;');
console.log('%c📧 Contact: emefa.capo@gmail.com', 'color: #06ffa5; font-size: 12px;');
