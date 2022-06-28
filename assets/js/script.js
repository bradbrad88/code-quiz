const startBtn = document.getElementById("start");
const highScoreBtn = document.getElementById("high-scores");
const timer = document.getElementById("timer");
const content = document.getElementById("content");

const GAME_TIME = 100;

let highScores = [
  { initials: "BT", score: 15 },
  { initials: "MD", score: 12 },
];
let timeRemaining;

startBtn.addEventListener("click", startGame);
highScoreBtn.addEventListener("click", displayScores);

function displayScores() {
  content.innerHTML = "";
  const title = document.createElement("h2");
  title.textContent = "High Scores";
  const list = document.createElement("ol");
  highScores.forEach(({ initials, score }) => {
    const li = document.createElement("li");
    li.textContent = `${initials}: ${score}`;
    list.appendChild(li);
  });
  content.appendChild(title);
  content.appendChild(list);
}

function gameOver() {
  console.log("Game over");
}

function renderTime() {
  timer.innerHTML = timeRemaining;
}

function startTimer() {
  timeRemaining = GAME_TIME;
  renderTime();
  const interval = setInterval(() => {
    if (timeRemaining <= 0) {
      gameOver();
      clearInterval(interval);
      return;
    }
    timeRemaining--;
    renderTime();
  }, 1000);
}

function startGame() {
  startTimer();
}

function setHighScores() {
  localStorage.setItem("highscores", JSON.stringify(highScores));
}

function getHighScores() {
  const localScores = localStorage.getItem("highscores");
  const parsedScores = JSON.parse(localScores);
  if (!parsedScores) return;
  if (!Array.isArray(parsedScores)) return;
  highScores = parsedScores;
}

function init() {
  getHighScores();
}

init();
