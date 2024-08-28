// Selectors for the buttons
var highScore = document.querySelector("#highscore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goback");

// Event listener to clear the info in the highscore section
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Retrieves local storage
var finalScores = localStorage.getItem("finalScores");
console.log("Retrieved finalScores from localStorage:", finalScores); // Debugging statement
finalScores = JSON.parse(finalScores);
console.log("Parsed finalScores:", finalScores); // Debugging statement

if (finalScores !== null && Array.isArray(finalScores)) {
    for (var i = 0; i < finalScores.length; i++) {
        var createList = document.createElement("li");
        createList.textContent = finalScores[i].initials + " " + finalScores[i].final + " " + finalScores[i].score;
        createList.classList.add("bg-gray-800", "text-white", "p-2", "rounded", "mb-2");
        highScore.appendChild(createList);
    }
} else {
    highScore.textContent = "No high scores available.";
}

// Event listener to take you to the index page
goBack.addEventListener("click", function () {
    window.location.replace("https://kristefov.github.io/TechQuiz/");
});