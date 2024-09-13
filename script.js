document.querySelectorAll('.planet').forEach(planet => {
    planet.addEventListener('click', () => {
        planet.classList.toggle('active');
    });
  });

document.querySelectorAll('.moon').forEach(moon => {
    moon.addEventListener('click', () => {
        moon.classList.toggle('active');
    });
});
  
document.querySelectorAll('.solar-system-objects article').forEach(object => {
    object.addEventListener('click', () => {
        object.classList.toggle('active');
    });
});

const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let starsArray = [];
const numberOfStars = 128;
let mouse = {
    x: null,
    y: null
};

class Star {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.speedX = -this.speedX;
        }

        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.speedY = -this.speedY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = dx * dx + dy * dy;
        this.x += (dx / distance) * 0.8;
        this.y += (dy / distance) * 0.8;

        this.draw();
    }
}

function init() {
    starsArray = [];
    for (let i = 0; i < numberOfStars; i++) {
        let size = Math.random() * 2;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() * 0.2);
        let speedY = (Math.random() * 0.4);
        starsArray.push(new Star(x, y, size, speedX, speedY));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    starsArray.forEach(star => star.update());
    requestAnimationFrame(animate);
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

init();
animate();