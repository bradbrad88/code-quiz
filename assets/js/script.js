const content = document.getElementById("content");
const startBtn = document.getElementById("start");
const forfeitBtn = document.getElementById("forfeit");
const highScoreBtn = document.getElementById("high-scores");
const scoreCard = document.querySelector(".scorecard");

// Elements created in HTML then stored in memory for ease of use later
const scoreForm = document.getElementById("save-score");
const initialsInput = scoreForm.querySelector("#initials");
scoreForm.remove();

const questionEl = document.querySelector(".question");
questionEl.remove();

const saveBtn = scoreForm.querySelector("button");
scoreCard.remove();

const feedbackEl = document.querySelector(".feedback-item");
feedbackEl.remove();

const highScoresEl = document.querySelector(".high-scores");
highScoresEl.remove();

const PENALTY = 5;

let questions = [];
let highScores = [];
let feedback = [];
let score;

startBtn.addEventListener("click", startGame);
forfeitBtn.addEventListener("click", gameOver);
highScoreBtn.addEventListener("click", displayScores);
initialsInput.addEventListener("input", onChangeInitials);
questionEl.addEventListener("click", onAnswer);

// Input validation for saving user initials
function onChangeInitials(e) {
  if (e.target.value.length > 1) {
    saveBtn.removeAttribute("disabled");
  } else {
    saveBtn.setAttribute("disabled", true);
  }
}

function clearElement(el) {
  el.innerHTML = "";
}

// Get scores from local storage
function getHighScores() {
  const localScores = localStorage.getItem("highscores");
  const parsedScores = JSON.parse(localScores);
  if (!parsedScores) return;
  if (!Array.isArray(parsedScores)) return;
  highScores = parsedScores;
}

// Save new high scores into local storage
function setHighScores() {
  localStorage.setItem("highscores", JSON.stringify(highScores));
}

function onAnswer(e) {
  // Use event delegation to only target clicks on child list elements
  if (e.target.matches("li")) {
    const item = e.target;
    if (item.dataset.correct) {
      awardAnswer();
    } else {
      storeFeedback(e);
      penaliseAnswer();
    }
    // Render the next question
    if (timeRemaining <= 0) {
      gameOver();
    } else {
      renderQuestion();
    }
  }
}

// Add to score
function awardAnswer() {
  score++;
}

// Penalise timer
function penaliseAnswer() {
  timeRemaining -= PENALTY;
  startTime = new Date(startTime - PENALTY * 1000);
  if (timeRemaining < 0) return;
  renderSeconds();
}

// Access the question object stored as JSON in the parent Article on renderQuestion function
function storeFeedback(e) {
  const question = JSON.parse(e.currentTarget.dataset.question);
  // Identify the correct answer
  // console.log(question);
  const answer = question.answers.find(answer => answer.correct)["answer"];
  const feedbackItem = {
    question: question.title,
    correctAnswer: answer,
    userAnswer: e.target.innerText,
  };
  // Store the feedback to be displayed at round end
  feedback.push(feedbackItem);
}

function clearFeedback() {
  feedback = [];
}

// Renders out information at the end of the round where questions were answered incorrectly
function renderFeedback() {
  feedback.forEach(fb => {
    // feedbackEl used as a template node
    const details = feedbackEl.cloneNode(true);
    const userAnswer = details.querySelector(".user-answer");
    const correctAnswer = details.querySelector(".correct-answer");
    const question = details.querySelector(".question-feedback");
    question.innerText = fb.question;
    correctAnswer.innerText = fb.correctAnswer;
    userAnswer.innerText = fb.userAnswer;
    content.appendChild(details);
  });
}

// Fires on each new round. Puts questions in random order and sets in global variable.
function getQuestions() {
  // Create a copy of original question list that can be manipulated
  const remainingQuestions = [...QUESTIONS];
  // Reset global questions array. There will likely be leftover questions from a previous round.
  questions = [];
  // Put the questions into random order
  while (remainingQuestions.length > 0) {
    const idx = Math.floor(Math.random() * remainingQuestions.length);
    const splicedQuestion = remainingQuestions.splice(idx, 1)[0];
    questions.push(splicedQuestion);
  }
}

