document.addEventListener("DOMContentLoaded", () => {
    // Haal de schermen op
    const welcomeScreen = document.getElementById("welcome-screen");
    const timeSelectScreen = document.getElementById("time-select-screen");
    const gameScreen = document.getElementById("game-screen");
    const endScreen = document.getElementById("end-screen");

    // Haal de knoppen op
    const playButton = document.getElementById("play-button");
    const startButtons = document.querySelectorAll(".start-game");
    const restartBtn = document.getElementById("restart");

    const timerDisplay = document.getElementById("timer");
    const scoreDisplay = document.getElementById("score");
    const finalScore = document.getElementById("final-score");

    const emojiContainer = document.getElementById("emoji-rating");
    const highScoreText = document.getElementById("high-score");
    const lastEmojiText = document.getElementById("last-emoji");

    let score = 0;
    let highScore = localStorage.getItem("highScore") || 0;
    let lastEmoji = localStorage.getItem("lastEmoji") || "😊";
    let gameTime;
    let timer;

    highScoreText.textContent = `🏆 High Score: ${highScore}`;
    lastEmojiText.textContent = `Last Emoji: ${lastEmoji}`;

    // Functie om een scherm te tonen
    function showScreen(screen) {
        // Verberg alle schermen
        welcomeScreen.classList.add("hidden");
        timeSelectScreen.classList.add("hidden");
        gameScreen.classList.add("hidden");
        endScreen.classList.add("hidden");

        // Toon het gewenste scherm
        screen.classList.remove("hidden");
    }

    // Start de game en toon het tijdselectiescherm
    playButton.addEventListener("click", () => {
        showScreen(timeSelectScreen);
    });

    // Start een nieuw spel met de geselecteerde tijd
    startButtons.forEach(button => {
        button.addEventListener("click", () => {
            startGame(parseInt(button.dataset.time));
        });
    });

    // Start het spel met de gekozen tijd
    function startGame(time) {
        score = 0;
        scoreDisplay.textContent = score;
        gameTime = time;
        showScreen(gameScreen);
        startTimer();
    }

    // Start de timer
    function startTimer() {
        timer = setInterval(() => {
            gameTime--;
            timerDisplay.textContent = `⏳ ${gameTime}`;
            if (gameTime <= 0) {
                clearInterval(timer);
                showEndScreen();
            }
        }, 1000);
    }
