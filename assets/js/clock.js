const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const radius = 1000;
const TIME = 100;
const sparks = document.getElementById("sparks");
const clock = document.querySelector(".clock");
const clockSeconds = clock.querySelector("h4");
let timeRemaining;
let interval;
let startTime;

const degrees = deg => (deg * Math.PI) / 180;
const offset = deg => {
  return (deg + 90) * -1;
};

function draw() {
  // Get height and width of canvas
  let height = canvas.clientHeight;
  let width = canvas.clientWidth;
  // Calculate how far through the timer we are as a percentage
  const percentageRemaining = (TIME - (Date.now() - startTime) / 1000) / TIME;
  // Calculate angle required based on percentage of time remaining
  const angle = ((startTime - Date.now()) / 1000 / TIME) * 360;
  // Set outer line width early - this is used in calculating to fit in frame
  ctx.lineWidth = 10;
  // Get relative coordinates
  const x = Math.sin(-2 * Math.PI * percentageRemaining);
  const y = Math.cos(2 * Math.PI * percentageRemaining) * -1;
  // Set the coordinates for the sparks gif
  sparks.style.left = `${(x * width) / 2 + width / 2}px`;
  sparks.style.top = `${(y * height) / 2 + height / 2}px`;

  // Begin drawing on canvas to create clock shape with cut-out segment
  ctx.beginPath();
  ctx.clearRect(0, 0, radius, radius);
  // Exit here if zero - this ensures 'clearRect' still runs to clear the canvas
  if (!timeRemaining || timeRemaining <= 0) return;

  // Move path to centre of canvas
  ctx.moveTo(radius / 2, radius / 2);
  // Draw a line straight up
  ctx.lineTo(radius / 2, ctx.lineWidth);

  const startAngle = degrees(offset(0));
  const endAngle = degrees(offset(angle));
  // Draw an arc from the top of the circle around to the angle determined by percentage of time remaining
  ctx.arc(radius / 2, radius / 2, radius / 2 - ctx.lineWidth, startAngle, endAngle, true);
  // Close the path from endpoint of arc back to the circle centre
  ctx.closePath();
  // Change the hue of the background colour based on time remaining. Range from green to red
  ctx.fillStyle = `hsl(${percentageRemaining * 110}, 67%, 44%)`;
  ctx.fill();
  ctx.strokeStyle = "rgb(80, 80, 80)";
  ctx.stroke();
  // Use requestAnimationFrame as it is more performant than an interval loop
  // Runs on the next available paint and manages performance
  requestAnimationFrame(draw);
}

function startClock(callback) {
  timeRemaining = TIME;
  startTime = Date.now();
  sparks.style.display = "block";
  clockSeconds.style.display = "block";
  clockSeconds.innerText = timeRemaining;
  interval = setInterval(() => {
    timeRemaining--;
    clockSeconds.innerText = timeRemaining;
    if (timeRemaining <= 0) {
      sparks.style.display = "none";
      clockSeconds.style.display = "none";
      stopClock();
      callback();
      return;
    }
  }, 1000);
  requestAnimationFrame(draw);
}

function stopClock() {
  sparks.style.display = "none";
  clockSeconds.style.display = "none";
  timeRemaining = undefined;
  clearInterval(interval);
}

function renderSeconds() {
  clockSeconds.innerText = timeRemaining;
}
