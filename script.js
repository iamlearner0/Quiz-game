const questionBank = [
  {
    question: "What keyword is used to create a JavaScript variable?",
    answers: [
      { text: "variable", correct: false },
      { text: "varies", correct: false },
      { text: "string", correct: false },
      { text: "var", correct: true },
    ],
  },
  {
    question:
      "Which snippet of CSS is commonly used to center a website horizontally?",
    answers: [
      { text: "site-align: center;", correct: false },
      { text: "margin: 0 auto;", correct: true },
      { text: "margin: auto 0;", correct: false },
      { text: "margin: center;", correct: false },
    ],
  },
  {
    question: "What property is used to change the text color of an element?",
    answers: [
      { text: "textcolor", correct: false },
      { text: "fontcolor", correct: false },
      { text: "backgroundcolor", correct: false },
      { text: "color", correct: true },
    ],
  },
  {
    question: "How do you call the function 'myFunction'?",
    answers: [
      { text: "myFunction", correct: false },
      { text: "func myFunction()", correct: false },
      { text: "myFunction()", correct: true },
      { text: "None of those", correct: false },
    ],
  },
  {
    question: "Which doctype is correct for HTML5?",
    answers: [
      { text: "!DOCTYPE HTML5", correct: false },
      { text: "!DOCTYPE html", correct: true },
      { text: "!DOCTYPE", correct: false },
      { text: "All of the above", correct: false },
    ],
  },
  {
    question: "The # symbol specifies that the selector is?",
    answers: [
      { text: "class", correct: false },
      { text: "tag", correct: false },
      { text: "id", correct: true },
      { text: "first", correct: false },
    ],
  },
  {
    question:
      "what value is given for the left margin: margin: 5px 10px 3px 8px;",
    answers: [
      { text: "5px", correct: false },
      { text: "8px", correct: true },
      { text: "3px", correct: false },
      { text: "10px", correct: false },
    ],
  },
];

const startPage = document.querySelector(".start--page");
const quizSection = document.querySelector(".quiz--section");
const questionElement = document.getElementById("question");
const answersDiv = document.getElementById("answer--container");
const nextBtn = document.querySelector(".next--btn");
const startBtn = document.querySelector(".start--btn");
const chosen = document.querySelector(".chosen");

let score;
let currentQuestionIndex;

eventListener();

function eventListener() {
  startBtn.addEventListener("click", startGame);
  nextBtn.addEventListener("click", nextQuestion);
}

function startGame() {
  startPage.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
  console.log("Game started");
}

function showQuestion() {
  resetAll();
  let currentQuestion = questionBank[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerText = `${questionNumber}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const answerButton = document.createElement("button");
    answerButton.innerText = answer.text;
    answerButton.classList.add("answer--btn");
    answersDiv.appendChild(answerButton);

    if (answer.correct) {
      answerButton.dataset.correct = answer.correct;
    }
    answerButton.addEventListener("click", selectAnswer);
  });
}

function resetAll() {
  nextBtn.style.display = "none";
  chosen.style.display = "none";
  while (answersDiv.firstChild) {
    answersDiv.removeChild(answersDiv.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    chosen.innerText = "You selected the correct option!";
    chosen.style.display = "block";
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    chosen.innerText = "You selected the wrong option!";
    chosen.style.display = "block";
  }
  Array.from(answersDiv.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function nextQuestion() {
  if (currentQuestionIndex < questionBank.length) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionBank.length) {
      showQuestion();
    } else {
      resetAll();
      if (score > 4) {
        questionElement.innerHTML = `Congratulations! You scored ${score} out of ${questionBank.length}`;
        questionElement.style.textAlign = "center";
      } else {
        questionElement.innerHTML = `Ouch! You scored ${score} out of ${questionBank.length}. You can do better!`;
        questionElement.style.textAlign = "center";
      }
      nextBtn.innerHTML = "Play Again!";
      nextBtn.style.display = "block";
    }
  } else {
    startGame();
  }
}
