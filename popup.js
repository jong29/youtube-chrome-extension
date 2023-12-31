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
  } else {
    const container = document.getElementById("container");
    container.innerHTML = "<div>This is not a youtube video</div>";
  }
});

document.getElementById("active").addEventListener("change", (e) => {
  const timer = document.querySelector(".timer");
  if (e.target.checked) {
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

  } else {
    console.log("unchecked");
    timer.innerHTML = '';
    endState.activated = false;
 }
});
