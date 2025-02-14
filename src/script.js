const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20; // Grootte van elk blok
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let apple;
let score;
let highScore = 0;
let gameOver = false;

// Start het spel
function startGame() {
    snake = new Snake();
    apple = new Apple();
    score = 0;
    gameOver = false;
    window.setInterval(update, 100); // Update elke 100ms (snelheid)
}

// Update de status van de game
function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    snake.move();
    snake.draw();

    apple.draw();
    if (snake.eatApple(apple)) {
        score++;
        if (score > highScore) highScore = score;
        apple = new Apple(); // Maak nieuwe appel
    }

    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('highScore').textContent = `Highscore: ${highScore}`;

    if (snake.isDead()) {
        gameOver = true;
        alert(`Game Over! Je score was ${score}`);
    }
}

// Snake object
function Snake() {
    this.body = [{ x: 10, y: 10 }];
    this.direction = 'RIGHT'; // Start richting
    this.changeDirection = function (newDirection) {
        if (newDirection === 'UP' && this.direction !== 'DOWN') this.direction = 'UP';
        if (newDirection === 'DOWN' && this.direction !== 'UP') this.direction = 'DOWN';
        if (newDirection === 'LEFT' && this.direction !== 'RIGHT') this.direction = 'LEFT';
        if (newDirection === 'RIGHT' && this.direction !== 'LEFT') this.direction = 'RIGHT';
    };

    this.move = function () {
        let head = { ...this.body[0] };
        if (this.direction === 'UP') head.y--;
        if (this.direction === 'DOWN') head.y++;
        if (this.direction === 'LEFT') head.x--;
        if (this.direction === 'RIGHT') head.x++;

        this.body.unshift(head);
        this.body.pop();
    };

    this.draw = function () {
        ctx.fillStyle = "green";
        this.body.forEach(segment => {
            ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
        });
    };

    this.eatApple = function (apple) {
        const head = this.body[0];
        if (head.x === apple.x && head.y === apple.y) {
            this.body.push({ x: apple.x, y: apple.y });
            return true;
        }
        return false;
    };

    this.isDead = function () {
        const head = this.body[0];
        if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) return true;
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) return true;
        }
        return false;
    };
}

// Apple object
function Apple() {
    this.x = Math.floor(Math.random() * columns);
    this.y = Math.floor(Math.random() * rows);

    this.draw = function () {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
    };
}

// Voeg toetsenbord input toe om de richting van de slang te veranderen
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowUp") snake.changeDirection('UP');
    if (e.key === "ArrowDown") snake.changeDirection('DOWN');
    if (e.key === "ArrowLeft") snake.changeDirection('LEFT');
    if (e.key === "ArrowRight") snake.changeDirection('RIGHT');
});

startGame();
