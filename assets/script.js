let allQuestions = [
    {
      question: "Which company developed the Android operating system?",
      answer: ["Google"],
      options: ["Apple", "Google", "Microsoft", "Samsung"],
    },
    {
      question: "What does Wi-Fi stand for?",
      answer: ["Wireless Fidelity"],
      options: [
        "Wide Fidelity",
        "Wireless Fiber",
        "Wireless Fidelity",
        "Wide Fiber",
      ],
    },
    {
      question: "What does VPN stand for?",
      answer: ["Virtual Private Network"],
      options: [
        "Virtual Public Network",
        "Virtual Personal Network",
        "Virtual Protection Network",
        "Virtual Private Network",
      ],
    },
    {
      question: "Which programming language was created by Guido van Rossum?",
      answer: ["Python"],
      options: ["Java", "Python", "C++", "Ruby"],
    },
    {
      question: "What is the most popular web browser in the world?",
      answer: ["Chrome"],
      options: ["Safari", "Firefox", "Internet Explorer", "Chrome"],
    },
    {
      question: "Which of the following are programming languages?",
      answer: ["Java", "Python"], // Note the multiple answers here
      options: ["Java", "Python", "HTML", "CSS"],
    },
  ];

  // Declared variables
  var score = 0;
  var questionIndex = 0;
  var timer = document.querySelector("#timer");
  var startButton = document.querySelector("#start-button");
  var questions = document.querySelector("#questions");
  var container = document.querySelector("#container");

  // Holders for the timer and penalty
  var secondsLeft = 100;
  var holdInterval = 0;
  var penalty = 15;

  var createUl = document.createElement("ul");

  // Event listener for the start button to start the quiz and the timer
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
    render();
  });

  // This will render the questions and choices to the page
  function render() {
    questions.innerHTML = "";
    createUl.innerHTML = "";

    // Create a new element for the question title
    var questionTitle = document.createElement("h2");
    questionTitle.textContent = allQuestions[questionIndex].question;
    questionTitle.style.fontSize = "2rem"; // Make the question title bigger
    questionTitle.style.marginBottom = "20px"; // Add more space between the title and the answers

    questions.appendChild(questionTitle);

    var userChoices = allQuestions[questionIndex].options;

    // Create a container for the options and the Next button
    var optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");

    // New forEach for the questions choices
    userChoices.forEach(function (item) {
      var listItem = document.createElement("li");
      listItem.textContent = item;
      listItem.classList.add("bg-indigo-700", "hover:bg-indigo-500", "text-white", "font-bold", "py-2", "px-4", "rounded", "shadow-lg", "mb-4", "cursor-pointer");
      createUl.append(listItem);
      listItem.addEventListener("click", function () {
        listItem.classList.toggle("selected"); // Add/remove the selected class
        compareAnswer(event);
      });
    });

    optionsContainer.append(createUl);

    // Create the Next button
    var nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.style.display = "none"; // Hide the button initially
    nextButton.classList.add("bg-indigo-700", "hover:bg-indigo-600", "text-white", "font-bold", "py-2", "px-4", "rounded", "shadow-lg", "mt-4", "next-button");

    optionsContainer.append(nextButton);
    questions.append(optionsContainer);

    // Event listener for the Next button
    nextButton.addEventListener("click", function () {
      questionIndex++;
      if (questionIndex >= allQuestions.length) {
        finish();
      } else {
        render();
      }
    });

    // This function will compare the choices with the right answer
    function compareAnswer(event) {
      var element = event.target;
      if (element.matches("li")) {
        // Disable all options after one is selected
        var allOptions = createUl.querySelectorAll("li");
        allOptions.forEach(function (option) {
          option.style.pointerEvents = "none";
          option.classList.add("opacity-50"); // Optional: Add a class to visually indicate that options are disabled
        });

        // Get the selected answers
        var selectedAnswers = [];
        allOptions.forEach(function (option) {
          if (option.classList.contains("selected")) {
            selectedAnswers.push(option.textContent);
          }
        });

        // Check if the selected answers match the correct answers
        var correctAnswers = allQuestions[questionIndex].answer;
        var isCorrect = true;
        if (correctAnswers.length > 1) {
          // Multiple correct answers
          for (var i = 0; i < correctAnswers.length; i++) {
            if (!selectedAnswers.includes(correctAnswers[i])) {
              isCorrect = false;
              break;
            }
          }
        } else {
          // Single correct answer
          isCorrect = selectedAnswers.includes(correctAnswers[0]);
        }

        // Create a container to show the correct answer
        var correctAnswerDiv = document.createElement("div");
        correctAnswerDiv.textContent = "Correct Answer: " + correctAnswers.join(", ");
        correctAnswerDiv.classList.add("bg-green-900", "text-white", "p-2", "rounded", "mb-2");

        // Create a container to show the result (Correct/Wrong)
        var resultDiv = document.createElement("div");
        resultDiv.setAttribute("id", "resultDiv");
        resultDiv.style.display = "flex";
        resultDiv.style.justifyContent = "space-between";
        resultDiv.style.alignItems = "center";

        if (isCorrect) {
          score++;
          resultDiv.textContent = "Correct!";
          resultDiv.classList.add("bg-green-500", "text-white", "p-2", "rounded", "mb-2");
        } else {
          secondsLeft = secondsLeft - penalty;
          resultDiv.textContent = "Wrong!";
          resultDiv.classList.add("bg-red-500", "text-white", "p-2", "rounded", "mb-2");
        }

        questions.append(correctAnswerDiv);
        questions.append(resultDiv);
        nextButton.style.display = "block"; // Show the Next button after an answer is selected
        resultDiv.append(nextButton); // Append the Next button after the message
      }
    }
  }

  // This will append the final page to enter initials and to submit your score
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
    createInput.classList.add("bg-gray-800", "text-white", "p-2", "rounded", "mb-4");
    createInput.textContent = "";

    questions.append(createInput);

    // Create submit button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "Submit";
    createSubmit.classList.add("bg-blue-700", "hover:bg-blue-600", "text-white", "font-bold", "py-2", "px-4", "rounded", "shadow-lg");

    questions.append(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
      var typedInitials = createInput.value;
      var correctQuestions = (score + "/" + allQuestions.length);

      if (typedInitials === "") {
        alert("Enter Initials");
      } else {
        var scores = {
          initials: typedInitials,
          score: timeRemaining,
          final: correctQuestions,
        };
        var finalScores = localStorage.getItem("allScores");
        if (finalScores === null) {
          finalScores = [];
        } else {
          finalScores = JSON.parse(finalScores);
        }
        finalScores.push(scores);
        var newScore = JSON.stringify(finalScores);
        localStorage.setItem("allScores", newScore);
        // This will take you to the high-score.html
        window.location.replace("https://kristiyantefov.github.io/TechQuiz/assets/high-score.html");
      }
    });
  }
  ``
