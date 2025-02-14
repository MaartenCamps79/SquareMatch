document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const timeSelectScreen = document.getElementById("time-select-screen");
    const gameScreen = document.getElementById("game-screen");
    const endScreen = document.getElementById("end-screen");

    const playButton = document.getElementById("play-button");
    const startButtons = document.querySelectorAll(".start-game");
    const restartBtn = document.getElementById("restart");

    const timerDisplay = document.getElementById("timer");
    const grid = document.getElementById("grid");
    const scoreDisplay = document.getElementById("score");
    const finalScore = document.getElementById("final-score");

    const emojiContainer = document.getElementById("emoji-rating");
    
    let score = 0;
    let highScore = localStorage.getItem("highScore") || 0;
    let timer;
    let gameTime;
    let selectedBlock = null;

    playButton.addEventListener("click", () => {
        welcomeScreen.classList.add("hidden");
        timeSelectScreen.classList.remove("hidden");
    });

    startButtons.forEach(button => {
        button.addEventListener("click", () => {
            startGame(parseInt(button.dataset.time));
        });
    });

    function startGame(time) {
        timeSelectScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");

        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        gameTime = time;
        timerDisplay.textContent = `⏳ ${gameTime}`;
        generateGrid();

        timer = setInterval(() => {
            gameTime--;
            timerDisplay.textContent = `⏳ ${gameTime}`;
            if (gameTime <= 0) endGame();
        }, 1000);
    }

    function generateGrid() {
        grid.innerHTML = "";
        let colors = ["red", "blue", "green", "yellow", "purple", "orange"];
        let blocks = [];

        for (let i = 0; i < 8; i++) {
            let color = colors[Math.floor(Math.random() * colors.length)];
            blocks.push(color, color);
        }

        blocks.sort(() => Math.random() - 0.5);

        blocks.forEach(color => {
            let block = document.createElement("div");
            block.classList.add("block");
            block.style.backgroundColor = color;
            block.dataset.color = color;
            block.addEventListener("click", () => selectBlock(block));
            grid.appendChild(block);
        });
    }

    function selectBlock(block) {
        if (!selectedBlock) {
            selectedBlock = block;
            block.style.opacity = "0.5";
        } else if (selectedBlock !== block) {
            if (selectedBlock.dataset.color === block.dataset.color) {
                selectedBlock.remove();
                block.remove();
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                if (grid.childElementCount === 0) generateGrid();
            } else {
                selectedBlock.style.opacity = "1";
            }
            selectedBlock = null;
        }
    }

    function endGame() {
        clearInterval(timer);
        gameScreen.classList.add("hidden");
        endScreen.classList.remove("hidden");
        finalScore.textContent = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }

        document.getElementById("high-score").textContent = `🏆 High Score: ${highScore}`;
    }

    restartBtn.addEventListener("click", () => {
        endScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
        startGame(gameTime);
    });

    // Voeg een plek toe in de HTML voor de highscore
    const highScoreText = document.createElement("p");
    highScoreText.id = "high-score";
    highScoreText.textContent = `🏆 High Score: ${highScore}`;
    endScreen.insertBefore(highScoreText, finalScore.nextSibling);

    // ✨ Emoji beoordeling en animatie
    emojiContainer.addEventListener("click", (event) => {
        if (event.target.tagName === "SPAN") {
            let selectedEmoji = event.target.textContent;
            animateEmojis(selectedEmoji);
        }
    });

    function animateEmojis(emoji) {
        for (let i = 0; i < 20; i++) {
            let emojiElement = document.createElement("span");
            emojiElement.textContent = emoji;
            emojiElement.classList.add("flying-emoji");
            emojiElement.style.left = `${Math.random() * 100}%`;
            emojiElement.style.animationDuration = `${1 + Math.random()}s`;
            document.body.appendChild(emojiElement);

            setTimeout(() => {
                emojiElement.remove();
            }, 2000);
        }
    }
});
