import { getActiveTabURL } from "./utils.js";

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
    console.log("checked");
    console.log(timer);
    timer.innerHTML = `
      <div>
      time to watch: <input id="time" type='text' /> <br>
      !!!!!time to watch: <input id="time2" type='time' /> <br>
      watch one video: <input id="one-vid" type='checkbox' /> <br>
      <button id="start-btn">Start</button>
      </div>
      `;

    const timeInput = document.getElementById("time");
    console.log(timeInput);
    // add event listeners to each input type
  } else {
    console.log("unchecked");
    timer.innerHTML = '';
  }
});
