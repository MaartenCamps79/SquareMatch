document.getElementById("send-btn").addEventListener("click", async function() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>Jij:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = "";

    let botReply = await askAI(userInput);
    chatBox.innerHTML += `<p><strong>AI:</strong> ${botReply}</p>`;

    if (botReply.includes("Wil je dit toevoegen?")) {
        let carbAmount = parseInt(userInput.match(/\d+/)); // Haalt getal uit de input
        if (!isNaN(carbAmount)) {
            addCarbs(carbAmount);
        }
    }

    chatBox.scrollTop = chatBox.scrollHeight;
});

// Koolhydraten toevoegen + totaal bijwerken
document.getElementById("add-carb-btn").addEventListener("click", function() {
    let carbAmount = prompt("Voer het aantal koolhydraten in:");
    let amount = parseInt(carbAmount);
    if (!isNaN(amount)) {
        addCarbs(amount);
    }
});

function addCarbs(amount) {
    let listItem = document.createElement("li");
    listItem.textContent = `${amount}g`;
    document.getElementById("carb-list").appendChild(listItem);

    let totalCarbs = document.getElementById("total-carbs");
    totalCarbs.textContent = parseInt(totalCarbs.textContent) + amount;
}

// Water toevoegen
document.getElementById("add-water-btn").addEventListener("click", function() {
    let waterCount = document.getElementById("water-count");
    let count = parseInt(waterCount.textContent) + 1;
    waterCount.textContent = count;

    let motivationText = document.getElementById("motivation-text");
    if (count >= 8) {
        motivationText.textContent = "Lekker bezig! 🚀";
    } else {
        motivationText.textContent = "";
    }
});

