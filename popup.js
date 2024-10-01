// cannot window.close() unless opened using window.open()
// just replace the whole screen with a black screen

import { getActiveTabURL, secondsToHMS } from "./utils.js";
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
      time to watch : <input id = "minutes" type = "number" min = "0" max = "59" /> minutes <input id = "seconds" type = "number" min = "0" max = "59"/> seconds <br>
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
    const timeToWatchMinutes = document.getElementById("minutes").value * 60;
    const timeToWatchSeconds = timeToWatchMinutes + parseInt(document.getElementById("seconds").value);
    if (timeToWatchSeconds && timeToWatchSeconds > 0) {
      renderTimer(timeToWatchSeconds);
      endState.watchTimeSeconds = timeToWatchSeconds;
      chrome.storage.local.set(endState);
    }
    startTimer(timeToWatchSeconds);
    chrome.runtime.sendMessage({ timeToWatchSeconds });
  });

  document.getElementById("oneVid").addEventListener("change", (e) => {
    endState.activated = e.target.checked;
  });
};

const renderTimer = (seconds) => {
  const timerElementExists = document.getElementById("timer");
  if (timerElementExists) timerElementExists.remove();
  
  const timerElement = document.createElement("div");
  const formContainer = document.getElementById("formContainer");

  timerElement.textContent = secondsToHMS(seconds);
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
    return
  } 

  chrome.storage.local.get(["activated"]).then((isActive) => {
    console.log("isActive", isActive);
    console.log("isActive.activated", isActive.activated);
    if (isActive && isActive.activated) {
      document.getElementById("active").checked = true;
      renderForm();
    } else {
      renderBlank();
    }
  });
});

// activate extension functionality even listener
// event listener checks for change in slider, and sets the activated state in local storage
document.getElementById("active").addEventListener("change", (e) => {
  const timer = document.querySelector(".timer");
  if (e.target.checked) {
    endState.activated = true;
    chrome.storage.local.set(endState);
    renderForm();
  } else {
    endState.activated = false;
    chrome.storage.local.set(endState);
    renderBlank();
  }
});
