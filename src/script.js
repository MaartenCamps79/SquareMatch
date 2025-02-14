let startButton = document.getElementById("startButton");
let newGameButton = document.getElementById("newGameButton");
let startNewGameButton = document.getElementById("startNewGameButton");

let game = document.getElementById("game");
let timerDisplay = document.getElementById("timeDisplay");
let blocksContainer = document.getElementById("blocks");
let scoreDisplay = document.getElementById("score");
let highscoreDisplay = document.getElementById("highscore");

let finalScoreDisplay = document.getElementById("finalScore");
let finalHighscoreDisplay = document.getElementById("finalHighscore");
let emojiRating = document.getElementById("emojiRating");
let userRating = document.getElementById("userRating");

let timer;
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
let timeLeft = 60; // Fixed time of 60 seconds
let blockColors = ['#FF5733', '#33FF57', '#3357FF', '#57FF33', '#FF5733', '#33FF57', '#3357FF', '#57FF33', 
                  '#FF5733', '#33FF57', '#3357FF', '#57FF33', '#FF5733', '#33FF57', '#3357FF', '#57FF33'];
let blocksMatched = 0; // Tracks how many blocks have been matched (8 pairs of blocks)
let selectedBlocks = []; // Tracks the selected blocks for matching

highscoreDisplay.textContent = `Highscore: ${highscore}`;

startButton.addEventListener("click", function() {
    document.getElementById("startScreen").style.display = "none";
    game.style.display = "flex";
    startGame();
});

newGameButton.addEventListener("click", function() {
    score = 0;
    scoreDisplay.textContent = "Score: " + score;
    blocksMatched = 0;
    blocksContainer.innerHTML = '';
    startGame();
});

startNewGameButton.addEventListener("click", function() {
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "block";
});

function startGame() {
    timeLeft = 60; // Reset to 60 seconds
    score = 0;
    scoreDisplay.textContent = "Score: " + score;
    blocksMatched = 0;
    blocksContainer.innerHTML = '';
    
    timer = setInterval(updateTimer, 1000);
    createBlocks();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = "🕒 " + timeLeft + " seconds";
    } else {
        endGame();
    }
}

function createBlocks() {
    let blocks = [];
    blockColors = shuffleArray(blockColors);

    for (let i = 0; i < 16; i++) { // 4x4 grid = 16 blocks
        let block = document.createElement("div");
        block.classList.add("block");
        block.style.backgroundColor = "#DDDDDD"; // Default color
        block.setAttribute("data-matched", "false");
        block.setAttribute("data-color", blockColors[i]);
        block.addEventListener("click", function() {
            matchBlock(block);
        });
        blocks.push(block);
    }
    blocks.forEach(block => blocksContainer.appendChild(block));
}

function matchBlock(block) {
    if (block.getAttribute("data-matched") === "true") return;

    block.style.backgroundColor = block.getAttribute("data-color");
    block.setAttribute("data-matched", "true");
    selectedBlocks.push(block);

    if (selectedBlocks.length === 2) {
        if (selectedBlocks[0].getAttribute("data-color") === selectedBlocks[1].getAttribute("data-color")) {
            score++;
            scoreDisplay.textContent = "Score: " + score;
            blocksMatched++;

            // Hide matched blocks after delay
            setTimeout(function() {
                selectedBlocks[0].style.opacity = "0";
                selectedBlocks[1].style.opacity = "0";
                selectedBlocks[0].setAttribute("data-matched", "true");
                selectedBlocks[1].setAttribute("data-matched", "true");
            }, 500);

            if (blocksMatched === 8) {  // 8 pairs = 16 blocks
                blocksMatched = 0;
                blocksContainer.innerHTML = '';
                createBlocks(); // Create new blocks after completing the round
            }
        } else {
            // Reset colors after a brief moment, don't remove the blocks immediately
            setTimeout(function() {
                selectedBlocks[0].style.backgroundColor = "#DDDDDD";
                selectedBlocks[1].style.backgroundColor = "#DDDDDD";
                selectedBlocks[0].setAttribute("data-matched", "false");
                selectedBlocks[1].setAttribute("data-matched", "false");
            }, 500);
        }
        selectedBlocks = [];
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

function endGame() {
    clearInterval(timer);
    finalScoreDisplay.textContent = `Your Score: ${score}`;
    finalHighscoreDisplay.textContent = `Highscore: ${highscore}`;

    if (score > highscore) {
        highscore = score;
        localStorage.setItem("highscore", highscore);
    }
    highscoreDisplay.textContent = `Highscore: ${highscore}`;

    document.getElementById("endScreen").style.display = "block";

    emojiRating.addEventListener("click", function(event) {
        if (event.target.classList.contains("emoji")) {
            userRating.textContent = `You rated the game as: ${event.target.textContent}`;
        }
    });
}
