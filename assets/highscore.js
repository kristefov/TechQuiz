//Selectors for the buttons
var highScore = document.querySelector("#highscore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goback");

// Event listener to clear the info in the hightscore section
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage 
var finalScores = localStorage.getItem("finalScores");
finalScores = JSON.parse(finalScores);

if (finalScores !== null) {

    for (var i = 0; i < finalScores.length; i++) {

        var createList = document.createElement("li");
        createList.textContent = finalScores[i].initials + " " + finalScores[i].final + " " + finalScores[i].score; 
        highScore.appendChild(createList);

    }
}
// Event listener to take you to index page
goBack.addEventListener("click", function () {
    window.location.replace("https://kristiyantefov.github.io/TechQuiz/");
});