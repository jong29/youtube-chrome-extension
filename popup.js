// need to keep track of time in seconds
import { getActiveTabURL } from "./utils.js";
import startTimer from "./timer.js";

// state variables
const endState = { activated: false, watchTimeSeconds: 0, oneVideo: false };

// rendering functions
const renderForm = () => {
  const timer = document.querySelector(".timer");
  endState.activated = true;
  let innerForm = `
      <div id = "formContainer">
      watch one video: <input id="oneVid" type='checkbox' /> <br>
      time to watch : <input id = "minutes" type = "number" min = "0" max = "59" /> mins <br>
        <button id="setBtn">SET</button>
      </div>`;
  timer.innerHTML = innerForm;

  chrome.storage.local.get(["watchTimeSeconds"]).then((o) => {
    if (o && o.watchTimeSeconds > 0) {
      renderTimer(o.watchTimeSeconds);
      startTimer(o.watchTimeSeconds);
    }
  });

  // add event listeners to each input type
  document.getElementById("setBtn").addEventListener("click", (e) => {
    const timeToWatchMinutes = document.getElementById("minutes").value;
    if (timeToWatchMinutes && timeToWatchMinutes > 0) {
      renderTimer(timeToWatchMinutes * 60);
      endState.watchTimeSeconds = timeToWatchMinutes*60;
      chrome.storage.local.set(endState);
    }
    startTimer(timeToWatchMinutes);
  });

  document.getElementById("oneVid").addEventListener("change", (e) => {
    endState.activated = e.target.checked;
  });
};

const renderTimer = (seconds) => {
  const timerElement = document.createElement("div");
  const formContainer = document.getElementById("formContainer");

  let hours = Math.floor(seconds / 3600);
  hours = hours < 10 ? "0" + hours : hours;

  let minutes = Math.floor(seconds / 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  
  let remainingSeconds = seconds % 60;
  remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  timerElement.textContent = hours + ":" + minutes + ":" + remainingSeconds;
  timerElement.setAttribute("id", "timer");
  formContainer.appendChild(timerElement);
};

const renderBlank = () => {
  const timer = document.querySelector(".timer");
  timer.innerHTML = "";
};

// -- start of script --
document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();

  if (!activeTab.url.includes("youtube.com/watch")) {
    const container = document.getElementById("container");
    container.innerHTML = "<div>This is not a youtube video</div>";
  } else {
    chrome.storage.local.get(["activated"]).then((isActive) => {
      if (isActive && isActive.activated) {
        document.getElementById("active").checked = true;
        renderForm();
      } else {
        renderBlank();
      }
    });
  }
});

// activate extension event
document.getElementById("active").addEventListener("change", (e) => {
  const timer = document.querySelector(".timer");
  if (e.target.checked) {
    endState.activated = true;
    chrome.storage.local.set(endState);
    renderForm();
  } else {
    chrome.storage.local.set(endState);
    renderBlank();
  }
});
