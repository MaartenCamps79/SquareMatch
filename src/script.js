// Variables to track exercises and days
let waterAantal = 0;
let dagenAfgerond = 0;
let oefeningenAfgerond = 0; // To track completed exercises

// Function to track water intake
function trackWater() {
    waterAantal++;
    document.getElementById('water-aantal').innerText = waterAantal;

    let waterStatus = '';
    if (waterAantal <= 3) {
        waterStatus = 'Drink meer water!';
    } else if (waterAantal <= 6) {
        waterStatus = 'Lekker bezig!';
    } else {
        waterStatus = 'Goed bezig, maar kijk uit dat je niet te veel drinkt!';
    }
    document.getElementById('water-status').innerText = waterStatus;
}

// Function to show the training section
function showTraining() {
    document.getElementById('trainingsschema').style.display = 'block';
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('dag-van-de-week').innerText = getDayOfWeek();
}

// Function to show the nutrition section
function showVoeding() {
    document.getElementById('voeding').style.display = 'block';
    document.getElementById('welcome-screen').style.display = 'none';
}

// Function to go back to the welcome screen
function backToWelcome() {
    document.getElementById('trainingsschema').style.display = 'none';
    document.getElementById('voeding').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
}

// Function to get the current day of the week
function getDayOfWeek() {
    const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    const today = new Date();
    return days[today.getDay()];
}

// Function to mark an exercise as completed
function markAsCompleted(oefeningNummer) {
    // Mark the exercise as completed
    const oefening = document.getElementById('oefening-' + oefeningNummer);
    oefening.querySelector('button').innerText = 'Afgerond';
    oefening.querySelector('button').disabled = true; // Disable the button once it's clicked
    oefeningenAfgerond++;

    // If all 5 exercises are completed, increase the number of completed days
    if (oefeningenAfgerond === 5) {
        dagenAfgerond++;
        document.getElementById('dagen-afgerond').innerText = dagenAfgerond;
    }
}
