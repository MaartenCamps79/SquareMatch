document.getElementById("send-btn").addEventListener("click", async function() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>Jij:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = "";

    let botReply = await askAI(userInput);
    chatBox.innerHTML += `<p><strong>AI:</strong> ${botReply}</p>`;

    if (botReply.includes("Wil je dit toevoegen?")) {
        let listItem = document.createElement("li");
        listItem.textContent = userInput;
        document.getElementById("carb-list").appendChild(listItem);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
});

// Koolhydraten toevoegen
document.getElementById("add-carb-btn").addEventListener("click", function() {
    let carbAmount = prompt("Voer het aantal koolhydraten in:");
    if (carbAmount) {
        let listItem = document.createElement("li");
        listItem.textContent = `${carbAmount}g`;
        document.getElementById("carb-list").appendChild(listItem);
    }
});

// Water toevoegen
document.getElementById("add-water-btn").addEventListener("click", function() {
    let waterCount = document.getElementById("water-count");
    waterCount.textContent = parseInt(waterCount.textContent) + 1;
});
