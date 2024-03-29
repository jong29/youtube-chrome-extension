let timer;
let hours = 0;
let minutes = 0;
let seconds = 0;

export default function startTimer(inputSeconds) {
  seconds = inputSeconds % 60;
  minutes = Math.floor(inputSeconds / 60) % 60;
  hours = Math.floor(inputSeconds / 3600);
  const formattedTime = padTime(hours) + ':' + padTime(minutes) + ':' + padTime(seconds);
  document.getElementById('timer').innerText = formattedTime;

  timer = setInterval(decrementTimer, 1000);
  setTimeout(() => {
    clearInterval(timer);
  }, secondsToMillis(inputSeconds));
}

const secondsToMillis = (seconds) => {
  return seconds * 1000;
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

function decrementTimer() {
  if (seconds == 0) {
    seconds = 59;
    if (minutes ==  0) {
      minutes = 59;
      if (hours == 0) {
        return;
      } else {
        hours--;
      }
    } else {
      minutes--;
    }
  } else {
    seconds--;
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