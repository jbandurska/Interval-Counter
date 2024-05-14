const circle = document.getElementById("circle");
const timer = document.getElementById("timer");
const controlPanelHeader = document.querySelector("#control-panel h2.header");

const interval = {
  work: 0,
  break: 0,
};
let counterIntervalId;
let displayFnTimeoutId;

function start(w, b) {
  if (counterIntervalId) clearInterval(counterIntervalId);
  if (displayFnTimeoutId) clearTimeout(displayFnTimeoutId);

  interval.work = w;
  interval.break = b;

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
  let isWorkTime = true;
  let timeout = interval.work;

  const displayFn = () => {
    controlPanelHeader.textContent = isWorkTime ? "Work Time" : "Break Time";

    resetAnimation(timeout);
    displayTime(timeout);

    displayFnTimeoutId = setTimeout(() => {
      displayFn();
    }, timeout * 1000);

    isWorkTime = !isWorkTime;
    timeout = isWorkTime ? interval.work : interval.break;
  };

  displayFn();
}

function displayTime(time) {
  let current = time;

  const displayTimer = () => {
    const minutes = Math.floor(current / 60);
    const seconds = current % 60;
    timer.textContent = `${minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
  };

  displayTimer();

  counterIntervalId = setInterval(() => {
    current--;
    displayTimer();
    if (current <= 1) clearInterval(counterIntervalId);
  }, 1000);
}
