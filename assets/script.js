//All questions for the quiz
let allQuestions = [
  {
    question: "Which company developed the Android operating system?",
    answer: "Google",
    options: ["Apple", "Google", "Microsoft", "Samsung"],
  },
  {
    question: "What does Wi-Fi stand for?",
    answer: "Wireless Fidelity",
    options: [
      "Wide Fidelity",
      "Wireless Fiber",
      "Wireless Fidelity",
      "Wide Fiber",
    ],
  },
  {
    question: "What does VPN stand for?",
    answer: "Virtual Private Network",
    options: [
      "Virtual Public Network",
      "Virtual Personal Network",
      "VVirtual Protection Network",
      "Virtual Private Network",
    ],
  },
  {
    question: "Which programming language was created by Guido van Rossum?",
    answer: "Python",
    options: ["Java", "Python", "C++", "Ruby"],
  },
  {
    question: "What is the most popular web browser in the world?",
    answer: "Chrome",
    options: ["Safari", "Firefox", "Internet Explorer", "Chrome"],
  },
];
// declared variables
var score = 0;
var questionIndex = 0;
var timer = document.querySelector("#timer");
var startButton = document.querySelector("#start-button");
var questions = document.querySelector("#questions");
var container = document.querySelector("#container");
//Holders for the timer and penalty 
var secondsLeft = 100;
var holdInterval = 0;
var penalty = 15;

var createUl = document.createElement("ul");
//Event listener for the start button to start the quiz and the timer
startButton.addEventListener("click", function () {
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      timer.textContent = "Time: " + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        finish();
        timer.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(questionIndex);
});
//This will render the questions and choices to the page
function render() {
  questions.innerHTML = "";
  createUl.innerHTML = "";
  for (var i = 0; i < allQuestions.length; i++) {
    var showQuestion = allQuestions[questionIndex].question;
    var userChoices = allQuestions[questionIndex].options;
    questions.textContent = showQuestion;
  }
//New forEach for the questions choises
  userChoices.forEach(function (item) {
    var listItem = document.createElement("li");
    listItem.textContent = item;
    questions.append(createUl);
    createUl.append(listItem);
    listItem.addEventListener("click", compareAnswer);
  });
}
//This function will compare the choices with the right answer
function compareAnswer(event) {
  var element = event.target;
  if (element.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");
    if (element.textContent == allQuestions[questionIndex].answer) {
      score++;
      createDiv.textContent = "Correct!";
      setTimeout(() => {
        createDiv.textContent = "";
      }, 500);
    } else {
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent = "Wrong!";
      setTimeout(() => {
        createDiv.textContent = "";
      }, 500);
    }
  }
  questionIndex++;
  if (questionIndex >= allQuestions.length) {
    finish();

    createDiv.textContent =
      "End of the TechQuiz" +
      " " +
      "You have achived a score of " +
      score +
      "/" +
      allQuestions.length +
      " Correct!";
  } else {
    render(questionIndex);
  }
  questions.append(createDiv);
  questions.append(createDiv1);
}
//This will append the final page to enter initials and to submit your score
function finish() {
  questions.innerHTML = "";
  timer.innerHTML = "";

  // Create Heading:
  var createHeader = document.createElement("h1");
  createHeader.setAttribute("id", "createH1");
  createHeader.textContent = "TechQuiz Finish!";

  questions.append(createHeader);
  // Create Paragraph
  var createParagraph = document.createElement("p");
  createParagraph.setAttribute("id", "createP");
  questions.append(createParagraph);

  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createParagraph = document.createElement("p");
    clearInterval(holdInterval);
    createParagraph.textContent = "Your time score is: " + timeRemaining;

    questions.append(createParagraph);
  }
  // Create input for initials
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "create-label");
  createLabel.textContent = "Enter your initials: ";
  questions.append(createLabel);

  // Create input for initials
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questions.append(createInput);

  // Create submit nutton
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "submit");
  createSubmit.textContent = "Submit";

  questions.append(createSubmit);

  // Event listener to capture initials and local storage for initials and score
  createSubmit.addEventListener("click", function () {
    var typedInitials = createInput.value;

    if (typedInitials === "") {
      alert("Enter Initials");
    } else {
      var scores = {
        initials: typedInitials,
        score: timeRemaining,
      };
      var finalScores = localStorage.getItem("allScores");
      if (finalScores === null) {
        finalScores = [];
      } else {
        finalScores = JSON.parse(finalScores);
      }
      finalScores.push(scores);
      var newScore = JSON.stringify(finalScores);
      localStorage.setItem("finalScores", newScore);
      // This will take you to the high-score.html
      window.location.replace("/assets/high-score.html");
    }
  });
}
