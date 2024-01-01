import { getActiveTabURL } from "./utils.js";

const endState = { activated: false, watchTime: 0, oneVideo: false };

const renderForm = () => {
  console.log("debug");
  const timer = document.querySelector(".timer");
  endState.activated = true;
  timer.innerHTML = `
      <div>
      watch one video: <input id="oneVid" type='checkbox' /> <br>
      time to watch: <input id="time" type="number" /> <br>
      <button id="setBtn">SET</button>
      </div>
    `;

  // add event listeners to each input type
  document.getElementById("setBtn").addEventListener("click", (e) => {
    endState.watchTime = document.getElementById("time").value;
  });

  document.getElementById("oneVid").addEventListener("change", (e) => {
    endState.activated = e.target.checked;
  });
};

// adding a new bookmark row to the popup
document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  
  const storageActive = chrome.storage.local.get("activated");
  console.log();

  if (!activeTab.url.includes("youtube.com/watch")) {
    const container = document.getElementById("container");
    container.innerHTML = "<div>This is not a youtube video</div>";
  } else if (chrome.storage.local.get(["activated"]).then(isActive => isActive)) {
    renderForm();
  }
});

document.getElementById("active").addEventListener("change", (e) => {
  const timer = document.querySelector(".timer");
  chrome.storage.local.set({ activated: true });
  if (e.target.checked) {
    renderForm();
  } else {
    console.log("unchecked");
    timer.innerHTML = "";
    endState.activated = false;
  }
});
