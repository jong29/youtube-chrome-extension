import { getActiveTabURL } from "./utils.js";

const endState = {activated : false, watchTime : 0, oneVideo: false};

// adding a new bookmark row to the popup
document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParams = new URLSearchParams(queryParameters);

  const currentVideo = urlParams.get("v");

  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    chrome.storage.sync.get([]);
  }
});

document.getElementById("active").addEventListener("change", (e) => {
  const timer = document.querySelector(".timer");
  if (e.target.checked) {
    endState.activated = true;
    console.log("checked");
    console.log(timer);
    timer.innerHTML = `
      <div>
      time to watch: <input id="time" type='time' /> <br>
      watch one video: <input id="one-vid" type='checkbox' /> <br>
      <button id="start-btn">Start</button>
      </div>
    `;

    document.getElementById("time");

    console.log(timeInput);
    // add event listeners to each input type
  } else {
    console.log("unchecked");
    timer.innerHTML = '';
    endState.activated = false;
 }
});
