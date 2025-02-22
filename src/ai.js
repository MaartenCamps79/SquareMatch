const carbDatabase = {
    "barra": 4,  // Bijvoorbeeld 4g koolhydraten in een keto-vriendelijk "barra"
    "avocado": 2,  // Avocado bevat ongeveer 2g koolhydraten per 100g
    "broccoli": 6,  // 100g broccoli bevat ongeveer 6g koolhydraten
    "kaas": 1,  // Een portie kaas heeft ongeveer 1g koolhydraten
    "kip": 0,  // Kip bevat praktisch geen koolhydraten
    "eieren": 1,  // Een ei bevat ongeveer 1g koolhydraten
    "noten": 5,  // Bijvoorbeeld 5g koolhydraten in een portie noten
    "olijfolie": 0,  // Olijfolie heeft geen koolhydraten
    "boter": 0,  // Boter heeft geen koolhydraten
    "zalm": 0  // Zalm bevat geen koolhydraten
};

const apiKey = "YOUR_OPENAI_API_KEY";  // Vergeet niet je eigen OpenAI API-sleutel hier in te vullen

async function askAI(question) {
    try {
        // Vraag om specifieke focus op keto-dieet
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4",  // Gebruik de nieuwste versie van GPT
                messages: [
                    {
                        role: "system",  // Dit is de instructie voor de AI
                        content: "Je bent een expert op het gebied van het keto-dieet. Beantwoord alle vragen over voedingsmiddelen, koolhydraten, eiwitten en vetten met de focus op het keto-dieet. Geef koolhydraatinformatie die past binnen een strikt koolhydraatarm dieet."
                    },
                    {
                        role: "user",  // Hier komt de vraag van de gebruiker
                        content: question
                    }
                ]
            })
        });

        const data = await response.json();
        let answer = data.choices[0].message.content;

        // Als de vraag gaat over koolhydraten, laten we de AI berekenen hoeveel koolhydraten het voedingsmiddel heeft
        let foodItem = question.toLowerCase().trim();
        if (carbDatabase[foodItem]) {
            let carbs = carbDatabase[foodItem];
            answer = `${foodItem} bevat ongeveer ${carbs} gram koolhydraten. Wil je dit toevoegen aan je totaal aantal koolhydraten?`;
        }

        return answer;

    } catch (error) {
        console.error("Error:", error);
        return "Sorry, er is een probleem met de AI. Probeer het later opnieuw.";
    }
}
