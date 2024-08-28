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
finalScores = JSON.parse(finalScores);

if (finalScores !== null) {
    for (var i = 0; i < finalScores.length; i++) {
        var createList = document.createElement("li");
        createList.textContent = finalScores[i].initials + " " + finalScores[i].final + " " + finalScores[i].score;
        createList.classList.add("bg-gray-800", "text-white", "p-2", "rounded", "mb-2");
        highScore.appendChild(createList);
    }
}

// Event listener to take you to the index page
goBack.addEventListener("click", function () {
    window.location.replace("https://kristiyantefov.github.io/TechQuiz/");
});
