// DEPREATED: get watch time (mycode)
// const fetchWatchTime = async () => {
//   return new Promise((resolve) => {
//     chrome.storage.local.get(["watchTimeSeconds"], (obj) => {
//       resolve(
//         obj["watchTimeSeconds"] ? JSON.parse(obj["watchTimeSeconds"]) : 0
//       );
//     });
//   });
// };

// add black screen to youtube page
const coverScreen = () => {
  console.log("coverScreen");
  const body = document.getElementsByTagName("body")[0];
  const bodyFirstChild = body.firstChild;
  const blackScreen = document.createElement("div");
  blackScreen.style.position = "fixed";
  blackScreen.style.width = "100%";
  blackScreen.style.height = "100%";
  blackScreen.style.backgroundColor = "black";
  blackScreen.style.zIndex = "9999";
  blackScreen.style.top = "0";
  blackScreen.style.left = "0";
  blackScreen.textContent = "You have reached your watch time limit";
  body.insertBefore(blackScreen, bodyFirstChild);
}

chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {
    console.log("message received in content script", message);
    // const currentWatchTime = await fetchWatchTime();
    const currentWatchTime = await chrome.storage.local.get(["watchTimeSeconds"]).then((obj) => {
      return obj["watchTimeSeconds"] || 0;
    });
    console.log("currentWatchTime", currentWatchTime);
    if (currentWatchTime > 0) {
      setTimeout(() => {
        // insert black screen
        coverScreen();
        chrome.storage.local.set({ watchTimeSeconds: 0 });
      }, currentWatchTime * 1000);
    }
});