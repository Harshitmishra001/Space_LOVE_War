const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let spaceship = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 30,
    dx: 5
};

let bullets = [];
let rocks = [];
let score = 0;
const targetScore = 20;
const compliments = [
    "my Sweet Girl!!",
    "Pyarri Ladki!",
    "Chorii!",
    "Tum itni pyaari kyu ho!",
    "You are my everything!",
    "chee yaaaarrrrrr!",
    "anyways ;)!",
    "You make me fall everytime ;)",
];

document.addEventListener('keydown', moveSpaceship);
document.addEventListener('keyup', stopSpaceship);
document.addEventListener('keydown', shootBullet);

function drawSpaceship() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

function moveSpaceship(e) {
    if (e.key === 'ArrowRight') {
        spaceship.x += spaceship.dx;
    } else if (e.key === 'ArrowLeft') {
        spaceship.x -= spaceship.dx;
    }
}

function stopSpaceship(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        spaceship.dx = 0;
    }
}

function shootBullet(e) {
    if (e.key === ' ') {
        bullets.push({ x: spaceship.x + spaceship.width / 2 - 2.5, y: spaceship.y, dy: -5 });
    }
}

function drawBullets() {
    ctx.fillStyle = 'red';
    bullets.forEach((bullet, index) => {
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
        bullet.y += bullet.dy;

        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}

function createRock() {
    let x = Math.random() * (canvas.width - 30);
    rocks.push({ x, y: 0, dy: 2 });
}

function drawRocks() {
    ctx.fillStyle = 'gray';
    rocks.forEach((rock, index) => {
        ctx.beginPath();
        ctx.arc(rock.x, rock.y, 15, 0, Math.PI * 2);
        ctx.fill();
        rock.y += rock.dy;

        if (rock.y > canvas.height) {
            rocks.splice(index, 1);
        }
    });
}

function detectCollisions() {
    bullets.forEach((bullet, bIndex) => {
        rocks.forEach((rock, rIndex) => {
            if (bullet.x > rock.x - 15 && bullet.x < rock.x + 15 && bullet.y > rock.y - 15 && bullet.y < rock.y + 15) {
                bullets.splice(bIndex, 1);
                rocks.splice(rIndex, 1);
                score++;
                alert(compliments[Math.floor(Math.random() * compliments.length)]);
                if (score === targetScore) {
                    endGame();
                }
            }
        });
    });
}

function endGame() {
    document.getElementById('game-over').style.display = 'block';
    clearInterval(gameInterval);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaceship();
    drawBullets();
    drawRocks();
    detectCollisions();

    if (Math.random() < 0.02) {
        createRock();
    }
}

let gameInterval = setInterval(update, 20);