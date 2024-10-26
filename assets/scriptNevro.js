import { allQuestions } from './questionsNevro.js';

// Declared variables
var score = 0;
var questionIndex = 0;
var timer = document.querySelector("#timer");
var startButton = document.querySelector("#start-button-nevro");
var questionsDiv = document.querySelector("#questions");
var quizForm = document.querySelector("#quiz-form");
var questionContainer = document.querySelector("#question-container");
var answersDiv = document.querySelector("#answers");
var feedbackDiv = document.createElement("div"); // Create a div for feedback
feedbackDiv.classList.add("mt-4", "p-2", "rounded"); // Add some margin and padding to feedback div
quizForm.appendChild(feedbackDiv); // Append feedback div to the form
var submitButton = document.querySelector("#submit-button"); // Select the Submit button

// Holders for the timer and penalty
var secondsLeft = 3600; // Timer starts at 1 hour (3600 seconds)
var holdInterval = 0;
var penalty = 15;

// Global variable for the current question
var currentQuestion;

// Function to save scores
function saveScore(initials, score) {
    let allScores = JSON.parse(localStorage.getItem("allScores")) || [];
    let totalQuestions = allQuestions.length;

    allScores.push({
        initials: initials,
        score: score,
        totalQuestions: totalQuestions
    });

    localStorage.setItem("allScores", JSON.stringify(allScores));
}

// Event listener for the start button to start the quiz and the timer
startButton.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            timer.textContent = `Time: ${Math.floor(secondsLeft / 60)}:${secondsLeft % 60 < 10 ? '0' : ''}${secondsLeft % 60}`;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                endQuiz();
            }
        }, 1000);
    }
    questionsDiv.classList.add("hidden");
    quizForm.classList.remove("hidden");
    displayQuestion();
});

function displayQuestion() {
    // Debugging logs
    console.log("Displaying question:", questionIndex);
    console.log("All questions:", allQuestions);

    // Check if questionIndex is within bounds
    if (questionIndex >= allQuestions.length) {
        console.error("Question index out of bounds:", questionIndex);
        return;
    }

    // Clear previous answers and feedback
    questionContainer.innerHTML = "";
    answersDiv.innerHTML = "";
    feedbackDiv.innerHTML = ""; // Clear feedback
    feedbackDiv.style.backgroundColor = ""; // Reset background color
    submitButton.textContent = "Submit"; // Reset button text to "Submit"

    // Display the current question
    currentQuestion = allQuestions[questionIndex];
    if (!currentQuestion || !currentQuestion.options || !currentQuestion.answer) {
        console.error("Invalid question, options, or answer:", currentQuestion);
        return;
    }

    var questionTitle = document.createElement("h2");
    questionTitle.classList.add("text-2xl", "font-bold", "mb-4");
    questionTitle.textContent = currentQuestion.question;
    questionContainer.appendChild(questionTitle);

    // Determine input type based on the number of correct answers
    var inputType = currentQuestion.answer.length > 1 ? "checkbox" : "radio";

    // Generate input elements for each option
    currentQuestion.options.forEach((option, index) => {
        var label = document.createElement("label");
        label.classList.add("block", "bg-gray-700", "hover:bg-gray-600", "p-2", "mb-2", "rounded", "cursor-pointer"); // Add Tailwind CSS classes
        var input = document.createElement("input");
        input.type = inputType;
        input.name = "answer";
        input.value = option;
        input.id = `option-${index}`; // Add an ID for the input
        label.setAttribute("for", `option-${index}`); // Associate the label with the input
        label.appendChild(document.createTextNode(option));
        answersDiv.appendChild(input); // Append the input before the label
        answersDiv.appendChild(label);
    });

    // Append the feedback div after the options
    answersDiv.appendChild(feedbackDiv);
}

// Event listener for form submission
quizForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (submitButton.textContent === "Submit") {
        // Get selected answers
        var selectedAnswers = Array.from(document.querySelectorAll("input[name='answer']:checked")).map(input => input.value);

        // Debugging log
        console.log("Selected answers:", selectedAnswers);

        if (selectedAnswers.length > 0) {
            // Check if the selected answers are correct
            var isCorrect = selectedAnswers.every(answer => currentQuestion.answer.includes(answer)) &&
                            selectedAnswers.length === currentQuestion.answer.length;

            if (isCorrect) {
                score++;
                feedbackDiv.textContent = "Correct!";
                feedbackDiv.style.color = "white";
                feedbackDiv.style.backgroundColor = "green";
            } else {
                secondsLeft -= penalty;
                feedbackDiv.textContent = "Wrong!";
                feedbackDiv.style.color = "white";
                feedbackDiv.style.backgroundColor = "red";
            }

            // Highlight the correct answers in green
            displayCorrectAnswer();

            // Show feedback and change the button text to "Next"
            submitButton.textContent = "Next";
        } else {
            alert("Please select an answer.");
        }
    } else if (submitButton.textContent === "Next") {
        // Move to the next question or end the quiz
        questionIndex++;
        if (questionIndex < allQuestions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }
});

function displayCorrectAnswer() {
    // Highlight the correct answers in green
    currentQuestion.options.forEach((option, index) => {
        if (currentQuestion.answer.includes(option)) {
            document.querySelector(`#option-${index}`).nextSibling.style.backgroundColor = "green";
        }
    });
}

function endQuiz() {
    clearInterval(holdInterval);
    var typedInitials = prompt("Enter your initials:");
    if (typedInitials === "") {
        alert("Enter Initials");
    } else {
        saveScore(typedInitials, score);
        window.location.replace("https://kristefov.github.io/TechQuiz/assets/high-score.html");
    }
}
