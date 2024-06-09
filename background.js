// i don't think i need the code below
// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//     if (tab.url && tab.url.includes("youtube.com/watch")) {
//       const queryParameters = tab.url.split("?")[1];
//       const urlParameters = new URLSearchParams(queryParameters);
//       chrome.tabs.sendMessage(tabId, {
//         type: "NEW",
//         videoId: urlParameters.get("v"),
//       });
//     }
//   });
  

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("sending message", message);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: "Hello from Background!", timeToWatchSeconds: message.timeToWatchSeconds });
  });
});