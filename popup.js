import { getActiveTabURL } from "./utils.js";

const endState = { activated: false, watchTime: 0, oneVideo: false };

const renderForm = () => {
  const timer = document.querySelector(".timer");
  endState.activated = true;
  timer.innerHTML = `
      <div id = "formContainer">
      watch one video: <input id="oneVid" type='checkbox' /> <br>
      time to watch: <input id="time" type="number" /> <br>
      <button id="setBtn">SET</button>
      </div>
    `;

  // add event listeners to each input type
  document.getElementById("setBtn").addEventListener("click", (e) => {
    endState.watchTime = document.getElementById("time").value;

    const timerElement = document.createElement("div");
    const formContainer = document.getElementById("formContainer");
    timerElement.textContent = "00:00:00";
    formContainer.appendChild(timerElement);
  });

  document.getElementById("oneVid").addEventListener("change", (e) => {
    endState.activated = e.target.checked;
  });
};

const renderBlank = () => {
  const timer = document.querySelector(".timer");
  timer.innerHTML = "";
  endState.activated = false;
}

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
