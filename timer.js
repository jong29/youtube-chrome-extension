let timer;
let hours = 0;
let minutes = 0;
let seconds = 0;

export default function startTimer() {
  timer = setInterval(incrementTimer, 1000);
}

function incrementTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  const formattedTime = padTime(hours) + ':' + padTime(minutes) + ':' + padTime(seconds);
  document.getElementById('timer').innerText = formattedTime;
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  hours = 0;
  minutes = 0;
  seconds = 0;
  document.getElementById('timer').innerText = '00:00:00';
}

function padTime(time) {
  return time < 10 ? '0' + time : time;
}