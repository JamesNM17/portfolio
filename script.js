const reveals = document.querySelectorAll(".reveal");

function revealSections() {
    const windowHeight = window.innerHeight;

    reveals.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const revealPoint = 120;

        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealSections);
revealSections();

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

const canvas = document.createElement("canvas");
const particlesContainer = document.getElementById("particles");

particlesContainer.appendChild(canvas);

const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {

    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 3 + 1;

        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;

        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (
            this.x < 0 ||
            this.x > canvas.width ||
            this.y < 0 ||
            this.y > canvas.height
        ) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();

        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

}

function createParticles() {

    particles = [];

    const amount = Math.floor(
        window.innerWidth / 12
    );

    for (let i = 0; i < amount; i++) {
        particles.push(new Particle());
    }

}

createParticles();

window.addEventListener("resize", createParticles);

function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (let b = a + 1; b < particles.length; b++) {

            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );

            if (distance < 120) {

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(139,92,246,${
                        0.15 - distance / 800
                    })`;

                ctx.lineWidth = 1;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();
            }
        }
    }
}

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();

    requestAnimationFrame(
        animateParticles
    );
}

animateParticles();

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            const target =
                document.querySelector(
                    link.getAttribute("href")
                );

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

const title = document.querySelector(".hero h2");

const text =
    "Estudante de Desenvolvimento de Sistemas";

let index = 0;

title.textContent = "";

function typingEffect() {

    if (index < text.length) {

        title.textContent += text.charAt(index);

        index++;

        setTimeout(
            typingEffect,
            60
        );
    }
}

typingEffect();
