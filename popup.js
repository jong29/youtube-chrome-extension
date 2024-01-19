// endState 오브젝트를 chrome.storage과local과 동기화 해서 상태관리한다

import { getActiveTabURL } from "./utils.js";
import startTimer from "./timer.js";

// state variables
const endState = { activated: false, watchTime: 0, oneVideo: false };

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

  // add event listeners to each input type
  document.getElementById("setBtn").addEventListener("click", (e) => {

    const timerElement = document.createElement("div");
    const formContainer = document.getElementById("formContainer");

    timerElement.textContent = "00:00:00";
    timerElement.setAttribute('id', 'timer');
    formContainer.appendChild(timerElement);

    const timeToWatch = document.getElementById("minutes").value;
    endState.watchTime = timeToWatch;

    startTimer(timeToWatch);
  });

  document.getElementById("oneVid").addEventListener("change", (e) => {
    endState.activated = e.target.checked;
  });
};

const renderBlank = () => {
  const timer = document.querySelector(".timer");
  timer.innerHTML = "";
  // // State.activated = false;
}

// Event Listeners
// -- start of script --
// adding a new bookmark row to the popup
document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  
  if (!activeTab.url.includes("youtube.com/watch")) {
    const container = document.getElementById("container");
    container.innerHTML = "<div>This is not a youtube video</div>";
  } else {
    chrome.storage.local.get(["activated"]).then(isActive => {
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
    chrome.storage.local.set({ activated: true });
    renderForm();
  } else {
    chrome.storage.local.set({ activated: false });
    renderBlank();
  }
});
