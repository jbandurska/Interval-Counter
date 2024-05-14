const circle = document.getElementById("circle");
const timer = document.getElementById("timer");

const INTERVAL = {
  time: 25 * 60,
  break: 5 * 60,
};

function start() {
  setCounterInterval();
}

function resetAnimation(timeout) {
  circle.classList.add("animated");
  circle.style.animationDuration = `${timeout}s`;

  setTimeout(() => {
    circle.classList.remove("animated");
  }, timeout * 1000 - 100);
}

function setCounterInterval() {
  let type = "time";
  let timeout = INTERVAL.time;

  resetAnimation(timeout);
  displayTime(timeout);

  const intervalFn = () => {
    type = type === "time" ? "break" : "time";
    timeout = type === "time" ? INTERVAL.time : INTERVAL.break;

    resetAnimation(timeout);
    displayTime(timeout);

    setTimeout(() => {
      intervalFn();
    }, timeout * 1000);
  };

  setTimeout(() => {
    intervalFn();
  }, timeout * 1000);
}

function displayTime(time) {
  let current = time;

  const minutes = Math.floor(current / 60);
  const seconds = current % 60;
  timer.textContent = `${minutes}:${seconds > 9 ? seconds : "0" + seconds}`;

  const intervalId = setInterval(() => {
    current--;

    const minutes = Math.floor(current / 60);
    const seconds = current % 60;

    timer.textContent = `${minutes}:${seconds > 9 ? seconds : "0" + seconds}`;

    if (current <= 1) clearInterval(intervalId);
  }, 1000);
}