// Accesses the next question in global questions array and displays it to the user
function renderQuestion() {
  if (questions.length < 1) return gameOver();
  const question = questions.pop();
  // Manipulate the Question Element Template
  questionEl.querySelector("h2").innerText = question.title;
  // Store question in the parent element for providing feedback
  questionEl.dataset.question = JSON.stringify(question);
  // Select List
  const list = questionEl.querySelector("ol");
  clearElement(list);

  // Display List in a random order each time
  // First create a copy of original array to avoid modifying it
  const answerList = [...question.answers];
  // Answers array will be populated randomly and rendered
  const answers = [];
  // Randomise the order in which questions will be presented each round
  answerList.forEach(answer => {
    const idx = Math.floor(Math.random() * answers.length);
    answers.splice(idx, 0, answer);
  });

  answers.forEach(({ answer, correct }, idx) => {
    const li = document.createElement("li");
    li.innerText = answer;
    if (correct) {
      // Using data attribute on the correct answer to easily determine if user's answer was correct
      li.dataset.correct = true;
    }
    list.appendChild(li);
    // Offset each list item transition delay to create effect
    li.style.transitionDelay = idx * 60 + "ms";
    // Request animation frame allows a transition between class changes to occur. Using this to animate the question drop-in
    requestAnimationFrame(() => {
      li.classList.add("show");
    });
  });
  clearElement(content);
  content.appendChild(questionEl);
}

// Renders out a list of high scores
function renderScores() {
  const list = highScoresEl.querySelector("ol");
  clearElement(list);
  highScores.forEach(({ initials, score }) => {
    const li = document.createElement("li");
    li.textContent = `${initials}: ${score}`;
    list.appendChild(li);
  });
  content.appendChild(highScoresEl);
}

// Displays rendered scores on screen
function displayScores() {
  clearElement(content);
  renderScores();
}

function displaySaveForm() {
  const form = scoreForm.querySelector("#display-save-form");
  const confirmation = scoreForm.querySelector("#display-save-confirmation");
  form.style.display = "flex";
  confirmation.style.display = "none";
}

function displaySaveConfirmation() {
  const form = scoreForm.querySelector("#display-save-form");
  const confirmation = scoreForm.querySelector("#display-save-confirmation");
  form.style.display = "none";
  confirmation.style.display = "block";
}

// Set users initials and score to global highscores variable and save in local storage
function saveScore(e) {
  e.preventDefault();
  const initials = initialsInput.value.toUpperCase();

  if (!score) return;
  // 'initials' validation on input event handler
  const newScore = {
    initials,
    score,
  };
  highScores.unshift(newScore);
  setHighScores(highScores);
  displaySaveConfirmation();
  initialsInput.value = "";
  saveBtn.setAttribute("disabled", true);
}

function isHighScore() {
  const highscore = highScores.reduce((p, c) => Math.max(p, c.score), 0);
  if (score > highscore) return true;
}

// Remove start button and display forfeit button
function displayForfeitButton() {
  startBtn.style.display = "none";
  startBtn.innerText = "Try again";
  forfeitBtn.style.display = "block";
}

// Remove forfeit button and display start button
function displayStartButton() {
  forfeitBtn.style.display = "none";
  startBtn.style.display = "block";
}

// Prep state for new round, start clock and render first question
function startGame() {
  score = 0;
  highScoreBtn.setAttribute("disabled", "true");
  displayForfeitButton();
  clearFeedback();
  getQuestions();
  startClock(gameOver);
  renderQuestion();
}

// Run at end of game. Responsible for displaying round end screen and stopping the clock.
// Choosing to stop the clock from this function as game end can be triggered from a penalised answer
function gameOver() {
  displayStartButton();
  clearElement(content);
  highScoreBtn.removeAttribute("disabled");
  scoreForm.querySelector("button").addEventListener("click", saveScore);
  scoreCard.querySelector("#score").innerText = score;
  content.appendChild(scoreCard);
  if (isHighScore()) {
    displaySaveForm();
    content.appendChild(scoreForm);
  }
  stopClock();
  renderFeedback();
}

function init() {
  // Load high scores from memory and set in global variable
  getHighScores();
}

init();
